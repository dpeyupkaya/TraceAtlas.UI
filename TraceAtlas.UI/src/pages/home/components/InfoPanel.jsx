import React from 'react';
import { MapPin, Share2, Compass, ArrowDown, Camera, Users, Mountain, Star } from 'lucide-react';

const steps = [
  {
    icon: Mountain,
    title: "Doğa Keşifleri",
    desc: "Dağlardan ormanlara, nehir kenarlarından gizli plajlara kadar tüm doğa harikalarını keşfet. TraceAtlas ile bilinmeyen rotaları bul.",
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-300",
    border: "border-emerald-500/20",
    badge: "Keşif",
    gradient: "from-emerald-500/10 to-transparent"
  },
  {
    icon: MapPin,
    title: "Özel Noktaları Kaydet",
    desc: "Keşfettiğin özel noktaları işaretle, fotoğrafla, not al. Kişisel haritanda her anı sakla ve dilediğin zaman geri dön.",
    iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-600/20",
    iconColor: "text-amber-300",
    border: "border-amber-500/20",
    badge: "Kaydet",
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    icon: Users,
    title: "Toplulukla Paylaş",
    desc: "Keşiflerini TraceAtlas topluluğuyla paylaş, diğer doğa severlerin rotalarını gör ve yeni maceralar için ilham al.",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-300",
    border: "border-blue-500/20",
    badge: "Topluluk",
    gradient: "from-blue-500/10 to-transparent"
  }
];

const InfoPanel = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] text-white relative flex flex-col overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-[60px] pointer-events-none"></div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-[0.03] pointer-events-none"></div>
      
      <div className="absolute top-20 left-10 opacity-[0.08] animate-float">
        <Compass size={32} />
      </div>
      <div className="absolute bottom-20 right-8 opacity-[0.06] animate-float-delayed">
        <Star size={28} />
      </div>

      <div className="relative z-20 pt-8 px-6 pb-6 text-center">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
          <span className="text-xs text-emerald-100 font-bold tracking-wider">TRACEATLAS KULLANIM KILAVUZU</span>
          <ArrowDown size={16} className="text-emerald-200 animate-bounce" />
        </div>
      
      </div>

      <div className="relative z-10 flex-grow px-4 pb-8 overflow-y-auto custom-scrollbar">
        
        <div className="relative border-l-2 border-dashed border-white/10 ml-6 space-y-6 mt-4 py-2">
          
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8 group">
              
              <div className={`
                absolute -left-7 top-0 
                w-12 h-12 
                rounded-full border-2 ${step.border} ${step.iconBg}
                flex items-center justify-center shadow-lg shadow-black/30
                z-10 group-hover:scale-110 transition-all duration-300
                backdrop-blur-sm
              `}>
                <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-[10px] font-bold text-gray-800">{index + 1}</span>
                </div>
              </div>

              <div className={`
                relative p-5 rounded-2xl border ${step.border}
                bg-gradient-to-r ${step.gradient} backdrop-blur-sm
                hover:scale-[1.02] hover:shadow-lg transition-all duration-300
                group-hover:bg-white/10
              `}>
                <div className="inline-flex items-center gap-1 mb-3 px-2 py-1 rounded-full bg-white/10 border border-white/10">
                  <span className="text-xs text-emerald-100 font-semibold tracking-wide">{step.badge}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  {step.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
                
              
              </div>

            </div>
          ))}

        </div>

        
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(-4px) rotate(0deg); }
          50% { transform: translateY(4px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default InfoPanel;