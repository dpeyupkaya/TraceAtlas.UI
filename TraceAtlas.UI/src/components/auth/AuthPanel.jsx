import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, MapPin } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPanel = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  // GÜVENLİK VE KISITLAMALAR
  useEffect(() => {
    // Sağ tık menüsünü engelle
    const handleContextMenu = (e) => e.preventDefault();
    
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U gibi kısayolları engelle (Console erişimi zorlaştırma)
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
    <div 
      className="w-full min-h-[100dvh] flex flex-col justify-center items-center p-4 relative bg-[#050b14] overflow-hidden select-none"
      // HTML5 seviyesinde otomatik tamamlamayı kapatmak için global form attribute
      autoComplete="off"
    >
      
      {/* Arka plan desenleri ve efektler (Pointer events none ile tıklanamaz yapıldı) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="absolute right-0 top-0 -z-10 h-[200px] w-[200px] rounded-full bg-cyan-500 opacity-20 blur-[100px] translate-y-20 pointer-events-none"></div>

      <div className="w-full max-w-[420px] relative z-10 flex flex-col gap-6">
     

        {/* Tab Menü */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-1.5 rounded-2xl flex relative shadow-lg">
          <motion.div
            className="absolute top-1.5 bottom-1.5 bg-slate-800/80 rounded-xl shadow-sm border border-white/5 z-0"
            layoutId="tabHighlight"
            initial={false}
            animate={{
              x: isLoginView ? 0 : '100%',
              width: '50%'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          
          <button
            onClick={() => setIsLoginView(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium relative z-10 transition-colors duration-200 outline-none focus:ring-0 ${isLoginView ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}
          >
            <LogIn size={16} />
            <span>Giriş</span>
          </button>
          
          <button
            onClick={() => setIsLoginView(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium relative z-10 transition-colors duration-200 outline-none focus:ring-0 ${!isLoginView ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}
          >
            <UserPlus size={16} />
            <span>Kayıt</span>
          </button>
        </div>

        {/* Form Container */}
        <motion.div
          layout
          className="bg-slate-900/60 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <motion.div
            className="flex w-[200%]"
            animate={{ x: isLoginView ? "0%" : "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Login Wrapper */}
            <div className="w-1/2 p-6 md:p-8">
              <div className="mb-8 pointer-events-none select-none">
                <h2 className="text-2xl font-bold text-white tracking-tight">Tekrar Hoşgeldin</h2>
                <p className="text-slate-400 text-sm mt-1">Sisteme erişmek için kimliğini doğrula.</p>
              </div>
              {/* Not: Inputların içine de autoComplete="new-password" eklenmeli */}
              <div autoComplete="off">
                 <LoginForm />
              </div>
            </div>

            {/* Register Wrapper */}
            <div className="w-1/2 p-6 md:p-8">
              <div className="mb-8 pointer-events-none select-none">
                <h2 className="text-2xl font-bold text-white tracking-tight">Hesap Oluştur</h2>
                <p className="text-slate-400 text-sm mt-1">Yeni bir izleme rotası oluşturmak için katıl.</p>
              </div>
              <div autoComplete="off">
                <RegisterForm />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p className="text-center text-slate-600 text-xs font-medium tracking-wide select-none pointer-events-none">
          © 2025 TRACEATLAS SYSTEMS
        </p>

      </div>
    </div>
  );
};

export default AuthPanel;