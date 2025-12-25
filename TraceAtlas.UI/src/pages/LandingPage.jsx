import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientBlinds from '../bits/GradientBlinds ';
import Snowfall from 'react-snowfall'
import ChristmasButton  from '../common/ChristmasButton';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans select-none">
<Snowfall 
  color='white'
  speed={[0.5, 1.5]}
  wind={[-0.5, 2.0]} 
  snowflakeCount={150}

  style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    pointerEvents: 'none'
  }}
/>
      <div className="absolute inset-0 z-0 select-none">
        <GradientBlinds
          gradientColors={['#022c22', '#10b981']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none">
    
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none select-none"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-400/3 rounded-full blur-[100px] pointer-events-none select-none"></div>
        
    
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#00eecaff]/10 rounded-full blur-[60px] pointer-events-none select-none"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00eecaff]/8 rounded-full blur-[80px] pointer-events-none select-none"></div>
      </div>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 select-none">
        
 
        <div className="mb-10 animate-fade-in-down select-none">
          <h1 className="text-6xl md:text-9xl font-black text-black/95 tracking-tighter mix-blend-overlay opacity-90 select-none">
            TraceAtlas
          </h1>
          <div className="h-1 w-24 bg-[#00eecaff] mx-auto mt-4 rounded-full shadow-[0_0_15px_#00eecaff] select-none"></div>
        </div>


        <p className="text-emerald-100/90 text-lg md:text-2xl font-light max-w-xl mb-16 tracking-wide backdrop-blur-sm select-none">
          Doğanın ritmini yakala, izini sonsuzluğa bırak.
        </p>

    <div className="relative group/btn">
  {/* Butonun arkasına gizli bir parlama ekleyerek derinliği artırıyoruz */}
  <div className="absolute inset-0 bg-[#00eecaff]/10 blur-[50px] rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000" />
  
 <ChristmasButton onClick={() => navigate('/home')}>
      YOLCULUĞA BAŞLA
    </ChristmasButton>
</div>
      
        <div className="absolute bottom-10 flex flex-col items-center gap-2 select-none">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase select-none">
            Keşfet • Favorilere Ekle • Paylaş
          </span>
          <span className="text-white text-xs font-light select-none">
            &copy; 2025 TRACEATLAS
          </span>
        </div>

       

      </div>

   
    </div>
  );
};

export default LandingPage;