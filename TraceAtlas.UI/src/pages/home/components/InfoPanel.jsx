import React from 'react';
import { MapPin, Share2, Compass, ArrowDown, Navigation, Camera, Download } from 'lucide-react';

 const steps = [
  {
    icon: Navigation,
    title: "Farklı Rotasyonlar",
    desc: "Hep aynı yürüyüş rotalarını takip etmekten sıkıldın mı? Yeni rotasyonlar keşfet ve doğanın sunduğu farklı güzellikleri deneyimle.",
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-300",
    border: "border-emerald-500/20",
    badge: "Rota",
    gradient: "from-emerald-500/10 to-transparent"
  },
  {
    icon: MapPin,
    title: "Keşiflerini İşaretle",
    desc: "Gördüğün güzel bir manzara, gizli bir su kaynağı ya da kamp alanı varsa tek dokunuşla işaretle. Fotoğraf ve açıklama ekleyerek kendi keşif haritanı oluştur.",
    iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-600/20",
    iconColor: "text-amber-300",
    border: "border-amber-500/20",
    badge: "Pin",
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    icon: Camera,
    title: "Anıları Kaydet",
    desc: "Harita üzerindeki her konuma bir fotoğraf ekleyebilirsin. Ziyaret ettiğin yerler sadece konum olarak değil, anılarıyla birlikte saklanır.",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-300",
    border: "border-blue-500/20",
    badge: "Fotoğraf",
    gradient: "from-blue-500/10 to-transparent"
  }
];

const InfoPanel = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a2f33] via-[#2d4a44] to-[#3e6b65] text-white relative flex flex-col overflow-hidden select-none">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none select-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none select-none"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none select-none"></div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-[0.03] pointer-events-none select-none"></div>
      
      <div className="absolute top-20 left-10 opacity-[0.08] animate-float select-none">
        <Compass size={32} />
      </div>
      <div className="absolute bottom-20 right-8 opacity-[0.06] animate-float-delayed select-none">
        <MapPin size={28} />
      </div>

      <div className="relative z-20 pt-8 px-6 pb-6 text-center select-none">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm select-none">
          <span className="text-xs text-emerald-100 font-bold tracking-wider select-none">TRAILTRACK KULLANIM KILAVUZU</span>
          <ArrowDown size={16} className="text-emerald-200 animate-bounce select-none" />
        </div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-2 select-none">
          Doğa Yürüyüşlerini Dijitalleştir
        </h2>
        <p className="text-emerald-100/70 text-sm max-w-md mx-auto select-none">
          Modern haritalama araçlarıyla rotalarını kaydet, keşfettiğin yerleri işaretle ve doğa maceralarını kalıcı hale getir.
        </p>
      </div>

      <div className="relative z-10 flex-grow px-4 pb-8 overflow-y-auto custom-scrollbar select-none">
        
        <div className="relative border-l-2 border-dashed border-white/10 ml-6 space-y-6 mt-4 py-2 select-none">
          
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8 group select-none">
              
              <div className={`
                absolute -left-7 top-0 
                w-12 h-12 
                rounded-full border-2 ${step.border} ${step.iconBg}
                flex items-center justify-center shadow-lg shadow-black/30
                z-10 group-hover:scale-110 transition-all duration-300
                backdrop-blur-sm
                select-none
              `}>
                <step.icon className={`w-5 h-5 ${step.iconColor} select-none`} />
                
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md select-none">
                  <span className="text-[10px] font-bold text-gray-800 select-none">{index + 1}</span>
                </div>
              </div>

              <div className={`
                relative p-5 rounded-2xl border ${step.border}
                bg-gradient-to-r ${step.gradient} backdrop-blur-sm
                hover:scale-[1.02] hover:shadow-lg transition-all duration-300
                group-hover:bg-white/10
                select-none
              `}>
                <div className="inline-flex items-center gap-1 mb-3 px-2 py-1 rounded-full bg-white/10 border border-white/10 select-none">
                  <span className="text-xs text-emerald-100 font-semibold tracking-wide select-none">{step.badge}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 select-none">
                  {step.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed font-medium select-none">
                  {step.desc}
                </p>
                
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 select-none">
                  <div className="flex items-center gap-1 select-none">
                    <div className={`w-2 h-2 rounded-full select-none ${index === 0 ? 'bg-emerald-400' : index === 1 ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                    <span className="text-xs text-gray-300 select-none">Aktif</span>
                  </div>
                  <div className="flex items-center gap-1 select-none">
                    <Share2 size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-300 select-none">Paylaşılabilir</span>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>

        <div className="text-center mt-8 px-4 select-none">
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm select-none">
            <span className="text-xs text-emerald-200 font-semibold select-none">
              🌲 TrailTrack v1.0 • React & Leaflet • Çevrimdışı Mod
            </span>
          </div>
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
        
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        button, a {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default InfoPanel;