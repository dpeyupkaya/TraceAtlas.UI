import React from 'react';
import { MapPin, Users, Mountain, TreePine, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Mountain,
    title: "Doğa Keşifleri",
    desc: "Dağlardan ormanlara, gizli rotalara kadar tüm doğa harikalarını keşfet. TraceAtlas ile yeni yılın ilk izlerini sür.",
    iconColor: "text-emerald-400",
    badge: "KEŞİF 2026",
    badgeBg: "bg-red-600"
  },
  {
    icon: MapPin,
    title: "Özel Noktaları Kaydet",
    desc: "Keşfettiğin noktaları işaretle, not al. Kişisel haritanda her anı bir hediye gibi sakla ve dilediğin zaman geri dön.",
    iconColor: "text-amber-400",
    badge: "ANI BİRİKTİR",
    badgeBg: "bg-emerald-600"
  },
  {
    icon: Users,
    title: "Toplulukla Paylaş",
    desc: "Keşiflerini toplulukla paylaş, diğer doğa severlerin rotalarını gör ve yeni maceralar için ilham al.",
    iconColor: "text-blue-400",
    badge: "BİRLİKTE GÜZEL",
    badgeBg: "bg-amber-600"
  }
];

const InfoPanel = () => {
  return (
    <div className="w-full h-full bg-[#041a14] text-white relative flex flex-col border-l border-white/5">
      
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
      
      <div className="relative z-20 pt-6 md:pt-10 px-6 pb-2 md:pb-4 text-center">
        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-md shadow-lg transition-all active:scale-95">
          <TreePine size={18} className="text-emerald-400" />
          <span className="text-[10px] md:text-[11px] text-emerald-50 font-black tracking-[0.2em] uppercase">MACERA REHBERİ</span>
          <ArrowDown size={16} className="text-red-500 animate-bounce" />
        </div>
      </div>

      <div className="relative z-10 flex-grow px-4 md:px-5 pb-8 overflow-y-visible md:overflow-y-auto custom-scrollbar">
        <div className="relative ml-2 md:ml-4 space-y-4 md:space-y-8 mt-4 md:mt-6">
          
          <div className="absolute left-[-1px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500/50 via-red-500/50 to-emerald-500/50" />

          {steps.map((step, index) => (
            <div key={index} className="relative pl-8 md:pl-10 group touch-manipulation">
              
              <div className="absolute -left-[11px] md:-left-[13px] top-0 w-5 h-5 md:w-7 md:h-7 rounded-full border-2 border-white/20 bg-[#041a14] flex items-center justify-center z-10 transition-all duration-500">
                <span className={`text-[9px] md:text-[10px] font-black ${step.iconColor}`}>{index + 1}</span>
              </div>

              <div className="bg-emerald-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-5">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className={`p-2 md:p-2.5 rounded-xl bg-white/5 border border-white/10 ${step.iconColor}`}>
                    <step.icon size={18} md={20} />
                  </div>
                  <span className={`${step.badgeBg} text-[8px] md:text-[9px] font-black px-2 md:px-3 py-1 rounded-lg shadow-lg tracking-wider whitespace-nowrap`}>
                    {step.badge}
                  </span>
                </div>
                
                <h3 className="text-sm md:text-base font-black text-white mb-1 md:mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-emerald-100/60 text-[11px] md:text-xs leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(16, 185, 129, 0.2); 
          border-radius: 10px; 
        }
      `}</style>
    </div>
  );
};

export default InfoPanel;