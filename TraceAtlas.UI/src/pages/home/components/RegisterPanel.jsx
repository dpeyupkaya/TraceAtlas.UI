import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, ArrowRight, LogIn, Map, Users } from 'lucide-react';

const RegisterPanel = () => {
  return (
    // Mobilde tam ekranı kaplaması için h-full ve w-full
    // padding değerlerini p-6 yerine p-4 yaparak kenarlardan yer kazandık
    <div className="w-full h-full bg-[#10b981] text-emerald-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* 1. ARKA PLAN EFEKTLERİ */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none"></div>
      
      {/* Dekoratif Glow - Mobilde biraz daha küçük ve subtle */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#064e3b]/10 rounded-full blur-[60px] pointer-events-none"></div>
      
      {/* Dev Arka Plan İkonu - Mobilde çok yer kaplamasın diye opacity azalttık ve boyutunu küçülttük */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <UserCircle size={280} />
      </div>

      {/* 2. İÇERİK KATMANI */}
      {/* max-w-sm yerine w-full diyerek mobile yayılmasını sağladık */}
      <div className="w-full max-w-[340px] relative z-10 flex flex-col items-center text-center">
        
        {/* İkon Kutusu - Boyutları mobilde biraz küçülttük (w-16 h-16) */}
        <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#064e3b]/10">
          <LogIn className="w-8 h-8 text-white" />
        </div>

        {/* Başlık - Font boyutunu dengeledik */}
        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
          Aramıza Katıl
        </h2>
        
        {/* Açıklama - Daha kısa satır yüksekliği ve margin */}
        <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed px-2">
          Sadece izleyici olma. Kendi rotanı çiz ve TraceAtlas topluluğunun bir parçası ol.
        </p>

        {/* İSTATİSTİKLER - Gap azaltıldı */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="p-3 rounded-xl bg-[#022c22]/10 border border-white/10 backdrop-blur-sm flex flex-col items-center">
            <Map className="w-5 h-5 text-emerald-900 mb-1" />
            <div className="text-xl font-bold text-white">1.2K+</div>
            <div className="text-[10px] text-emerald-900/80 uppercase tracking-wider font-bold">Rota</div>
          </div>
          
          <div className="p-3 rounded-xl bg-[#022c22]/10 border border-white/10 backdrop-blur-sm flex flex-col items-center">
            <Users className="w-5 h-5 text-emerald-900 mb-1" />
            <div className="text-xl font-bold text-white">50K+</div>
            <div className="text-[10px] text-emerald-900/80 uppercase tracking-wider font-bold">Gezgin</div>
          </div>
        </div>

        {/* CTA BUTONU - Dokunma alanı (Touch Target) geniş tutuldu */}
        <Link to="/auth" className="w-full">
          <button 
            className="w-full bg-white text-[#022c22] font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            Hemen Başla
            <ArrowRight className="w-4 h-4 text-[#10b981]" />
          </button>
        </Link>

        <p className="mt-4 text-[10px] text-emerald-900/40 font-semibold">
          Ücretsiz üyelik ve sınırsız keşif.
        </p>

      </div>
    </div>
  );
};

export default RegisterPanel;