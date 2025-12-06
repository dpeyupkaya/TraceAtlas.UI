import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { authService } from '../../services/authService';
// 1. Hook'u import ediyoruz
import { useGlobalLoader } from '../../hooks/useGlobalLoader';

const LoginForm = () => {
  const navigate = useNavigate();
  // 2. Hook'u başlatıyoruz
  const { withLoader } = useGlobalLoader(); 
  
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

    // 3. Tüm işlemi withLoader içine alıyoruz.
    // Böylece işlem başladığında bar çıkar, bittiğinde (hata olsa bile) kapanır.
    await withLoader(async () => {
      try {
        await authService.login(formData.email, formData.password);
        navigate('/map');
      } catch (err) {
        // Hata yönetimi (Senin yazdığın kod aynen korundu)
        console.log("Login Error:", err.response);

        const status = err?.response?.status || err?.status;
        
        let errorMsg = err?.response?.data?.message || err?.response?.data || err?.message || "";
        errorMsg = errorMsg.toLowerCase(); 

        if (status === 401 || status === 400) {
      
            if (errorMsg.includes("doğrulanmadan") || errorMsg.includes("doğrulama")) {
                window.__showSnackbar("Giriş yapabilmek için lütfen e-posta adresinizi doğrulayın.");
                return;
            }

            if (errorMsg.includes("silinmiş") || errorMsg.includes("devre dışı") || errorMsg.includes("askıya")) {
                window.__showSnackbar("Bu hesap silinmiş veya askıya alınmış. Lütfen destek ile iletişime geçin.");
                return;
            }
        
            if (errorMsg.includes("bulunamadı")) {
                window.__showSnackbar("Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.");
                return;
            }

            if (errorMsg.includes("şifre") || errorMsg.includes("password") || errorMsg.includes("hatalı")) {
                window.__showSnackbar("Girdiğiniz şifre hatalı, lütfen tekrar deneyin.");
                return;
            }
        }

        window.__showSnackbar(errorMsg.length > 5 ? errorMsg : "Giriş yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    });
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