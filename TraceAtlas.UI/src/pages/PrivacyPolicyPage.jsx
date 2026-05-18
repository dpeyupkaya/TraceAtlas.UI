import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiX, FiMenu, FiInfo, FiUser, FiGlobe, FiLock, FiShield, FiDatabase } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = t('privacy.sections', { returnObjects: true });
  const accountItems = t('privacy.accountItems', { returnObjects: true });
  const locationItems = t('privacy.locationItems', { returnObjects: true });
  const purposeItems = t('privacy.purposeItems', { returnObjects: true });
  const tableHeaders = t('privacy.tableHeaders', { returnObjects: true });
  const retentionRows = t('privacy.retentionRows', { returnObjects: true });
  const rightsItems = t('privacy.rightsItems', { returnObjects: true });
  const copyrightItems = t('privacy.copyrightItems', { returnObjects: true });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      <Helmet>
        <title>{t('privacy.seoTitle')}</title>
        <meta name="description" content={t('privacy.seoDescription')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('privacy.seoTitle')} />
        <meta property="og:description" content={t('privacy.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/privacy-policy" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/privacy-policy" />
      </Helmet>

      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-teal-200 hover:text-white transition mb-6 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform"/> {t('privacy.back')}
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{t('privacy.title')}</h1>
              <p className="text-teal-100 text-sm md:text-base max-w-2xl flex items-center gap-2">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">{t('privacy.badge')}</span>
                {t('privacy.subtitle')}
              </p>
            </div>
            <div className="text-xs md:text-sm font-mono text-teal-300 opacity-80">
               <button 
                onClick={() => navigate('/contact')}
                className="inline-block bg-gray-700 px-6 py-3 rounded-lg text-teal-400 font-mono text-sm border border-gray-600 
                           hover:bg-gray-600 hover:text-teal-300 hover:border-teal-500/50 
                           transition-all duration-300 active:scale-95 cursor-pointer group"
              >
                {t('privacy.developer')} <span className="underline decoration-teal-800 underline-offset-4 group-hover:decoration-teal-400">Eyüp Kaya</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex justify-between items-center">
        <span className="font-bold text-gray-800 text-sm">{t('privacy.contents')}</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-teal-700 p-1 border border-teal-100 rounded">
          {mobileMenuOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
           <div className="bg-white absolute top-[110px] left-0 right-0 p-4 border-b border-gray-200 shadow-xl" onClick={e => e.stopPropagation()}>
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button 
                      onClick={() => scrollToSection(section.id)}
                      className="block w-full text-left text-gray-700 hover:text-teal-600 font-medium py-2 border-b border-gray-50 last:border-0"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 text-sm uppercase tracking-wide">{t('privacy.contents')}</h3>
            <ul className="space-y-1 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <button 
                    onClick={() => scrollToSection(section.id)}
                    className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover:pl-2 transition-all duration-200 w-full text-left py-1.5 rounded"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-10 md:space-y-12">
          <section id="proje-hakkinda" className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex gap-4 items-start">
            <FiInfo className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
               <h2 className="font-bold text-blue-900 text-lg mb-1">{t('privacy.projectTitle')}</h2>
               <p className="text-sm text-blue-800 leading-relaxed">
                 {t('privacy.projectText')}
               </p>
            </div>
          </section>

          <section id="toplanan-veriler">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('privacy.dataTitle')}</h2>
            <p className="mb-4 text-sm text-gray-600">{t('privacy.dataIntro')}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm"><FiUser className="text-teal-600"/> {t('privacy.accountInfo')}</h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {accountItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm"><FiGlobe className="text-teal-600"/> {t('privacy.locationInfo')}</h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {locationItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <section id="kullanim-amaci">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('privacy.purposeTitle')}</h2>
            <p className="mb-4 text-gray-600">{t('privacy.purposeIntro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                {purposeItems.map((item) => (
                  <li key={item.label}><span className="font-medium text-gray-800">{item.label}</span> {item.text}</li>
                ))}
            </ul>
          </section>

          <section id="veri-paylasimi">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('privacy.sharingTitle')}</h2>
            <p className="mb-4 text-gray-600">
              {t('privacy.sharingText')}
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
               <strong>{t('privacy.note')}</strong> {t('privacy.sharingNote')}
            </div>
          </section>

          <section id="saklama-suresi">
             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('privacy.retentionTitle')}</h2>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      {tableHeaders.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {retentionRows.map((row) => (
                      <tr key={row[0]} className="border-b last:border-b-0">
                        <td className="px-4 py-3 font-medium">{row[0]}</td>
                        <td className="px-4 py-3">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </section>

          <section id="kullanici-haklari">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('privacy.rightsTitle')}</h2>
            <p className="mb-4 text-gray-600">{t('privacy.rightsIntro')}</p>
            <div className="grid sm:grid-cols-2 gap-3">
                {rightsItems.map((hak, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                     <FiArrowLeft className="text-teal-500 rotate-180" />
                     <span className="text-sm font-medium text-gray-700">{hak}</span>
                  </div>
                ))}
            </div>
          </section>

          <section id="guvenlik">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('privacy.securityTitle')}</h2>
            <p className="mb-4 text-gray-600">{t('privacy.securityIntro')}</p>
            <div className="flex flex-wrap gap-3">
               <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-2"><FiLock/> Password Hashing</span>
               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-2"><FiShield/> JWT Authentication</span>
               <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex items-center gap-2"><FiDatabase/> Secure API Endpoints</span>
            </div>
          </section>

          <section id="telif-haklari">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
              {t('privacy.copyrightTitle')}
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                {t('privacy.copyrightText')}
              </p>
              <ul className="mt-3 list-disc list-inside text-sm text-red-900 space-y-1">
                {copyrightItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
            
          <section className="bg-gray-800 text-gray-300 p-6 md:p-8 rounded-2xl text-center">
            <h2 className="text-xl font-bold text-white mb-2">{t('privacy.contactTitle')}</h2>
            <p className="mb-4 text-sm">
              {t('privacy.contactText')}
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-block bg-gray-700 px-6 py-3 rounded-lg text-teal-400 font-mono text-sm border border-gray-600 
                         hover:bg-gray-600 hover:text-teal-300 hover:border-teal-500/50 
                         transition-all duration-300 active:scale-95 cursor-pointer group"
            >
              {t('privacy.developer')} <span className="underline decoration-teal-800 underline-offset-4 group-hover:decoration-teal-400">Eyüp Kaya</span>
            </button>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
