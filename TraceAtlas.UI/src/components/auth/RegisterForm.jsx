import React from 'react';
import { User, Mail, Lock, AtSign, Repeat } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';

const RegisterForm = () => {
  return (
    <form className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <InputField 
        icon={AtSign} 
        type="text" 
        placeholder="Kullanıcı Adı" 
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField 
          icon={User} 
          type="text" 
          placeholder="Adın" 
        />
        <InputField 
          icon={User} 
          type="text" 
          placeholder="Soyadın" 
        />
      </div>

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
      
      <InputField 
        icon={Repeat} 
        type="password" 
        placeholder="Şifreni Onayla" 
      />
      
      <label className="flex items-center gap-2 cursor-target group select-none px-1">
        <input 
          type="checkbox" 
          className="appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-target hover:border-emerald-400 shrink-0"
        />
        <span className="text-xs text-cyan-100/60 group-hover:text-cyan-100 transition-colors">
          <a href="#" className="text-cyan-400 hover:text-cyan-300 hover:underline">Kullanım Şartları</a>'nı okudum ve kabul ediyorum
        </span>
      </label>
      
      <div className="pt-2">
        <AuthButton text="Hesap Oluştur" onClick={() => console.log("Kayıt olunuyor...")} />
      </div>
    </form>
  );
};

export default RegisterForm;