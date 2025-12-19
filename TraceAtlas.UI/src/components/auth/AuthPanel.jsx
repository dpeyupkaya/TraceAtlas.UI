import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Star, Snowflake } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Snowfall from 'react-snowfall'

const AuthPanel = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-center items-center p-4 relative bg-[#040d0a] overflow-hidden select-none" autoComplete="off">
      <Snowfall color='white' speed={[0.5, 1.5]} wind={[-0.5, 2.0]} snowflakeCount={120}
        style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute left-[-10%] top-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute right-[-10%] bottom-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] relative z-10 flex flex-col gap-6">
        
      

        <div className="bg-emerald-950/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex relative shadow-2xl">
          <motion.div
            className="absolute top-1.5 bottom-1.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30 z-0"
            layoutId="tabHighlight"
            initial={false}
            animate={{ x: isLoginView ? 0 : '100%', width: '50%' }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          
          <button
            onClick={() => setIsLoginView(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-black tracking-widest relative z-10 transition-all duration-300 ${isLoginView ? 'text-white' : 'text-emerald-100/40'}`}
          >
            <LogIn size={16} className={isLoginView ? 'text-emerald-400' : ''} />
            <span>GİRİŞ</span>
          </button>
          
          <button
            onClick={() => setIsLoginView(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-black tracking-widest relative z-10 transition-all duration-300 ${!isLoginView ? 'text-white' : 'text-emerald-100/40'}`}
          >
            <UserPlus size={16} className={!isLoginView ? 'text-red-400' : ''} />
            <span>KAYIT</span>
          </button>
        </div>

        <motion.div layout className="bg-emerald-950/30 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          
          <motion.div className="flex w-[200%]" animate={{ x: isLoginView ? "0%" : "-50%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <div className="w-1/2 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  Hoşgeldin <Star size={18} className="text-yellow-500 fill-yellow-500" />
                </h2>
                <p className="text-emerald-100/40 text-xs font-bold uppercase tracking-widest mt-2">Maceraya kaldığın yerden devam et.</p>
              </div>
              <LoginForm />
            </div>

            <div className="w-1/2 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white tracking-tight">Yeni Rota Çiz</h2>
                <p className="text-emerald-100/40 text-xs font-bold uppercase tracking-widest mt-2">TraceAtlas dünyasına ilk adımını at.</p>
              </div>
              <RegisterForm />
            </div>
          </motion.div>
        </motion.div>

        

      </div>
    </div>
  );
};

export default AuthPanel;