import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Compass } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPanel = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || 
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
    <div className="w-full min-h-[100dvh] flex flex-col justify-center items-center p-4 relative bg-[#020617] overflow-hidden select-none">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b98105_0%,transparent_100%)] pointer-events-none"></div>

      <div className="w-full max-w-[400px] relative z-10 flex flex-col gap-4">
        
        <div className="bg-emerald-950/20 border border-white/5 p-1 rounded-xl flex relative">
          <motion.div
            className="absolute top-1 bottom-1 left-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 w-[calc(50%-4px)]"
            animate={{ x: isLoginView ? 0 : '100%' }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
          
          <button
            onClick={() => setIsLoginView(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-bold tracking-[0.2em] relative z-10 transition-colors ${isLoginView ? 'text-emerald-400' : 'text-emerald-100/20'}`}
          >
            <LogIn size={14} />
            <span>GİRİŞ</span>
          </button>
          
          <button
            onClick={() => setIsLoginView(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-bold tracking-[0.2em] relative z-10 transition-colors ${!isLoginView ? 'text-emerald-400' : 'text-emerald-100/20'}`}
          >
            <UserPlus size={14} />
            <span>KAYIT</span>
          </button>
        </div>

        <div className="bg-emerald-950/10 border border-white/5 rounded-2xl overflow-hidden relative shadow-xl">
          <motion.div 
            className="flex w-[200%]" 
            animate={{ x: isLoginView ? "0%" : "-50%" }} 
            transition={{ duration: 0.35, ease: "anticipate" }}
          >
            <div className="w-1/2 p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Hoşgeldin <Compass size={18} className="text-emerald-500" />
                </h2>
                <p className="text-emerald-100/30 text-[9px] font-bold uppercase tracking-widest mt-1">Maceraya devam et.</p>
              </div>
              <LoginForm />
            </div>

            <div className="w-1/2 p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Yeni Rota</h2>
                <p className="text-emerald-100/30 text-[9px] font-bold uppercase tracking-widest mt-1">TraceAtlas'a ilk adımı at.</p>
              </div>
              <RegisterForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;