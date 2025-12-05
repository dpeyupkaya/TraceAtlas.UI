import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { authService } from '../../services/authService';


const LoginForm = () => {
  const navigate = useNavigate();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await authService.login(formData.email, formData.password);
    navigate('/map');
  } catch (err) {

    // Email doğrulanmamış
    if (err?.status === 401 && err?.message?.includes("Email")) {
      window.__showSnackbar("Lütfen önce e-posta adresinizi doğrulayın.");
      return;
    }

    // Şifre yanlış
    if (err?.status === 401 && err?.message?.includes("Geçersiz")) {
      window.__showSnackbar("Şifre yanlış, tekrar deneyin.");
      return;
    }
    if (err?.status===401 && err?.message?.includes("Kullanıcı")) {
      setNotification({ severity: 'error', message: 'Bu hesap silinmiş. Lütfen destek ile iletişime geçin.' });
      return;
    }
    // Kullanıcı bulunamadı
    if (err?.status === 401 && err?.message?.includes("Kullanıcı")) {
      window.__showSnackbar("Böyle bir kullanıcı bulunamadı.");
      return;
    }
  }



  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none relative">

        <InputField
          icon={Mail}
          type="email"
          name="email"
          placeholder="E-posta Adresin"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="relative">
          <InputField
            icon={Lock}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Şifren"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-end pt-1 pb-4">
          <button
            type="button"
            onClick={() => setIsForgotModalOpen(true)}
            className="text-xs text-[#10b981] hover:text-[#10b981]/80 hover:underline transition-colors"
          >
            Şifremi Unuttum?
          </button>
        </div>

        <AuthButton text="Giriş Yap" type="submit" />

        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400/80">
            <div className="w-1.5 h-1.5 bg-[#10b981]/60 rounded-full animate-pulse"></div>
            <span>Güvenli giriş • SSL korumalı</span>
          </div>
        </div>

        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#10b981]/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#10b981]/3 rounded-full blur-lg pointer-events-none"></div>
      </form>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </>
  );
};

export default LoginForm;
