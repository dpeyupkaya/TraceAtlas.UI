import React, { useState, useEffect } from 'react'
import { Mail, Send, Linkedin, Github, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'
import { Snackbar, Alert } from '@mui/material'
import contactService from '../../services/contactService'

const COOLDOWN_MS = 5 * 60 * 1000

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    const lastSent = localStorage.getItem('lastMsgTime')
    if (lastSent) {
      const diff = Date.now() - Number(lastSent)
      if (diff < COOLDOWN_MS) {
        setCooldown(Math.ceil((COOLDOWN_MS - diff) / 1000))
      }
    }

    const interval = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const block = e => e.preventDefault()
    document.addEventListener('contextmenu', block)
    document.addEventListener('copy', block)
    document.addEventListener('cut', block)

    return () => {
      clearInterval(interval)
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('copy', block)
      document.removeEventListener('cut', block)
    }
  }, [])

  const validate = () => {
    const e = {}
    if (!formData.name.trim() || formData.name.length > 50) e.name = 'Geçersiz isim'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Geçersiz e-posta'
    if (formData.message.length < 10 || formData.message.length > 500) e.message = 'Geçersiz mesaj'
    if (honeypot) return false
    setErrors(e)
    return !Object.keys(e).length
  }

  const sanitize = s => s.replace(/<[^>]*>?/gm, '').trim()

  const submit = async e => {
    e.preventDefault()

    if (honeypot) {
      setToast({ open: true, severity: 'success', message: 'Mesajınız gönderildi' })
      setFormData({ name: '', email: '', message: '' })
      return
    }

    if (cooldown > 0 || loading) {
      setToast({ open: true, severity: 'warning', message: `Tekrar denemek için ${cooldown}s bekleyin` })
      return
    }

    if (!validate()) return

    setLoading(true)

    try {
      await contactService.sendMessage({
        name: sanitize(formData.name),
        email: sanitize(formData.email),
        message: sanitize(formData.message)
      })

      localStorage.setItem('lastMsgTime', Date.now().toString())
      setCooldown(300)
      setFormData({ name: '', email: '', message: '' })
      setToast({ open: true, severity: 'success', message: 'Mesajınız başarıyla gönderildi' })
    } catch {
      setToast({ open: true, severity: 'error', message: 'Gönderim başarısız' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] text-slate-200 select-none">
        <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent tracking-tight">
              İletişime Geç
            </h1>
            <p className="mt-4 text-emerald-100/60 max-w-xl mx-auto text-lg">
              Sorularınız veya iş birliği teklifleriniz için doğrudan bağlantı kurun.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: Mail, text: 'dpeyupkaya@gmail.com', link: 'mailto:dpeyupkaya@gmail.com' },
                { icon: Linkedin, text: 'linkedin.com/in/dp-eyup-kaya', link: 'https://linkedin.com/in/dp-eyup-kaya' },
                { icon: Github, text: 'github.com/dpeyupkaya', link: 'https://github.com/dpeyupkaya' }
              ].map((x, i) => (
                <a key={i} href={x.link} target="_blank" rel="noreferrer"
                  className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40">
                  <x.icon />
                  <span>{x.text}</span>
                </a>
              ))}
            </div>

            <form onSubmit={submit} className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 space-y-6">
              <div className="hidden">
                <input value={honeypot} onChange={e => setHoneypot(e.target.value)} />
              </div>

              {['Adınız Soyadınız','E-posta Adresiniz','Mesajınız'].map((k,i)=>(
                <div key={i}>
                  {k !== 'Mesajınız' ? (
                    <input
                      value={formData[k]}
                      onChange={e=>setFormData({...formData,[k]:e.target.value})}
                      placeholder={k}
                      className="w-full px-5 py-4 bg-gray-700/40 border border-white/10 rounded-xl"
                    />
                  ) : (
                    <textarea
                    placeholder='Mesajınız '
                      rows={4}
                      value={formData.message}
                      onChange={e=>setFormData({...formData,message:e.target.value})}
                      className="w-full px-5 py-4 bg-gray-700/40 border border-white/10 rounded-xl"
                    />
                  )}
                  {errors[k] && <p className="text-red-400 text-xs mt-1 flex gap-1"><AlertCircle size={12}/>{errors[k]}</p>}
                </div>
              ))}

              <button
                disabled={loading || cooldown>0}
                className={`w-full py-4 rounded-xl font-bold flex justify-center gap-2 ${
                  cooldown>0?'bg-gray-700':'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {loading ? <Loader2 className="animate-spin"/> :
                  cooldown>0 ? `${cooldown}s` : <>Gönder <Send size={16}/></>}
              </button>

            
            </form>
          </div>
        </div>
      </div>

      <Snackbar open={toast.open} autoHideDuration={4000}
        onClose={()=>setToast({...toast,open:false})}>
        <Alert severity={toast.severity} variant="filled">{toast.message}</Alert>
      </Snackbar>
    </>
  )
}

export default Contact
