import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMap, FiCompass, FiHome, FiArrowLeft } from 'react-icons/fi';
import Footer from '../components/footer/Footer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Arkaplan Dekorasyonu (Silik Harita Hissi) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 transform -rotate-12"><FiMap size={150} /></div>
        <div className="absolute bottom-10 right-10 transform rotate-12"><FiCompass size={150} /></div>
      </div>

      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-8 text-center relative z-10 border border-gray-100">
        
        {/* Hareketli İkon Alanı */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-75"></div>
            <div className="bg-teal-50 p-6 rounded-full relative z-10">
              <FiCompass className="text-teal-600 animate-spin-slow" size={64} />
            </div>
            {/* Küçük 404 Badge'i */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
              404
            </div>
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Rotadan Çıktınız!
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Aradığınız koordinatlar TraceAtlas haritalarında bulunamadı. Sayfa silinmiş veya yanlış bir yol izlenmiş olabilir.
        </p>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
         
          <button 
            onClick={() => navigate('/map')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FiHome />
            Ana Haritaya Dön
          </button>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            TraceAtlas &copy; {new Date().getFullYear()} • Kayıp mı oldunuz? <span className="text-teal-600 cursor-pointer hover:underline">Destek alın</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;