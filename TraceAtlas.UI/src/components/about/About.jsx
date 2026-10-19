import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Compass, 
  User, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Heart, 
  ArrowLeft, 
  Map, 
  Sparkles,
  Navigation,
  Globe2,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../footer/Footer';

const About = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Eyüp Kaya",
      "jobTitle": "Computer Engineer",
      "url": "https://www.traceatlas.com.tr",
      "sameAs": [
        "https://www.linkedin.com/in/dp-eyup-kaya/",
        "https://github.com/dpeyupkaya"
      ]
    },
    "description": t('about.structuredDescription')
  };

  return (
    <div className="min-h-screen bg-[#041a14] text-emerald-50 font-sans selection:bg-emerald-500 selection:text-white flex flex-col relative overflow-x-hidden">
      <Helmet htmlAttributes={{ lang: i18n.resolvedLanguage || i18n.language }}>
        <title>{t('about.seoTitle')}</title>
        <meta name="description" content={t('about.seoDescription')} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('about.seoTitle')} />
        <meta property="og:description" content={t('about.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/about" />
        <meta property="og:site_name" content="TraceAtlas" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('about.seoTitle')} />
        <meta name="twitter:description" content={t('about.twitterDescription')} />
        
        <link rel="canonical" href="https://www.traceatlas.com.tr/about" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Header Bar */}
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

          <Link
            to="/map"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider transition-all"
          >
            <Map size={14} />
            <span>HARİTA</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex-grow w-full z-10 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
            <Compass size={14} className="text-emerald-400 animate-[spin_20s_linear_infinite]" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase">
              HİKAYEMİZ & VİZYONUMUZ
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {t('about.heroStart')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-300">{t('about.heroAccent')}</span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/70 font-light leading-relaxed">
            {t('about.heroText')}
          </p>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Why TraceAtlas */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl backdrop-blur-md flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#041a14] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300">
                <Navigation size={28} />
              </div>

              <h2 className="text-2xl font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                {t('about.whyTitle')}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-emerald-100/60 leading-relaxed font-light">
                <p>{t('about.whyParagraph1')}</p>
                <p>{t('about.whyParagraph2')}</p>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/5 flex items-center gap-3 text-xs font-mono text-emerald-400/80">
              <Sparkles size={14} className="text-emerald-400" />
              <span>DİJİTAL VE ÖZGÜR KEŞİF PLATFORMU</span>
            </div>
          </div>

          {/* Card 2: Developer & Origin */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl backdrop-blur-md flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#041a14] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300">
                <User size={28} />
              </div>

              <h2 className="text-2xl font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                {t('about.developerTitle')}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-light">
                <p>
                  {t('about.developerGreeting')} <strong className="text-emerald-300 font-semibold">Eyüp Kaya</strong>.
                </p>
                <p className="text-emerald-100/60">
                  {t('about.developerParagraph1')}
                </p>
                <p className="text-emerald-100/60 flex items-center gap-2">
                  <span>{t('about.developerParagraph2')}</span>
                  <Heart size={15} className="text-rose-400 fill-rose-500/30 inline shrink-0" />
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 mt-6 border-t border-white/5 relative z-10">
              <nav aria-label={t('about.socialNav')} className="flex flex-wrap gap-3">
                <a 
                  href="https://www.linkedin.com/in/dp-eyup-kaya/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-[#0077b5]/20 hover:text-[#0077b5] border border-white/10 hover:border-[#0077b5]/40 text-xs font-mono font-bold transition-all group/btn"
                  aria-label={t('about.linkedinAria')}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                  <ExternalLink size={12} className="opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                </a>
                
                <a 
                  href="https://github.com/dpeyupkaya" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/10 text-xs font-mono font-bold transition-all"
                  aria-label={t('about.githubAria')}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-mono font-bold transition-all shadow-md shadow-emerald-950/40"
                  aria-label={t('about.mailAria')}
                >
                  <Mail size={16} />
                  <span>{t('about.contactCta')}</span>
                </Link>
              </nav>
            </div>
          </div>

        </section>

        {/* Bottom Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#041f18] to-emerald-950/40 border border-emerald-500/20 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight relative z-10">
            Kendi Atlasını Oluşturmaya Başla
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/70 max-w-xl mx-auto leading-relaxed font-light relative z-10">
            TraceAtlas ile gezdiğin patikaları, unutamadığın kamp yerlerini ve gizli koyları tek bir interaktif haritada kaydet.
          </p>
          <div className="pt-2 relative z-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/map"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black tracking-widest text-xs uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
            >
              <Map size={15} />
              <span>Haritayı Aç</span>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-100 border border-white/10 hover:border-emerald-500/30 font-bold tracking-widest text-xs uppercase transition-all inline-flex items-center gap-2"
            >
              <Send size={15} />
              <span>İletişime Geç</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
