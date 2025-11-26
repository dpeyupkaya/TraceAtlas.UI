import React from 'react';
import { MapPin, Share2, Compass, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Compass,
    title: "Yola Çık",
    desc: "Maceran tek dokunuşla başlasın. 'Kaydı Başlat' butonuna dokun, telefonu cebine at.",
    // Zemin parlak olduğu için ikon kutusunu BEYAZ, ikonu YEŞİL yapıyoruz ki patlasın.
    iconBg: "bg-white", 
    iconColor: "text-[#10b981]", 
    border: "border-white/20"
  },
  {
    icon: MapPin,
    title: "Anılarını Sabitle",
    desc: "Görülmeye değer bir yer mi buldun? Fotoğrafını çek ve haritana kalıcı bir 'Anı Pini' bırak.",
    iconBg: "bg-white",
    iconColor: "text-[#10b981]",
    border: "border-white/20"
  },
  {
    icon: Share2,
    title: "İlham Ol",
    desc: "Parkuru tamamladığında GPX olarak indir veya TraceAtlas topluluğunda yayınla.",
    iconBg: "bg-white",
    iconColor: "text-[#10b981]",
    border: "border-white/20"
  }
];

const InfoPanel = () => {
  return (
    // ZEMİN RENGİ: #10b981 (Canlı Yeşil)
    <div className="w-full h-full bg-[#10b981] text-white relative flex flex-col overflow-hidden">
      
      {/* --- DEKORATİF ARKA PLAN --- */}
      {/* Zemin çok parlak olduğu için glowları KOYU (#022c22) yapıyoruz ki derinlik katsın */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#022c22]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#022c22]/10 rounded-full blur-[60px] pointer-events-none"></div>
      
      {/* Desen */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.08] pointer-events-none"></div>

      {/* --- BAŞLIK ALANI --- */}
      <div className="relative z-20 pt-8 px-6 pb-4 md:pt-12 md:px-12 shrink-0">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
            Nasıl Çalışır?
        </h2>
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-[#022c22]/10 border border-[#022c22]/5">
            <span className="text-xs md:text-sm text-[#022c22] font-bold tracking-wide">3 ADIMDA KEŞFET</span>
            <ArrowDown size={14} className="text-[#022c22] animate-bounce" />
        </div>
      </div>

      {/* --- İÇERİK LİSTESİ --- */}
      <div className="relative z-10 flex-grow px-4 md:px-12 pb-8 overflow-y-auto custom-scrollbar">
        
        {/* Sol Çizgi: Koyu yeşil tonunda (#022c22) ama silik */}
        <div className="relative border-l-2 border-dashed border-[#022c22]/20 ml-4 md:ml-6 space-y-6 md:space-y-10 mt-2 py-2">
          
          {steps.map((step, index) => (
            <div key={index} className="relative pl-6 md:pl-10 group">
              
              {/* İkon Yuvarlağı (Timeline Noktası) */}
              <div className={`
                absolute -left-[18px] md:-left-[21px] top-0 
                w-9 h-9 md:w-11 md:h-11 
                rounded-full border-4 border-[#10b981] ${step.iconBg} 
                flex items-center justify-center shadow-lg
                z-10 group-hover:scale-110 transition-transform duration-300
              `}>
                <step.icon className={`w-4 h-4 md:w-5 md:h-5 ${step.iconColor}`} />
              </div>

              {/* Kart Tasarımı */}
              {/* Bg: #022c22/15 -> Canlı yeşil üzerinde koyu şeffaf bir katman oluşturur */}
              <div className={`
                relative p-4 md:p-6 rounded-2xl border ${step.border}
                bg-[#022c22]/15 backdrop-blur-sm
                hover:bg-[#022c22]/25 transition-all duration-300
              `}>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <span className="text-[#022c22]/60 text-xs md:text-sm font-mono">0{index + 1}.</span> 
                  {step.title}
                </h3>
                <p className="text-emerald-50/90 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}

          {/* Bitiş Noktası */}
          <div className="relative pl-6 md:pl-10 pb-4">
             <div className="absolute -left-[7px] top-0 w-3.5 h-3.5 rounded-full bg-white animate-pulse"></div>
             <p className="text-[#022c22]/60 text-[10px] md:text-sm font-bold tracking-wide pt-0.5">HAZIR</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InfoPanel;