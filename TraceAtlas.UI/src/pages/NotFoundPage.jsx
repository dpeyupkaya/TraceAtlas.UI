import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMap, FiCompass, FiHome, FiArrowLeft, FiNavigation } from 'react-icons/fi';
import Footer from '../components/footer/Footer';


const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-[#1E3A3A] to-teal-800 flex items-center justify-center p-4 relative overflow-hidden">
     
      {/* Arkaplan Dekorasyonu - Geliştirilmiş */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 transform -rotate-12 text-white/5">
          <FiMap size={180} />
        </div>
        <div className="absolute bottom-1/4 right-10 transform rotate-12 text-white/5">
          <FiCompass size={180} />
        </div>
        <div className="absolute top-1/3 right-1/4 transform rotate-45 text-white/3">
          <FiNavigation size={120} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 transform -rotate-45 text-white/3">
          <FiMap size={120} />
        </div>
        {/* Grid efekti */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm max-w-xl w-full rounded-3xl shadow-2xl p-8 text-center relative z-10 border border-gray-200/50">
        
        {/* Hareketli İkon Alanı - Geliştirilmiş */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Çoklu yankı efekti */}
            <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-50"></div>
            <div className="absolute inset-0 bg-teal-200 rounded-full animate-ping opacity-30" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-0 bg-teal-300 rounded-full animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
            
            {/* Ana ikon container */}
            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-full relative z-10 border-4 border-teal-100 shadow-lg">
              <div className="relative">
                <FiCompass className="text-teal-600 animate-spin-slow" size={72} />
                {/* Pusula iğnesi efekti */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-12 bg-red-500 rounded-full transform rotate-45"></div>
                </div>
              </div>
            </div>
            
            {/* Küçük 404 Badge'i */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full border-4 border-white shadow-lg animate-bounce">
              404
            </div>
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Rotadan Çıktınız!
            </span>
          </h1>
          <p className="text-gray-600 mb-2 text-lg leading-relaxed">
            Aradığınız koordinatlar TraceAtlas haritalarında bulunamadı.
          </p>
          <p className="text-gray-500 text-base">
            Sayfa silinmiş veya yanlış bir yol izlenmiş olabilir.
          </p>
        </div>

        {/* Aksiyon Butonları - Geliştirilmiş */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-100 transition-all duration-300 font-medium shadow-md hover:shadow-xl transform hover:-translate-y-1 border border-gray-200"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Bir Önceki Sayfa</span>
          </button>
          
          <button 
            onClick={() => navigate('/map')}
            className="group flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-medium shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <FiHome className="group-hover:scale-110 transition-transform" />
            <span>Ana Haritaya Dön</span>
          </button>
        </div>

       

        {/* Alt Bilgi */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            TraceAtlas &copy; {new Date().getFullYear()} • Kayıp mı oldunuz?{" "}
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-1 font-medium text-teal-600 hover:text-teal-700 transition-colors group"
            >
              <span className="border-b border-transparent group-hover:border-teal-600 transition-all">
                Destek alın
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Animasyonlu noktalar */}
      <div className="absolute bottom-10 left-10 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
      <div className="absolute top-10 right-10 w-4 h-4 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
    </div>
  );
}

export default NotFoundPage;