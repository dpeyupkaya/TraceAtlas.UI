import React, { useState } from 'react';
import profileService from '../../../services/profileService'; 
import { useTranslation } from 'react-i18next';

// Icon componentleri (LockIcon, EnvelopeIcon) aynı kalacak, buraya tekrar yazmıyorum...
const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
  </svg>
);

const EnvelopeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

// BURASI DEĞİŞTİ: userEmail'i prop olarak alıyoruz
const SecuritySettings = ({ userEmail }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!userEmail) {
      alert(t('profile.security.missingEmail'));
      return;
    }

    try {
      setLoading(true);
      // Servise prop'tan gelen maili gönderiyoruz
      await profileService.sendPasswordResetLink(userEmail);
      
      setMailSent(true);
    } catch (error) {
      console.error("Mail gönderim hatası:", error);
      alert(t('profile.security.sendError', { message: error.response?.data?.message || t('profile.security.fallbackError') }));
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... JSX kısmın tamamen aynı kalacak ...
    <div>
      <div className="grid gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-[#1E3A3A]">
            <div className="p-2 bg-[#1E3A3A]/10 rounded-lg">
                <LockIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">{t('profile.security.title')}</h3>
          </div>

          <div className="max-w-xl">
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('profile.security.descriptionStart')} 
              {/* İstersen kullanıcının mailini de burada gösterebilirsin */}
              <span className="block mt-2 font-medium text-[#1E3A3A]">{userEmail}</span> 
              {t('profile.security.descriptionEnd')}
            </p>

            {!mailSent ? (
              <button 
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1E3A3A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#2D554F] transition-all duration-300 hover:shadow-lg hover:shadow-[#1E3A3A]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t('profile.security.sending')}</span>
                  </>
                ) : (
                  <>
                    <EnvelopeIcon className="w-5 h-5" />
                    <span>{t('profile.security.send')}</span>
                  </>
                )}
              </button>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-700">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-green-800">{t('profile.security.sentTitle')}</h4>
                  <p className="text-sm text-green-700 mt-1">
                    {t('profile.security.sentText')}
                  </p>
                  <button 
                    onClick={() => setMailSent(false)} 
                    className="text-sm font-semibold text-green-800 underline mt-3 hover:text-green-900"
                  >
                    {t('profile.security.sendAgain')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
