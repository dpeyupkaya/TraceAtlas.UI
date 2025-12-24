import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiShield, FiLock, FiDatabase, FiGlobe, 
  FiEye, FiServer, FiFileText, FiUser, FiInfo, FiMenu, FiX 
} from 'react-icons/fi';
import Footer from '../components/footer/Footer';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sayfa açıldığında en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Bölüm başlıkları
  const sections = [
    { id: 'proje-hakkinda', title: 'Proje Hakkında' },
    { id: 'toplanan-veriler', title: '1. Toplanan Veriler' },
    { id: 'kullanim-amaci', title: '2. Kullanım Amacı' },
    { id: 'veri-paylasimi', title: '3. Veri Paylaşımı' },
    { id: 'saklama-suresi', title: '4. Saklama Süresi' },
    { id: 'kullanici-haklari', title: '5. Kullanıcı Hakları' },
    { id: 'guvenlik', title: '6. Güvenlik Önlemleri' },
    { id: 'telif-haklari', title: '7. Telif Hakları' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false); // Mobildeysek menüyü kapat
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      
      {/* --- HEADER --- */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-teal-200 hover:text-white transition mb-6 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform"/> Geri Dön
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">Gizlilik Politikası ve Aydınlatma Metni</h1>
              <p className="text-teal-100 text-sm md:text-base max-w-2xl flex items-center gap-2">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">ÖĞRENCİ PROJESİ</span>
                Bu metin, projenin teknik yetkinliğini göstermek amacıyla hazırlanmıştır.
              </p>
            </div>
            <div className="text-xs md:text-sm font-mono text-teal-300 opacity-80">
               <button 
    onClick={() => navigate('/contact')}
    className="inline-block bg-gray-700 px-6 py-3 rounded-lg text-teal-400 font-mono text-sm border border-gray-600 
               hover:bg-gray-600 hover:text-teal-300 hover:border-teal-500/50 
               transition-all duration-300 active:scale-95 cursor-pointer group"
  >
    Geliştirici: <span className="underline decoration-teal-800 underline-offset-4 group-hover:decoration-teal-400">Eyüp Kaya</span>
  </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE QUICK MENU BUTTON --- */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex justify-between items-center">
        <span className="font-bold text-gray-800 text-sm">İçindekiler</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-teal-700 p-1 border border-teal-100 rounded">
          {mobileMenuOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
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

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* SIDEBAR (Desktop Sticky) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 text-sm uppercase tracking-wide">İçindekiler</h3>
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

        {/* DOCUMENT CONTENT */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-10 md:space-y-12">

          {/* UYARI KUTUSU */}
          <section id="proje-hakkinda" className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex gap-4 items-start">
            <FiInfo className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
               <h2 className="font-bold text-blue-900 text-lg mb-1">Yasal Uyarı & Proje Kapsamı</h2>
               <p className="text-sm text-blue-800 leading-relaxed">
                 Bu uygulama (TraceAtlas), <strong>Eyüp Kaya</strong> tarafından yazılım geliştirme yetkinliklerini sergilemek amacıyla hazırlanmış bir <strong>bireysel  projedir.</strong> 
                 Herhangi bir ticari şirket veya tüzel kişilik (TraceAtlas Teknoloji vb.) mevcut değildir. 
               </p>
            </div>
          </section>

          {/* 1. TOPLANAN VERİLER */}
          <section id="toplanan-veriler">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">1. Toplanan Veriler (Demo Kapsamında)</h2>
            <p className="mb-4 text-sm text-gray-600">Sistem, projenin çalışabilirliğini göstermek amacıyla aşağıdaki verileri veritabanında işler:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm"><FiUser className="text-teal-600"/> Hesap Bilgileri</h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Kullanıcı Adı ve E-posta</li>
                  <li>Hash'lenmiş (Şifreli) Parola</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm"><FiGlobe className="text-teal-600"/> Konum Verileri</h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Haritada işaretlenen koordinatlar</li>
                  <li>Eklenen başlık, açıklama ve görseller</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. KULLANIM AMACI */}
          <section id="kullanim-amaci">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">2. Kullanım Amacı</h2>
            <p className="mb-4 text-gray-600">Toplanan veriler yalnızca eğitim ve portfolyo sunumu amaçlıdır:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li><span className="font-medium text-gray-800">Teknik Gösterim:</span> Frontend (React) ve Backend (C# .NET) iletişimini sağlamak.</li>
                <li><span className="font-medium text-gray-800">Harita Fonksiyonları:</span> Kullanıcının işaretlediği yerleri haritada tekrar gösterebilmek.</li>
                <li><span className="font-medium text-gray-800">Güvenlik Testleri:</span> JWT Token ve yetkilendirme mekanizmalarını test etmek.</li>
            </ul>
          </section>

          {/* 3. VERİ PAYLAŞIMI */}
          <section id="veri-paylasimi">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">3. Veri Paylaşımı</h2>
            <p className="mb-4">
              Bu proje ticari olmadığı için verileriniz <span className="font-bold text-red-500">kesinlikle</span> reklam şirketleri veya üçüncü taraf veri simsarlarıyla paylaşılmaz.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
               <strong>Not:</strong> Projenin sunucusu (Hosting/Cloud) üzerinde tutulan veriler, ilgili bulut sağlayıcısının (örn: Azure, AWS veya Yerel Host) altyapısında saklanmaktadır.
            </div>
          </section>

          {/* 4. SAKLAMA SÜRESİ */}
          <section id="saklama-suresi">
             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">4. Saklama Süresi</h2>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="px-4 py-3">Veri Tipi</th>
                      <th className="px-4 py-3">Saklama Politikası</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Kullanıcı Hesabı</td>
                      <td className="px-4 py-3">Proje yayında olduğu sürece veya talep üzerine silinir.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Log Kayıtları</td>
                      <td className="px-4 py-3">Hata ayıklama (Debugging) süresince saklanır.</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </section>

          {/* 5. KULLANICI HAKLARI */}
          <section id="kullanici-haklari">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">5. Kullanıcı Hakları (Simülasyon)</h2>
            <p className="mb-4 text-gray-600">Gerçek bir KVKK/GDPR senaryosunda sahip olacağınız haklar şunlardır (ve bu projede uygulanabilir):</p>
            
            <div className="grid sm:grid-cols-2 gap-3">
               {[
                 "Hesabımı tamamen silme hakkı",
                 "Verilerimin bir kopyasını isteme hakkı",
                 "Paylaştığım konumları ve fotoğrafları kaldırma hakkı",
               ].map((hak, index) => (
                 <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                    <FiArrowLeft className="text-teal-500 rotate-180" />
                    <span className="text-sm font-medium text-gray-700">{hak}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* 6. GÜVENLİK */}
          <section id="guvenlik">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">6. Güvenlik Önlemleri</h2>
            <p className="mb-4 text-gray-600">Bir öğrenci projesi olmasına rağmen, endüstri standardı güvenlik önlemleri kodlanmıştır:</p>
            <div className="flex flex-wrap gap-3">
               <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-2"><FiLock/> Password Hashing</span>
               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-2"><FiShield/> JWT Authentication</span>
               <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex items-center gap-2"><FiDatabase/> Secure API Endpoints</span>
            </div>
          </section>
          {/* 7. TELİF HAKLARI */}
<section id="telif-haklari">
  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
    7. Fikri Mülkiyet ve Telif Hakları
  </h2>
  <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
    <p className="text-gray-800 leading-relaxed">
      Bu projenin (TraceAtlas) kaynak kodları, arayüz tasarımı, logo ve tüm içerik materyalleri 
      <strong> Eyüp Kaya</strong>'ya aittir. 
    </p>
    <ul className="mt-3 list-disc list-inside text-sm text-red-900 space-y-1">
      <li>Yazılı izin alınmaksızın projenin kopyalanması, çoğaltılması veya dağıtılması yasaktır.</li>
      <li>Ticari amaçlarla kullanılamaz veya başka mecralarda paylaşımı yapılamaz.</li>
      <li>Tüm hakları saklıdır.</li>
    </ul>
  </div>
</section>
          
       {/* İLETİŞİM */}
<section className="bg-gray-800 text-gray-300 p-6 md:p-8 rounded-2xl text-center">
  <h2 className="text-xl font-bold text-white mb-2">İletişim</h2>
  <p className="mb-4 text-sm">
    Bu proje hakkındaki teknik sorularınız veya incelemeleriniz için geliştirici ile iletişime geçebilirsiniz.
  </p>
  
  <button 
    onClick={() => navigate('/contact')}
    className="inline-block bg-gray-700 px-6 py-3 rounded-lg text-teal-400 font-mono text-sm border border-gray-600 
               hover:bg-gray-600 hover:text-teal-300 hover:border-teal-500/50 
               transition-all duration-300 active:scale-95 cursor-pointer group"
  >
    Geliştirici: <span className="underline decoration-teal-800 underline-offset-4 group-hover:decoration-teal-400">Eyüp Kaya</span>
  </button>
</section>

        </div>
      </div>
      
    <Footer />

    </div>
  );
};

export default PrivacyPolicyPage;