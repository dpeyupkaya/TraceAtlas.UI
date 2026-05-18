import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../../../common/ConfirmationModal';
import profileService from '../../../services/profileService';
import { useTranslation } from 'react-i18next';

const EnvelopeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

const UserPreferences = ({ user }) => { 
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [preferences, setPreferences] = useState({
    marketingEmails: false,
    securityEmails: true
  });

  const preferenceConfig = [
    { 
      key: 'securityEmails', 
      title: t('profile.preferences.securityTitle'), 
      desc: t('profile.preferences.securityDesc'),
      disabled: true 
    },
    { 
      key: 'marketingEmails', 
      title: t('profile.preferences.marketingTitle'), 
      desc: t('profile.preferences.marketingDesc') 
    }
  ];

  // --- GET İŞLEMİ (Verileri Çekme) ---
  useEffect(() => {
    const loadPreferences = async () => {
      setLoading(true);
      try {
        // Backend'den veriyi çekiyoruz
        const data = await profileService.getEmailPreferences();
        
    
        if (data) {
          // 1. ADIM: Backend'den gelen değer hangi anahtarda (key) saklı?
          // C# DTO'su "MarketingEmails" gönderiyor ama bazen büyük harf gelir.
          // O yüzden hepsini kontrol ediyoruz.
          
          const rawValue = 
            data.marketingEmails ?? 
            data.MarketingEmails ?? 
            data.IsUsed ?? 
            data.isUsed;

          

          // 2. ADIM: Gelen değer 1 mi, true mu? (Hepsini true kabul et)
          const isEnabled = (rawValue === true || rawValue === 1 || rawValue === "true");

          // 3. ADIM: State'i güncelle
          setPreferences({
            marketingEmails: isEnabled,
            securityEmails: true // Bu sabit kalsın demiştik
          });
        }
      } catch (error) {
        console.error("Yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const confirmSave = async () => {
    try {
      setSaving(true);

      await profileService.updateEmailPreferences({
        marketingEmails: preferences.marketingEmails
      });

      alert(t('profile.preferences.saved'));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Hata", error);
      alert(t('profile.preferences.saveError'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A3A]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#1E3A3A]/10 rounded-xl">
            <EnvelopeIcon className="w-6 h-6 text-[#1E3A3A]" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-[#1E3A3A]">{t('profile.preferences.title')}</h2>
            <p className="text-sm text-gray-500">
                {user ? t('profile.preferences.subtitleWithEmail', { email: user.email }) : t('profile.preferences.subtitle')}
            </p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {preferenceConfig.map((item, index) => (
          <div key={item.key} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${index !== preferenceConfig.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div className="pr-4">
              <h3 className="font-bold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
           
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!!preferences[item.key]}
                onChange={() => handleToggle(item.key)}
                className="sr-only"
                disabled={item.disabled}
              />

              <div
                className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
                ${preferences[item.key] ? 'bg-[#1E3A3A]' : 'bg-gray-200'}
                ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}
                relative`}
              >
                <div
                  className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white rounded-full border border-gray-300 transition-transform
                  ${preferences[item.key] ? 'translate-x-full' : ''}`}
                ></div>
              </div>
            </label>

          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button 
            onClick={handleSaveClick}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1E3A3A] to-[#2D554F] text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#1E3A3A]/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            <span>{saving ? t('profile.preferences.saving') : t('profile.preferences.saveChanges')}</span>
        </button>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSave}
        title={t('profile.preferences.confirmTitle')}
        message={t('profile.preferences.confirmMessage')}
        type="primary"
        confirmText={t('profile.preferences.confirmSave')}
        cancelText={t('common.buttons.cancel')}
        isLoading={saving}
      />
    </div>
  );
};

export default UserPreferences;
