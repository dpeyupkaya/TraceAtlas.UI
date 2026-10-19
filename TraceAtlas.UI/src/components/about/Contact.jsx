import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Send, 
  Linkedin, 
  Github, 
  AlertCircle, 
  Loader2, 
  Instagram, 
  ArrowLeft,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Snackbar, Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import contactService from '../../services/contactService';
import Footer from '../footer/Footer';

const COOLDOWN_DURATION = 5 * 60 * 1000;

const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const calculateRemainingTime = () => {
      const lastSentTime = localStorage.getItem('lastMsgTime');
      if (!lastSentTime) return 0;

      const passedTime = Date.now() - parseInt(lastSentTime, 10);
      const remaining = COOLDOWN_DURATION - passedTime;

      return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
    };

    setCooldown(calculateRemainingTime());

    const interval = setInterval(() => {
      const remaining = calculateRemainingTime();
      setCooldown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem('lastMsgTime');
      }
    }, 1000);

    const preventCopy = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventCopy);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);

    return () => {
      clearInterval(interval);
      document.removeEventListener('contextmenu', preventCopy);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s} ${t('contact.time.secondsShort')}`;
    return `${m} ${t('contact.time.minutesShort')} ${s} ${t('contact.time.secondsShort')}`;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length > 50) newErrors.name = t('contact.validation.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.validation.email');
    if (formData.message.length < 10 || formData.message.length > 500) newErrors.message = t('contact.validation.message');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitize = (text) => text.replace(/<[^>]*>?/gm, '').trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      setToast({ open: true, severity: 'success', message: t('contact.toast.sent') });
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    if (cooldown > 0) {
      setToast({ 
        open: true, 
        severity: 'warning', 
        message: t('contact.toast.cooldown', { time: formatTime(cooldown) }) 
      });
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      await contactService.sendMessage({
        name: sanitize(formData.name),
        email: sanitize(formData.email),
        message: sanitize(formData.message)
      });

      localStorage.setItem('lastMsgTime', Date.now().toString());
      setCooldown(COOLDOWN_DURATION / 1000);
      
      setFormData({ name: '', email: '', message: '' });
      setToast({ open: true, severity: 'success', message: t('contact.toast.success') });
      
    } catch {
      setToast({ open: true, severity: 'error', message: t('contact.toast.error') });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { 
      icon: Mail, 
      text: t('contact.social.mail'), 
      link: 'mailto:dpeyupkaya@gmail.com',
      subtext: 'dpeyupkaya@gmail.com',
      color: 'hover:border-emerald-500/40 hover:bg-emerald-500/10'
    },
    { 
      icon: Linkedin, 
      text: t('contact.social.linkedin'), 
      link: 'https://www.linkedin.com/in/dp-eyup-kaya/',
      subtext: '/in/dp-eyup-kaya',
      color: 'hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10'
    },
    { 
      icon: Github, 
      text: t('contact.social.github'), 
      link: 'https://github.com/dpeyupkaya',
      subtext: '@dpeyupkaya',
      color: 'hover:border-white/30 hover:bg-white/10'
    },
    { 
      icon: Instagram, 
      text: t('contact.social.instagram'), 
      link: 'https://www.instagram.com/kaya_eyuup/',
      subtext: '@kaya_eyuup',
      color: 'hover:border-pink-500/40 hover:bg-pink-500/10'
    }
  ];

  const inputFields = [
    { key: "name", label: t('contact.fields.name'), type: "input" },
    { key: "email", label: t('contact.fields.email'), type: "input" },
    { key: "message", label: t('contact.fields.message'), type: "textarea" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#041a14] text-emerald-50 font-sans selection:bg-emerald-500 selection:text-white relative select-none overflow-x-hidden">
      <Helmet>
        <title>{t('contact.seoTitle')}</title>
        <meta name="description" content={t('contact.seoDescription')} />
        <meta property="og:title" content={t('contact.seoTitle')} />
        <meta property="og:description" content={t('contact.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/contact" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/contact" />
      </Helmet>

      {/* Ambient glows & topo grid */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Header bar */}
      <header className="relative z-20 pt-8 pb-4 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-gradient-to-b from-[#06241c] to-transparent">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/30 text-emerald-100/70 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" /> 
            <span>{t('terms.back')}</span>
          </button>

          <Link to="/" className="group">
            <span className="text-xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">
              TRACE<span className="text-emerald-500">ATLAS</span>
            </span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
            <Clock size={12} />
            7/24 İLETİŞİM
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Page Hero */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              <MessageSquare size={13} />
              <span>BİZE ULAŞIN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {t('contact.title')}
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/60 font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Grid Layout: Socials / Info (Left) + Contact Form (Right) */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Contact Info & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    <Sparkles size={18} className="text-emerald-400" />
                    <span>Bağlantı Kanalları</span>
                  </h2>
                  <p className="text-xs text-emerald-100/50 leading-relaxed font-light">
                    Sorularınız, iş birliği teklifleriniz veya geri bildirimleriniz için dilediğiniz kanaldan doğrudan ulaşabilirsiniz.
                  </p>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a 
                        key={index} 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className={`flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 ${item.color} transition-all duration-300 group hover:-translate-y-0.5`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <Icon size={18} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {item.text}
                            </span>
                            <span className="block text-[11px] font-mono text-emerald-100/40">
                              {item.subtext}
                            </span>
                          </div>
                        </div>

                        <ExternalLink size={14} className="text-emerald-100/20 group-hover:text-white transition-colors" />
                      </a>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-xs text-emerald-100/70 font-mono">
                    Ortalama yanıt süresi: &lt; 24 saat
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Modern Message Form (7 cols) */}
            <div className="lg:col-span-7">
              <form 
                onSubmit={handleSubmit} 
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                <div className="hidden">
                  <input value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off" />
                </div>

                <div className="space-y-4">
                  {inputFields.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-emerald-200/60 uppercase tracking-wider">
                        {field.label}
                      </label>

                      {field.type === "input" ? (
                        <input
                          value={formData[field.key]}
                          onChange={e => {
                            setFormData({ ...formData, [field.key]: e.target.value });
                            if (errors[field.key]) setErrors({ ...errors, [field.key]: null });
                          }}
                          placeholder={field.label}
                          className="w-full px-5 py-3.5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl text-emerald-50 placeholder:text-emerald-100/20 text-sm font-medium focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all"
                        />
                      ) : (
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={e => {
                            setFormData({ ...formData, message: e.target.value });
                            if (errors[field.key]) setErrors({ ...errors, [field.key]: null });
                          }}
                          placeholder={field.label}
                          className="w-full px-5 py-3.5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl text-emerald-50 placeholder:text-emerald-100/20 text-sm font-medium focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all resize-none"
                        />
                      )}

                      {errors[field.key] && (
                        <p className="text-red-400 text-xs flex items-center gap-1.5 pt-0.5 tracking-wide">
                          <AlertCircle size={13} className="shrink-0" />
                          <span>{errors[field.key]}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  disabled={loading || cooldown > 0}
                  type="submit"
                  className={`w-full py-4 rounded-xl font-black text-xs tracking-widest uppercase flex justify-center items-center gap-2.5 transition-all duration-300 shadow-lg active:scale-95 cursor-pointer ${
                    cooldown > 0 
                      ? 'bg-white/5 text-emerald-100/30 border border-white/5 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]'
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : cooldown > 0 ? (
                    <span className="font-mono">{formatTime(cooldown)}</span>
                  ) : (
                    <>
                      <span>{t('common.buttons.send')}</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </main>

      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
      
      <Footer />
    </div>
  );
};

export default Contact;
