import React, { useState, useEffect } from 'react'
import { Mail, Send, Linkedin, Github, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'
import { Snackbar, Alert } from '@mui/material'
import contactService from '../../services/contactService'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('') 
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  useEffect(() => {
    const lastSent = localStorage.getItem('lastMsgTime')
    if (lastSent) {
      const diff = Date.now() - parseInt(lastSent, 10)
      if (diff < 1000) { 
        setCooldown(Math.ceil((1000 - diff) / 1000))
      }
    }

    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const block = (e) => e.preventDefault()
    document.addEventListener('contextmenu', block)
    
    return () => {
      clearInterval(timer)
      document.removeEventListener('contextmenu', block)
    }
  }, [])

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'İsim zorunlu'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Geçerli e-posta gir'
    if (formData.message.length < 10) e.message = 'Mesaj çok kısa'
    
    if (honeypot) return false 

    setErrors(e)
    return !Object.keys(e).length
  }

  const submit = async (e) => {
    e.preventDefault()

    if (honeypot) {
      setFormData({ name: '', email: '', message: '' })
      setHoneypot('')
      setToast({ open: true, severity: 'success', message: 'Mesajınız başarıyla gönderildi' })
      return
    }

    if (cooldown > 0) {
      setToast({ open: true, severity: 'warning', message: `Lütfen tekrar göndermek için ${cooldown} saniye bekleyiniz.` })
      return
    }

    if (!validate()) return

    setLoading(true)

    try {
      await contactService.sendMessage(formData)
      
      localStorage.setItem('lastMsgTime', Date.now().toString())
      setCooldown(1) 

      setFormData({ name: '', email: '', message: '' })
      setToast({
        open: true,
        severity: 'success',
        message: 'Mesajınız başarıyla gönderildi'
      })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Bir hata oluştu. Lütfen tekrar deneyin.'

      setToast({
        open: true,
        severity: 'error',
        message: msg
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] text-slate-200 select-none overflow-hidden relative">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent tracking-tight">
              İletişime Geç
            </h1>
            <p className="mt-4 text-emerald-100/60 max-w-xl mx-auto text-lg">
              Sorularınız veya iş birliği teklifleriniz için doğrudan bağlantı kurun.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div className="space-y-6">
              {[
                { icon: Mail, title: 'E-posta', value: 'dpeyupkaya@gmail.com', link: 'mailto:dpeyupkaya@gmail.com' },
                { icon: Linkedin, title: 'LinkedIn', value: 'linkedin.com/in/eyupkaya', link: 'https://linkedin.com/in/dp-eyup-kaya' },
                { icon: Github, title: 'GitHub', value: 'github.com/eyupkaya', link: 'https://github.com/dpeyupkaya' }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/90">{item.title}</h4>
                    <p className="text-sm text-slate-400 group-hover:text-emerald-300/80 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}

            </div>

            <form
              onSubmit={submit}
              className="p-8 md:p-10 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6 relative"
              autoComplete="off"
            >
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>

              <div className="opacity-0 absolute -z-10 h-0 w-0 overflow-hidden">
                <input
                  type="text"
                  name="website_url_hp"
                  tabIndex="-1"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Ad Soyad</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="İsminiz"
                  className={`w-full rounded-xl bg-slate-950/50 px-5 py-4 text-white outline-none border transition-all duration-300 focus:ring-1 focus:ring-emerald-500/30 ${
                    errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-emerald-500/50'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs flex gap-1.5 items-center ml-1 animate-pulse">
                    <AlertCircle size={12} />{errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">E-posta</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ornek@mail.com"
                  className={`w-full rounded-xl bg-slate-950/50 px-5 py-4 text-white outline-none border transition-all duration-300 focus:ring-1 focus:ring-emerald-500/30 ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-emerald-500/50'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs flex gap-1.5 items-center ml-1 animate-pulse">
                    <AlertCircle size={12} />{errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Mesaj</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Size nasıl yardımcı olabilirim?"
                  className={`w-full rounded-xl bg-slate-950/50 px-5 py-4 text-white outline-none border resize-none transition-all duration-300 focus:ring-1 focus:ring-emerald-500/30 ${
                    errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-emerald-500/50'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs flex gap-1.5 items-center ml-1 animate-pulse">
                    <AlertCircle size={12} />{errors.message}
                  </p>
                )}
              </div>

              <button
                disabled={loading || cooldown > 0}
                className={`w-full rounded-xl font-bold py-4 flex justify-center items-center gap-2 transition-all duration-300 shadow-lg ${
                    cooldown > 0 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : cooldown > 0 ? (
                    <span className="text-sm">Tekrar gönderim için: {cooldown}s</span>
                ) : (
                    <>
                        <span>Gönder</span>
                        <Send size={18} />
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
            severity={toast.severity} 
            variant="filled" 
            onClose={() => setToast({ ...toast, open: false })}
            className="rounded-xl shadow-2xl font-medium"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Contact