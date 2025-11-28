import React from 'react';
import { Mail, Lock } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';

const LoginForm = () => {
  return (
    <form className="space-y-6 animate-in  fade-in slide-in-from-bottom-4 duration-500 select-none">
      
      {/* EMAIL INPUT */}
      <InputField 
        icon={Mail} 
        type="email" 
        placeholder="E-posta Adresin" 
      />
      
      {/* PASSWORD INPUT */}
      <InputField 
        icon={Lock} 
        type="password" 
        placeholder="Şifren" 
      />
      
      {/* ŞİFRE UNUTTUM LİNKİ */}
      <div className="flex justify-end">
        <a 
          href="#" 
          className="text-sm font-medium text-[#10b981]/80 hover:text-[#10b981] transition-all duration-300 cursor-pointer hover:underline decoration-[#10b981]/50 underline-offset-4 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
        >
          Şifremi Unuttum?
        </a>
      </div>
      
      {/* GİRİŞ BUTONU */}
      <AuthButton 
        text="Giriş Yap" 
        onClick={() => console.log("Giriş yapılıyor...")} 
        // AuthButton component'ine emerald renklerini prop olarak geçebiliriz
        // veya component içinde zaten #10b981 kullanılıyorsa otomatik uyum sağlayacaktır
      />

    
      <div className="text-center pt-4">
        <div className="inline-flex items-center gap-2 text-xs text-slate-400/80">
          <div className="w-1.5 h-1.5 bg-[#10b981]/60 rounded-full animate-pulse"></div>
          <span>Güvenli giriş • SSL korumalı</span>
        </div>
      </div>

  
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#10b981]/5 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#10b981]/3 rounded-full blur-lg pointer-events-none"></div>
    </form>
  );
};

export default LoginForm;