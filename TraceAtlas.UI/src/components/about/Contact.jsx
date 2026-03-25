import React, { useState, useEffect } from 'react'
import { Mail, Send, Linkedin, Github, AlertCircle, Loader2, Instagram } from 'lucide-react'
import { Snackbar, Alert } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import contactService from '../../services/contactService'
import Footer from '../footer/Footer'

const COOLDOWN_DURATION = 5 * 60 * 1000

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    const calculateRemainingTime = () => {
      const lastSentTime = localStorage.getItem('lastMsgTime')
      if (!lastSentTime) return 0

      const passedTime = Date.now() - parseInt(lastSentTime, 10)
      const remaining = COOLDOWN_DURATION - passedTime

      return remaining > 0 ? Math.ceil(remaining / 1000) : 0
    }

    setCooldown(calculateRemainingTime())

    const interval = setInterval(() => {
      const remaining = calculateRemainingTime()
      setCooldown(remaining)
      if (remaining <= 0) {
        clearInterval(interval)
        localStorage.removeItem('lastMsgTime')
      }
    }, 1000)

    const preventCopy = (e) => e.preventDefault()
    document.addEventListener('contextmenu', preventCopy)
    document.addEventListener('copy', preventCopy)
    document.addEventListener('cut', preventCopy)

    return () => {
      clearInterval(interval)
      document.removeEventListener('contextmenu', preventCopy)
      document.removeEventListener('copy', preventCopy)
      document.removeEventListener('cut', preventCopy)
    }
  }, [])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    if (m === 0) return `${s} sn`
    return `${m} dk ${s} sn`
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim() || formData.name.length > 50) newErrors.name = 'Geçersiz isim'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Geçersiz e-posta'
    if (formData.message.length < 10 || formData.message.length > 500) newErrors.message = 'Geçersiz mesaj'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sanitize = (text) => text.replace(/<[^>]*>?/gm, '').trim()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (honeypot) {
      setToast({ open: true, severity: 'success', message: 'Mesajınız gönderildi' })
      setFormData({ name: '', email: '', message: '' })
      return
    }

    if (cooldown > 0) {
      setToast({ 
        open: true, 
        severity: 'warning', 
        message: `Lütfen tekrar göndermeden önce ${formatTime(cooldown)} bekleyin.` 
      })
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
      setCooldown(COOLDOWN_DURATION / 1000)
      
      setFormData({ name: '', email: '', message: '' })
      setToast({ open: true, severity: 'success', message: 'Mesajınız başarıyla gönderildi.' })
      
    } catch (error) {
      setToast({ open: true, severity: 'error', message: 'Mesaj gönderilemedi, lütfen daha sonra tekrar deneyin.' })
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    { icon: Mail, text: 'Mail Gönderin', link: 'mailto:dpeyupkaya@gmail.com' },
    { icon: Linkedin, text: 'Bağlantı Kurun', link: 'https://www.linkedin.com/in/dp-eyup-kaya/' },
    { icon: Github, text: 'Github', link: 'https://github.com/dpeyupkaya' },
    { icon: Instagram, text: 'Takip Edin', link: 'https://www.instagram.com/kaya_eyuup/' }
  ]

  const inputFields = [
    { key: "name", label: "Adınız Soyadınız", type: "input" },
    { key: "email", label: "E-posta Adresiniz", type: "input" },
    { key: "message", label: "Mesajınız", type: "textarea" }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] text-slate-200 select-none">
      <Helmet>
        <title>İletişim | TraceAtlas - Bize Ulaşın</title>
        <meta name="description" content="TraceAtlas ile ilgili sorularınız, iş birliği teklifleriniz veya geri bildirimleriniz için bizimle iletişime geçin. Doğrudan mesaj gönderin veya sosyal medya üzerinden bağlantı kurun." />
        <meta property="og:title" content="İletişim | TraceAtlas - Bize Ulaşın" />
        <meta property="og:description" content="Sorularınız veya iş birliği teklifleriniz için doğrudan bağlantı kurun. TraceAtlas ekibi size yardımcı olmaktan mutluluk duyacaktır." />
        <meta property="og:url" content="https://www.traceatlas.com.tr/contact" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/contact" />
      </Helmet>

      <div className="flex-1 pt-24 px-4 pb-12">
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
              {socialLinks.map((item, index) => (
                <a key={index} href={item.link} target="_blank" rel="noreferrer"
                  className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
                  <item.icon />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 space-y-6">
              <div className="hidden">
                <input value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off" />
              </div>

              {inputFields.map((field) => (
                <div key={field.key}>
                  {field.type === "input" ? (
                    <input
                      value={formData[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.label}
                      className="w-full px-5 py-4 bg-gray-700/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  ) : (
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder={field.label}
                      className="w-full px-5 py-4 bg-gray-700/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  )}

                  {errors[field.key] && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              ))}

              <button
                disabled={loading || cooldown > 0}
                type="submit"
                className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                  cooldown > 0 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {loading ? <Loader2 className="animate-spin" /> : 
                  cooldown > 0 ? formatTime(cooldown) : <>Gönder <Send size={16} /></>
                }
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
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
      
      <Footer />
    </div>
  )
}

export default Contact