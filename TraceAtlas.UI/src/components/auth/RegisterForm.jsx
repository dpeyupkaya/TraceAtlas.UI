import React from 'react';
import { User, Mail, Lock, AtSign, Repeat } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';

const RegisterForm = () => {
  return (
    <form className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
      
      {/* KULLANICI ADI */}
      <InputField 
        icon={AtSign} 
        type="text" 
        placeholder="Kullanıcı Adı" 
      />

      {/* AD - SOYAD GRID */}
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

      {/* E-POSTA */}
      <InputField 
        icon={Mail} 
        type="email" 
        placeholder="E-posta Adresin" 
      />

      {/* ŞİFRE ALANLARI */}
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
      
      {/* KULLANIM ŞARTLARI CHECKBOX */}
      <label className="flex items-center gap-2 cursor-pointer group select-none px-1 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
        <input 
          type="checkbox" 
          className="appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-[#10b981] checked:border-[#10b981] transition-all cursor-pointer hover:border-[#10b981]/60 shrink-0 focus:ring-2 focus:ring-[#10b981]/30"
        />
        <span className="text-xs text-slate-300/70 group-hover:text-slate-200 transition-colors">
          <a href="#" className="text-[#10b981] hover:text-[#10b981]/80 hover:underline underline-offset-2 transition-colors duration-300">
            Kullanım Şartları
          </a>'nı okudum ve kabul ediyorum
        </span>
      </label>

      {/* GÜVENLİK BİLGİSİ */}
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#10b981]/70 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400/80">Şifreler şifrelenir</span>
        </div>
        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#10b981]/70 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400/80">SSL korumalı</span>
        </div>
      </div>
      
      {/* KAYIT BUTONU */}
      <div className="pt-2">
        <AuthButton 
          text="Hesap Oluştur" 
          onClick={() => console.log("Kayıt olunuyor...")} 
        />
      </div>

      {/* DEKORATİF ELEMENTLER */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#10b981]/3 rounded-full blur-xl pointer-events-none"></div>
    </form>
  );
};

export default RegisterForm;