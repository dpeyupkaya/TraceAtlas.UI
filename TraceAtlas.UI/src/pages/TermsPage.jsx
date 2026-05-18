import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPrinter, FiShield, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';

const TermsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scopeItems = t('terms.scopeItems', { returnObjects: true });
  const scopeNotes = t('terms.scopeNotes', { returnObjects: true });
  const userItems = t('terms.userItems', { returnObjects: true });
  const contentItems = t('terms.contentItems', { returnObjects: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      <Helmet>
        <title>{t('terms.seoTitle')}</title>
        <meta name="description" content={t('terms.seoDescription')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('terms.seoTitle')} />
        <meta property="og:description" content={t('terms.ogDescription')} />
        <meta property="og:url" content="https://www.traceatlas.com.tr/terms" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/terms" />
      </Helmet>

      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-10 px-4 sm:px-6 shadow-lg relative overflow-hidden">
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
            <FiShield size={250} />
         </div>

         <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex justify-between items-start">
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex items-center gap-2 text-teal-200 hover:text-white transition mb-6 group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> {t('terms.back')}
                </button>
                
                <button 
                  onClick={() => window.print()} 
                  className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition backdrop-blur-sm"
                >
                  <FiPrinter /> {t('terms.print')}
                </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('terms.title')}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-teal-100 text-sm">
                <span>{t('terms.lastUpdate')}</span>
                <span className="hidden sm:inline">•</span>
                <span>{t('terms.subtitle')}</span>
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-12">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 p-6 border-b border-blue-100 flex gap-4">
                <FiAlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div className="text-sm text-blue-800">
                    <strong>{t('terms.importantTitle')}</strong> {t('terms.importantText')}
                </div>
            </div>

            <div className="p-8 md:p-12 space-y-10 leading-relaxed">
                <section>
                    <p className="text-gray-600 mb-4">
                        {t('terms.intro')}
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">1</span> {t('terms.scopeTitle')}
                    </h3>
                    <p className="mb-3">{t('terms.scopeIntro')}</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                        {scopeItems.map((item, i)=>(
                            <li key={i} className="flex items-center gap-2"><FiCheck className="text-teal-500"/> {item}</li>
                        ))}
                    </ul>
                    <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                        {scopeNotes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </section>

                <hr className="border-gray-100" />

                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">2</span> {t('terms.userTitle')}
                    </h3>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 text-sm space-y-3">
                        <p>{t('terms.userIntro')}</p>
                        <ul className="list-disc list-inside space-y-2 marker:text-teal-600">
                            {userItems.map((item) => (
                              <li key={item.label}><strong>{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <hr className="border-gray-100" />

                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">3</span> {t('terms.disclaimerTitle')}
                    </h3>
                    <p className="mb-4">{t('terms.disclaimerIntro')}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2 text-sm">{t('terms.lossTitle')}</h4>
                            <p className="text-sm text-gray-600">{t('terms.lossText')}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2 text-sm">{t('terms.outageTitle')}</h4>
                            <p className="text-sm text-gray-600">{t('terms.outageText')}</p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">4</span> {t('terms.contentTitle')}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                        {contentItems.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </section>

                <hr className="border-gray-100" />

                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">5</span> {t('terms.privacyTitle')}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        {t('terms.privacyText')}
                    </p>
                </section>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
