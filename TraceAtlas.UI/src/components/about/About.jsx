import React from 'react';
import { Map, User, Mail, Linkedin, Github, ExternalLink, Heart } from 'lucide-react';
import Footer from '../footer/Footer';

const About = () => {
  return (
    // 1. DEĞİŞİKLİK: flex ve flex-col ekledik, böylece dikeyde esnek bir kutu oldu
    <div className="min-h-screen bg-[#05110e] relative overflow-hidden text-slate-200 font-sans selection:bg-emerald-500/30 flex flex-col">
      
      {/* Arkaplan Efektleri */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-teal-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. DEĞİŞİKLİK: flex-grow (flex-1) ekledik. Bu div kalan tüm boşluğu kaplayacak ve Footer'ı en alta itecek. */}
      {/* Ayrıca justify-between'i sildik çünkü flex-grow bu işi hallediyor. */}
      <div className="relative pt-32 pb-20 px-6 container mx-auto max-w-5xl flex-1 z-10">
        
        {/* İçerik */}
        <div>
          {/* Başlık Bölümü */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-6 ring-1 ring-emerald-500/20">
              <Map className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Her Rota Bir <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Hikayedir.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              TraceAtlas, sadece gidilen yolları haritalamak için değil, o yollarda biriken anıları ölümsüzleştirmek için tasarlandı.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {/* Misyon Kartı */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:bg-white/[0.07]">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-500 rounded-full"/>
                Neden TraceAtlas?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Modern dünyada keşfetme duygusunu canlı tutmak istiyoruz. İster şehrin bilinmeyen sokaklarında, ister doğanın kalbinde olun; 
                önemli olan sadece "nerede" olduğunuz değil, orada "ne hissettiğinizdir".
              </p>
              <p className="text-slate-400 leading-relaxed">
                Bu platform, gezginlerin kendi dijital atlaslarını oluşturmalarına, favori mekanlarını not etmelerine ve keşif tutkularını düzenli bir arşiv haline getirmelerine olanak tanır.
              </p>
            </div>

            {/* Geliştirici Kartı */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-white/5 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"/>
              
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <User className="text-emerald-400" />
                Geliştirici Hakkında
              </h2>
             <div className="space-y-4 relative z-10">
                <p className="text-slate-300 leading-relaxed">
                  Selam, ben <strong className="text-emerald-300">Eyüp Kaya</strong>.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Bilgisayar Mühendisliği öğrencisiyim. Kod yazmayı, yeni teknolojileri kurcalamayı ve kafamdaki fikirleri hayata geçirmeyi seviyorum.
                </p>
                <p className="text-slate-400 leading-relaxed flex items-center gap-2">
                   TraceAtlas da hem kendimi geliştirmek hem de ortaya keyifli bir iş çıkarmak için yaptığım kişisel bir proje. Umarım kullanırken eğlenirsiniz! <Heart size={16} className="text-rose-500 inline fill-rose-500/20"/>
                </p>
              </div>

         
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="https://www.linkedin.com/in/dp-eyup-kaya/" target="_blank" rel="noreferrer" 
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] border border-white/10 hover:border-[#0077b5]/30 transition-all group/btn">
                  <Linkedin size={20} />
                  <span className="font-medium">LinkedIn</span>
                  <ExternalLink size={14} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all"/>
                </a>
                
                <a href="https://github.com/dpeyupkaya" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all">
                  <Github size={20} />
                  <span className="font-medium">GitHub</span>
                </a>

                <a href="mailto:dpeyupkaya@gmail.com"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all">
                  <Mail size={20} />
                  <span className="font-medium">İletişime Geç</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10">
        <Footer />
      </div>

    </div>
  );
};

export default About;