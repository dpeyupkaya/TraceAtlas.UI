import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPrinter, FiShield, FiAlertCircle, FiCheck, FiUser } from 'react-icons/fi';
import Footer from '../components/footer/Footer';

const TermsPage = () => {
  const navigate = useNavigate();

  // Sayfa açıldığında en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      
      {/* --- HEADER (Gizlilik Politikası ile aynı stil) --- */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-10 px-4 sm:px-6 shadow-lg relative overflow-hidden">
         {/* Dekoratif Arkaplan */}
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
            <FiShield size={250} />
         </div>

         <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex justify-between items-start">
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex items-center gap-2 text-teal-200 hover:text-white transition mb-6 group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Geri Dön
                </button>
                
                <button 
                  onClick={() => window.print()} 
                  className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition backdrop-blur-sm"
                >
                  <FiPrinter /> Yazdır
                </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">Kullanıcı Sözleşmesi</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-teal-100 text-sm">
                <span>Son Güncelleme: 2026</span>
                <span className="hidden sm:inline">•</span>
                <span>TraceAtlas Platform Kullanım Şartları</span>
            </div>
         </div>
      </div>

      {/* --- ANA İÇERİK --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-12">
        
        {/* Beyaz Kağıt Alanı */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Yasal Uyarı Kutusu */}
            <div className="bg-blue-50 p-6 border-b border-blue-100 flex gap-4">
                <FiAlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div className="text-sm text-blue-800">
                    <strong>Önemli Bilgilendirme:</strong> Bu platform (TraceAtlas), bireysel bir  proje olarak geliştirilmiştir. 
                    Aşağıdaki sözleşme, platformun kullanımı sırasındaki kuralları belirler ancak hizmetin sürekliliği veya verilerin kalıcılığı konusunda ticari bir garanti verilmez.
                </div>
            </div>

            <div className="p-8 md:p-12 space-y-10 leading-relaxed">

                {/* GİRİŞ */}
                <section>
                    <p className="text-gray-600 mb-4">
                        Bu Kullanıcı Sözleşmesi ("Sözleşme"), TraceAtlas ("Platform") ile Platforma üye olan veya ziyaret eden kullanıcı ("Kullanıcı") arasında akdedilmiştir.
                        Platformu kullanarak bu şartları kabul etmiş sayılırsınız.
                    </p>
                </section>

                {/* 1. HİZMETİN KAPSAMI */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">1</span> Hizmetin Kapsamı
                    </h3>
                    <p className="mb-3">TraceAtlas, kullanıcılara aşağıdaki imkanları sunar:</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                        {['Konum işaretleme ve paylaşma', 'Fotoğraf ve içerik yükleme', 'Favori listeleri oluşturma', 'Paylaşılabilir link üretimi'].map((item, i)=>(
                            <li key={i} className="flex items-center gap-2"><FiCheck className="text-teal-500"/> {item}</li>
                        ))}
                    </ul>
                    <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                        <li>Platform, kullanıcı verilerinin güvenliğini sağlamak için endüstri standartlarında önlemler alır ancak %100 güvenlik garanti edilemez.</li>
                        <li>Platformun sürekli erişilebilirliği teknik sorunlar, bakım veya geliştirme çalışmaları nedeniyle zaman zaman kesintiye uğrayabilir.</li>
                    </ul>
                </section>

                <hr className="border-gray-100" />

            
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">2</span> Kullanıcı Yükümlülükleri
                    </h3>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 text-sm space-y-3">
                        <p>Kullanıcı, platformu kullanırken aşağıdakileri taahhüt eder:</p>
                        <ul className="list-disc list-inside space-y-2 marker:text-teal-600">
                            <li><strong>Doğru Bilgi:</strong> Hesap oluştururken verilen bilgiler (e-posta, kullanıcı adı) doğru olmalıdır.</li>
                            <li><strong>Yasal İçerik:</strong> Türkiye Cumhuriyeti yasalarına aykırı, tehditkar, müstehcen veya telif haklarını ihlal eden içerik yüklenemez.</li>
                            <li><strong>Güvenlik:</strong> Kullanıcı, hesabının güvenliğinden (şifre vb.) kendisi sorumludur.</li>
                            <li><strong>Sisteme Zarar Vermeme:</strong> API'leri manipüle etme, brute-force saldırıları veya sistemi yoracak bot işlemleri yasaktır.</li>
                        </ul>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* 3. SORUMLULUK REDDİ (EN ÖNEMLİ KISIM) */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">3</span> Sorumluluk Reddi (Disclaimer)
                    </h3>
                    <p className="mb-4">TraceAtlas, bir eğitim ve geliştirme projesi olup <strong>"OLDUĞU GİBİ" (AS-IS)</strong> sunulmaktadır.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2 text-sm">Veri Kaybı</h4>
                            <p className="text-sm text-gray-600">Teknik güncellemeler veya sunucu değişiklikleri sırasında oluşabilecek veri kayıplarından Geliştirici sorumlu tutulamaz.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2 text-sm">Hizmet Kesintisi</h4>
                            <p className="text-sm text-gray-600">Platform, bakım veya geliştirme çalışmaları nedeniyle önceden haber verilmeksizin geçici olarak durdurulabilir.</p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* 4. İÇERİK VE TELİF HAKLARI */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">4</span> İçerik ve Telif Hakları
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                        <li>Kullanıcı, paylaştığı içeriğin telif hakkının kendisine ait olduğunu kabul eder.</li>
                        <li>Platform, kullanıcı içeriğini sadece hizmet sunumu amacıyla (haritada gösterme vb.) kullanma hakkına sahiptir.</li>
                        <li>Geliştirici, uygunsuz görülen içerikleri veya hesapları herhangi bir bildirim yapmaksızın silme hakkını saklı tutar.</li>
                    </ul>
                </section>

                <hr className="border-gray-100" />

                {/* 5. PAYLAŞILABİLİR LİNKLER */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">5</span> Paylaşım ve Gizlilik
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Oluşturulan "Paylaşılabilir Linkler" (<span className="font-mono bg-gray-100 px-1">/shared/:id</span>), linke sahip olan herkes tarafından görüntülenebilir. 
                        Bu linklerin paylaşımından doğacak gizlilik ihlallerinden kullanıcı sorumludur.
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