import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../../common/ConfirmationModal';

const EnvelopeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

const UserPreferences = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [preferences, setPreferences] = useState({
    marketingEmails: false,
    securityEmails: true,
    activityEmails: true,
    newsletterEmails: false
  });

  const preferenceConfig = [
    { 
      key: 'securityEmails', 
      title: 'Güvenlik Uyarıları', 
      desc: 'Şüpheli girişler, şifre değişiklikleri ve hesap güvenliği ile ilgili kritik bildirimler.',
      disabled: true 
    },
    { 
      key: 'activityEmails', 
      title: 'Aktivite ve Yorumlar', 
      desc: 'Paylaşımlarınıza gelen beğeniler, yorumlar ve etiketlenmeler hakkında bildirimler.' 
    },
    { 
      key: 'newsletterEmails', 
      title: 'Haftalık Keşif Bülteni', 
      desc: 'İlginizi çekebilecek popüler rotalar ve haftanın öne çıkan mekan önerileri.' 
    },
    { 
      key: 'marketingEmails', 
      title: 'Yenilikler ve Duyurular', 
      desc: 'TraceAtlas güncellemeleri, yeni özellikler ve topluluk duyuruları.' 
    }
  ];

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setPreferences({
          marketingEmails: false,
          securityEmails: true,
          activityEmails: true,
          newsletterEmails: false
        });
      } catch (error) {
        console.error("Hata", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
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
      console.log("API'ye Giden Veri:", preferences);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Tercihleriniz başarıyla güncellendi!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Hata", error);
      alert("Bir hata oluştu.");
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
            <h2 className="text-2xl font-bold text-[#1E3A3A]">E-posta Tercihleri</h2>
            <p className="text-sm text-gray-500">Hangi konularda e-posta almak istediğinizi yönetin.</p>
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
                checked={preferences[item.key]} 
                onChange={() => handleToggle(item.key)}
                className="sr-only peer" 
                disabled={item.disabled}
              />
              <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors duration-200 ease-in-out
                ${preferences[item.key] ? 'bg-[#1E3A3A]' : 'bg-gray-200'}
                peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-5 after:w-5 after:transition-all
                ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              ></div>
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
            <span>Değişiklikleri Kaydet</span>
        </button>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSave}
        title="Tercihleri Kaydet"
        message="Bildirim tercihlerinizi güncellemek üzeresiniz. Devam etmek istiyor musunuz?"
        type="primary"
        confirmText="Evet, Kaydet"
        cancelText="Vazgeç"
        isLoading={saving}
      />
    </div>
  );
};

export default UserPreferences;