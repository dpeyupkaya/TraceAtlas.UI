import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Shield, AlertTriangle, CheckCircle2, FileText, Lock, Globe2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';

const TermsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scopeItems = t('terms.scopeItems', { returnObjects: true }) || [];
  const scopeNotes = t('terms.scopeNotes', { returnObjects: true }) || [];
  const userItems = t('terms.userItems', { returnObjects: true }) || [];
  const contentItems = t('terms.contentItems', { returnObjects: true }) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#041a14] text-emerald-50 font-sans selection:bg-emerald-500 selection:text-white flex flex-col relative overflow-x-hidden">
      <Helmet>
        <title>{t('terms.seoTitle')}</title>
        <meta name="description" content={t('terms.seoDescription')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('terms.seoTitle')} />
        <meta property="og:description" content={t('terms.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/terms" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/terms" />
      </Helmet>

      {/* Global Background Ambient Lights & Grid */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Header Section */}
      <header className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-gradient-to-b from-[#06241c] to-transparent">
        <div className="max-w-4xl mx-auto">
          
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/30 text-emerald-100/70 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <ArrowLeft size={16} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" /> 
              <span>{t('terms.back')}</span>
            </button>
            
            <button 
              onClick={() => window.print()} 
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 backdrop-blur-md"
            >
              <Printer size={15} /> 
              <span>{t('terms.print')}</span>
            </button>
          </div>

          {/* Badge & Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              <Shield size={12} className="text-emerald-400" />
              <span>TRACEATLAS PROTOCOL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {t('terms.title')}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-emerald-200/50">
              <span className="text-emerald-400 font-bold">{t('terms.lastUpdate')}</span>
              <span>•</span>
              <span>{t('terms.subtitle')}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-8">
        
        {/* Important Warning Banner */}
        <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-amber-500/10 via-emerald-950/30 to-transparent border border-amber-500/20 shadow-xl backdrop-blur-md flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <div className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed space-y-1">
            <strong className="text-amber-300 font-bold block sm:inline mr-2 tracking-wide uppercase text-xs">
              {t('terms.importantTitle')}
            </strong>
            <span>{t('terms.importantText')}</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md space-y-10">
          
          {/* Introduction */}
          <section className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-sm sm:text-base text-emerald-100/70 leading-relaxed font-light">
              {t('terms.intro')}
            </p>
          </section>

          {/* Section 1: Scope */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                01
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('terms.scopeTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
              {t('terms.scopeIntro')}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {scopeItems.map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-colors"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-100/80 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-2 text-xs text-emerald-100/50 list-disc list-inside bg-emerald-950/20 p-4 rounded-xl border border-white/5">
              {scopeNotes.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 2: User Obligations */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                02
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('terms.userTitle')}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-xs sm:text-sm">
              <p className="text-emerald-100/70">{t('terms.userIntro')}</p>
              <div className="space-y-3">
                {userItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#03150f] border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div className="text-emerald-100/70 leading-relaxed">
                      <strong className="text-white font-semibold mr-1.5">{item.label}</strong>
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 3: Disclaimer */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-mono font-bold text-red-400">
                03
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('terms.disclaimerTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
              {t('terms.disclaimerIntro')}
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-colors space-y-2">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {t('terms.lossTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
                  {t('terms.lossText')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-colors space-y-2">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {t('terms.outageTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
                  {t('terms.outageText')}
                </p>
              </div>
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 4: Content & Copyright */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                04
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('terms.contentTitle')}
              </h2>
            </div>

            <div className="space-y-2.5">
              {contentItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <FileText size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 5: Privacy */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                05
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('terms.privacyTitle')}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                {t('terms.privacyText')}
              </p>
            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
