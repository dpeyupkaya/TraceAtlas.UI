import React from 'react';
import { MapPin, Compass, ArrowDown, Users, Mountain, Star, Gift, TreePine } from 'lucide-react';

const steps = [
  {
    icon: Mountain,
    title: "Doğa Keşifleri",
    desc: "Dağlardan ormanlara, gizli rotalara kadar tüm doğa harikalarını keşfet. TraceAtlas ile yeni yılın ilk izlerini sür.",
    iconColor: "text-emerald-400",
    badge: "KEŞİF 2025",
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
    <div className="w-full h-full bg-[#041a14] text-white relative flex flex-col overflow-hidden border-l border-white/5">
      
      
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
      
      <div className="relative z-20 pt-10 px-6 pb-4 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)] group transition-all active:scale-95">
          <TreePine size={18} className="text-emerald-400" />
          <span className="text-[11px] text-emerald-50 font-black tracking-[0.2em] uppercase">MACERA REHBERİ</span>
          <ArrowDown size={16} className="text-red-500 animate-bounce" />
        </div>
      </div>

      <div className="relative z-10 flex-grow px-5 pb-10 overflow-y-auto custom-scrollbar">
        <div className="relative ml-4 space-y-8 mt-6">
          
          <div className="absolute left-[-1px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500/50 via-red-500/50 to-emerald-500/50" />

          {steps.map((step, index) => (
            <div key={index} className="relative pl-10 group touch-manipulation">
              
              <div className={`
                absolute -left-[13px] top-0 
                w-7 h-7 
                rounded-full border-2 border-white/20 bg-[#041a14]
                flex items-center justify-center
                z-10 transition-all duration-500
                ${step.glow}
              `}>
                <span className={`text-[10px] font-black ${step.iconColor}`}>{index + 1}</span>
              </div>

              <div className="bg-emerald-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-5 ">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${step.iconColor}`}>
                    <step.icon size={20} />
                  </div>
                  <span className={`${step.badgeBg} text-[9px] font-black px-3 py-1 rounded-lg shadow-lg tracking-wider`}>
                    {step.badge}
                  </span>
                </div>
                
                <h3 className="text-base font-black text-white mb-2 tracking-tight ">
                  {step.title}
                </h3>
                <p className="text-emerald-100/60 text-xs leading-relaxed font-medium">
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