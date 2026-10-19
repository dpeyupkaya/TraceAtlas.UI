import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  X, 
  Menu, 
  Info, 
  User, 
  Globe, 
  Lock, 
  Shield, 
  Database, 
  ArrowRight,
  FileText,
  KeyRound,
  Server,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = t('privacy.sections', { returnObjects: true }) || [];
  const accountItems = t('privacy.accountItems', { returnObjects: true }) || [];
  const locationItems = t('privacy.locationItems', { returnObjects: true }) || [];
  const purposeItems = t('privacy.purposeItems', { returnObjects: true }) || [];
  const tableHeaders = t('privacy.tableHeaders', { returnObjects: true }) || [];
  const retentionRows = t('privacy.retentionRows', { returnObjects: true }) || [];
  const rightsItems = t('privacy.rightsItems', { returnObjects: true }) || [];
  const copyrightItems = t('privacy.copyrightItems', { returnObjects: true }) || [];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#041a14] text-emerald-50 font-sans selection:bg-emerald-500 selection:text-white flex flex-col relative overflow-x-hidden">
      <Helmet>
        <title>{t('privacy.seoTitle')}</title>
        <meta name="description" content={t('privacy.seoDescription')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('privacy.seoTitle')} />
        <meta property="og:description" content={t('privacy.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/privacy-policy" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/privacy-policy" />
      </Helmet>

      {/* Ambient background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Header Section */}
      <header className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-gradient-to-b from-[#06241c] to-transparent">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Action */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/30 text-emerald-100/70 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <ArrowLeft size={16} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" /> 
              <span>{t('privacy.back')}</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
              <Shield size={12} />
              DATA TRANSPARENCY
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono font-bold tracking-widest uppercase">
                <span>{t('privacy.badge')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {t('privacy.title')}
              </h1>

              <p className="text-sm md:text-base text-emerald-100/60 font-light leading-relaxed">
                {t('privacy.subtitle')}
              </p>
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="self-start md:self-end px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/30 text-emerald-100/80 hover:text-white text-xs font-mono transition-all duration-300 active:scale-95 group shadow-lg flex items-center gap-2"
            >
              <span>{t('privacy.developer')}</span>
              <span className="font-bold text-emerald-400 group-hover:underline underline-offset-4">Eyüp Kaya</span>
              <ChevronRight size={14} className="text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Sticky Contents Navigator */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#041a14]/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex justify-between items-center shadow-lg">
        <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <Layers size={14} />
          {t('privacy.contents')}
        </span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-300 hover:text-white transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-[#03150f] border-b border-white/10 p-5 pt-20 shadow-2xl space-y-1.5" onClick={e => e.stopPropagation()}>
            {sections.map((section, idx) => (
              <button 
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-emerald-100/70 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
              >
                <span>{section.title}</span>
                <span className="font-mono text-[10px] text-emerald-500/60">0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Layout with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        
        {/* Desktop Sidebar Navigator */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-8 rounded-3xl bg-white/[0.02] border border-white/5 p-6 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <Layers size={15} className="text-emerald-400" />
              <h3 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                {t('privacy.contents')}
              </h3>
            </div>

            <nav className="space-y-1">
              {sections.map((section, idx) => {
                const isActive = activeSection === section.id;
                return (
                  <button 
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between group ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20' 
                        : 'text-emerald-100/60 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="truncate pr-2">{section.title}</span>
                    <span className="font-mono text-[10px] text-emerald-500/40 group-hover:text-emerald-400">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Article Body */}
        <div className="flex-1 rounded-3xl bg-white/[0.02] border border-white/5 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md space-y-12">
          
          {/* Section: Project Scope & Legal Notice */}
          <section id="proje-hakkinda" className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-transparent border border-emerald-500/20 flex gap-4 items-start shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
              <Info size={20} />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <h2 className="font-bold text-white tracking-wide text-base">
                {t('privacy.projectTitle')}
              </h2>
              <p className="text-emerald-100/70 leading-relaxed font-light">
                {t('privacy.projectText')}
              </p>
            </div>
          </section>

          {/* Section 1: Collected Data */}
          <section id="toplanan-veriler" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                01
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.dataTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
              {t('privacy.dataIntro')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <User size={15} />
                  </div>
                  <span>{t('privacy.accountInfo')}</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-100/60">
                  {accountItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Globe size={15} />
                  </div>
                  <span>{t('privacy.locationInfo')}</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-100/60">
                  {locationItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 2: Purpose */}
          <section id="kullanim-amaci" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                02
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.purposeTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
              {t('privacy.purposeIntro')}
            </p>

            <div className="space-y-2.5">
              {purposeItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                    <strong className="text-white font-semibold mr-1.5">{item.label}</strong>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 3: Data Sharing */}
          <section id="veri-paylasimi" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                03
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.sharingTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
              {t('privacy.sharingText')}
            </p>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 font-bold mr-2 uppercase tracking-wider text-xs">
                {t('privacy.note')}
              </strong>
              <span>{t('privacy.sharingNote')}</span>
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 4: Retention Period */}
          <section id="saklama-suresi" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                04
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.retentionTitle')}
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#03150f]">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-white/[0.04] text-emerald-300 font-mono text-[11px] uppercase tracking-wider border-b border-white/5">
                  <tr>
                    {tableHeaders.map((header, idx) => (
                      <th key={idx} className="px-5 py-3.5 font-bold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-emerald-100/70">
                  {retentionRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-white">{row[0]}</td>
                      <td className="px-5 py-3.5">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 5: User Rights */}
          <section id="kullanici-haklari" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                05
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.rightsTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
              {t('privacy.rightsIntro')}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              {rightsItems.map((hak, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-colors"
                >
                  <ArrowRight size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-100/80 font-medium">{hak}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 6: Security Standards */}
          <section id="guvenlik" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                06
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.securityTitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
              {t('privacy.securityIntro')}
            </p>

            <div className="grid sm:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-300">
                <Lock size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Password Hashing</span>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3 text-cyan-300">
                <Shield size={18} className="text-cyan-400 shrink-0" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">JWT Authentication</span>
              </div>

              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center gap-3 text-teal-300">
                <Database size={18} className="text-teal-400 shrink-0" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Secure API Endpoints</span>
              </div>
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Section 7: Copyright */}
          <section id="telif-haklari" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                07
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {t('privacy.copyrightTitle')}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                {t('privacy.copyrightText')}
              </p>
              <ul className="space-y-2 text-xs text-emerald-100/60 pt-2 border-t border-white/5">
                {copyrightItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact Box */}
          <section className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-[#041f18] to-emerald-950/50 border border-emerald-500/30 text-center space-y-4 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('privacy.contactTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-xl mx-auto leading-relaxed">
              {t('privacy.contactText')}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black tracking-widest text-xs uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
              >
                <span>{t('privacy.developer')}: Eyüp Kaya</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
