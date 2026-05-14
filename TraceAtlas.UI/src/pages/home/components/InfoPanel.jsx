import React from 'react';
import { Mountain, TreePine, Waves, Tent } from 'lucide-react';

const categories = [
  {
    icon: Mountain,
    title: "Zirveler ve Vadi Yolları",
    desc: "Bulutların üzerine çıkan rotalar ve gizli kalmış kanyonlar."
  },
  {
    icon: TreePine,
    title: "Derin Ormanlar",
    desc: "Güneş ışığının zor girdiği, sadece doğanın fısıltısını duyacağın patikalar."
  },
  {
    icon: Waves,
    title: "Saklı Sular",
    desc: "Issız koylar, haritada olmayan şelaleler ve sessiz göl kenarları."
  },
  {
    icon: Tent,
    title: "İzole Kamp Alanları",
    desc: "Ateşini yakıp geceyi sadece yıldızlarla paylaşabileceğin nadir noktalar."
  }
];

const InfoPanel = () => {
  return (
    <div className="w-full h-full bg-[#041a14] flex flex-col justify-center items-center p-8 relative">
      
      <div className="w-full max-w-[340px] flex flex-col justify-center h-full">
        
        <div className="space-y-4 w-full">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="py-5 px-6 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-5 transition-colors hover:bg-white/[0.05]"
            >
              <div className="shrink-0 mt-0.5">
                <cat.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-bold text-white mb-1.5 tracking-wide">
                  {cat.title}
                </h3>
                <p className="text-[11.5px] text-emerald-100/40 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center mt-12">
          <div className="w-8 h-[1px] bg-white/10 mb-5"></div>
          <p className="text-[9px] text-white/20 tracking-[0.3em] font-bold text-center leading-relaxed">
            "SADECE KAYBOLMAYI GÖZE ALANLAR<br/>YENİ YOLLAR BULABİLİR."
          </p>
        </div>

      </div>
    </div>
  );
};

export default InfoPanel;