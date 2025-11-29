import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AtSign, Repeat } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Şifreler uyuşmuyor!");
      return;
    }

    try {
      const dataToSend = {
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };

      await authService.register(dataToSend);
      
      alert("Kayıt Başarılı!\n\nLütfen e-posta adresinizi kontrol edin ve gönderilen doğrulama bağlantısına tıklayarak hesabınızı aktif hale getirin.\n\nŞimdi giriş ekranına yönlendiriliyorsunuz.");
      
      navigate('/auth');

    } catch (error) {
      console.error("Register Hatası:", error);
      alert("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
      
      <InputField 
        icon={AtSign} 
        type="text" 
        name="userName"
        placeholder="Kullanıcı Adı" 
        value={formData.userName}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField 
          icon={User} 
          type="text" 
          name="firstName"
          placeholder="Adın" 
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField 
          icon={User} 
          type="text" 
          name="lastName"
          placeholder="Soyadın" 
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <InputField 
        icon={Mail} 
        type="email" 
        name="email"
        placeholder="E-posta Adresin" 
        value={formData.email}
        onChange={handleChange}
      />

      <InputField 
        icon={Lock} 
        type="password" 
        name="password"
        placeholder="Şifren" 
        value={formData.password}
        onChange={handleChange}
      />
      
      <InputField 
        icon={Repeat} 
        type="password" 
        name="confirmPassword"
        placeholder="Şifreni Onayla" 
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      
      <label className="flex items-center gap-2 cursor-pointer group select-none px-1 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
        <input 
          type="checkbox" 
          required
          className="appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-[#10b981] checked:border-[#10b981] transition-all cursor-pointer hover:border-[#10b981]/60 shrink-0 focus:ring-2 focus:ring-[#10b981]/30"
        />
        <span className="text-xs text-slate-300/70 group-hover:text-slate-200 transition-colors">
          <a href="#" className="text-[#10b981] hover:text-[#10b981]/80 hover:underline underline-offset-2 transition-colors duration-300">
            Kullanım Şartları
          </a>'nı okudum ve kabul ediyorum
        </span>
      </label>

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
      
      <div className="pt-2">
        <AuthButton 
          text="Hesap Oluştur" 
          type="submit"
        />
      </div>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#10b981]/3 rounded-full blur-xl pointer-events-none"></div>
    </form>
  );
};

export default RegisterForm;