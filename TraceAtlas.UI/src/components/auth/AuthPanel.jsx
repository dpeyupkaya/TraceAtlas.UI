import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { LogIn, UserPlus } from 'lucide-react';

const AuthPanel = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    // MOBİL AYARI 1: 'min-h-screen' yerine 'min-h-[100dvh]' kullandık.
    // Bu, mobildeki adres çubuğu (URL bar) açılıp kapanınca ekranın zıplamasını önler.
    <div className="w-full min-h-[100dvh] flex flex-col justify-center items-center p-4 md:p-6 relative bg-slate-950 overflow-hidden">
      
      {/* ARKA PLAN (Aynı kalıyor, mobilde de çok şık durur) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none"></div>
      
    
      <div className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      <div className="absolute top-40 -right-20 w-48 h-48 md:w-72 md:h-72 bg-cyan-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

     
      <div className="w-full max-w-md relative z-10">
        
        {/* TAB MENÜ (Mobilde parmakla basmak kolay olsun diye py-3 korundu) */}
        <div className="flex p-1 mb-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/5 relative shadow-lg">
            <motion.div 
              className="absolute top-1 bottom-1 bg-slate-800 rounded-xl shadow-sm border border-white/5"
              initial={false}
              animate={{
                left: isLoginView ? '4px' : '50%',
                width: 'calc(50% - 4px)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button 
              onClick={() => setIsLoginView(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 transition-colors duration-200 text-sm md:text-base ${isLoginView ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <LogIn size={18} />
              <span>Giriş Yap</span>
            </button>

            <button 
              onClick={() => setIsLoginView(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 transition-colors duration-200 text-sm md:text-base ${!isLoginView ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <UserPlus size={18} />
              <span>Kayıt Ol</span>
            </button>
        </div>

       
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-slate-900/60 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl backdrop-blur-md overflow-hidden"
        >
            <motion.div 
              className="flex w-[200%]"
              animate={{ x: isLoginView ? "0%" : "-50%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
            >
                
                {/* SOL TARAF: LOGIN */}
                {/* MOBİL AYARI 2: Padding mobilde p-5, masaüstünde p-8 yapıldı */}
                <div className="w-1/2 p-5 md:p-8">
                   <div className="mb-6 text-center md:text-left">
                   
                     <h2 className="text-2xl md:text-3xl font-bold text-white">Hoşgeldin</h2>
                     <p className="text-slate-400 mt-2 text-sm md:text-base">Macerana kaldığın yerden devam et.</p>
                   </div>
                   <LoginForm />
                </div>

                
                <div className="w-1/2 p-5 md:p-8">
                   <div className="mb-6 text-center md:text-left">
                     <h2 className="text-2xl md:text-3xl font-bold text-white">Hesap Oluştur</h2>
                     <p className="text-slate-400 mt-2 text-sm md:text-base">Rotanı çizmek için aramıza katıl.</p>
                   </div>
                   <RegisterForm />
                </div>

            </motion.div>
        </motion.div>

        {/* Alt Bilgi */}
        <p className="text-center text-slate-600 text-xs mt-6 mb-2">
          TraceAtlas &copy; 2025
        </p>

      </div>
    </div>
  );
};

export default AuthPanel;