import React from 'react';
import { Mail, Lock } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';

const LoginForm = () => {
  return (
   
    <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <InputField 
        icon={Mail} 
        type="email" 
        placeholder="E-posta Adresin" 
      />
      
      <InputField 
        icon={Lock} 
        type="password" 
        placeholder="Şifren" 
      />
      
  
      <div className="flex justify-end">
        <a 
          href="#" 
        
          className="text-sm font-medium text-cyan-200/80 hover:text-white transition-colors duration-300 cursor-target hover:underline decoration-cyan-400/50 underline-offset-4"
        >
          Şifremi Unuttum?
        </a>
      </div>
      
      <AuthButton text="Giriş Yap" onClick={() => console.log("Giriş yapılıyor...")} />
    </form>
  );
};

export default LoginForm;