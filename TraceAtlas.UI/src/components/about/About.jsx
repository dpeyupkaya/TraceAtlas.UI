import React from 'react';
import { Map, User, Mail, Linkedin, Github, ExternalLink, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../footer/Footer';

const About = () => {
  const { t, i18n } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
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
    <main className="min-h-screen bg-[#05110e] relative overflow-hidden text-slate-200 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Helmet htmlAttributes={{ lang: i18n.resolvedLanguage || i18n.language }}>
        <title>{t('about.seoTitle')}</title>
        <meta name="description" content={t('about.seoDescription')} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('about.seoTitle')} />
        <meta property="og:description" content={t('about.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/about" />
        <meta property="og:site_name" content="TraceAtlas" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('about.seoTitle')} />
        <meta name="twitter:description" content={t('about.twitterDescription')} />
        
        <link rel="canonical" href="https://www.traceatlas.com.tr/about" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-teal-800/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative pt-32 pb-20 px-6 container mx-auto max-w-5xl flex-1 z-10">
        <article>
          <header className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-6 ring-1 ring-emerald-500/20">
              <Map className="w-8 h-8 text-emerald-400" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              {t('about.heroStart')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">{t('about.heroAccent')}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t('about.heroText')}
            </p>
          </header>

          <section className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:bg-white/[0.07]">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-500 rounded-full" aria-hidden="true"/>
                {t('about.whyTitle')}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                {t('about.whyParagraph1')}
              </p>
              <p className="text-slate-400 leading-relaxed">
                {t('about.whyParagraph2')}
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-white/5 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all" aria-hidden="true"/>
              
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <User className="text-emerald-400" aria-hidden="true" />
                {t('about.developerTitle')}
              </h2>
              <div className="space-y-4 relative z-10">
                <p className="text-slate-300 leading-relaxed">
                  {t('about.developerGreeting')} <strong className="text-emerald-300">Eyüp Kaya</strong>.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {t('about.developerParagraph1')}
                </p>
                <p className="text-slate-400 leading-relaxed flex items-center gap-2">
                  {t('about.developerParagraph2')} <Heart size={16} className="text-rose-500 inline fill-rose-500/20" aria-hidden="true"/>
                </p>
              </div>
          
              <nav aria-label={t('about.socialNav')} className="mt-8 flex flex-wrap gap-4">
                <a href="https://www.linkedin.com/in/dp-eyup-kaya/" target="_blank" rel="noreferrer" 
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] border border-white/10 hover:border-[#0077b5]/30 transition-all group/btn"
                   aria-label={t('about.linkedinAria')}>
                  <Linkedin size={20} aria-hidden="true" />
                  <span className="font-medium">LinkedIn</span>
                  <ExternalLink size={14} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" aria-hidden="true"/>
                </a>
                
                <a href="https://github.com/dpeyupkaya" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
                   aria-label={t('about.githubAria')}>
                  <Github size={20} aria-hidden="true" />
                  <span className="font-medium">GitHub</span>
                </a>

                <a href="mailto:dpeyupkaya@gmail.com"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all"
                   aria-label={t('about.mailAria')}>
                  <Mail size={20} aria-hidden="true" />
                  <span className="font-medium">{t('about.contactCta')}</span>
                </a>
              </nav>
            </div>
          </section>
        </article>
      </div>

      <div className="w-full relative z-10">
        <Footer />
      </div>

    </main>
  );
};

export default About;
