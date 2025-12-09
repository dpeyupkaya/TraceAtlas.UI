import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { authService } from '../../services/authService';
import { useGlobalLoader } from '../../hooks/useGlobalLoader';

const LoginForm = () => {
  const navigate = useNavigate();
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

    await withLoader(async () => {
      try {
        await authService.login(formData.email, formData.password);
        navigate('/map');
      } catch (err) {
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
      <form 
        onSubmit={handleSubmit} 
        className="space-y-5 select-none relative"
        autoComplete="off"
      >
        <div className="relative group">
          <InputField
            icon={Mail}
            type="text"
            name="email"
            placeholder="E-posta Adresin"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            data-lpignore="true"
          />
        </div>

        <div className="relative group">
          <InputField
            icon={Lock}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Şifren"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors duration-200 outline-none"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => setIsForgotModalOpen(true)}
            className="text-xs font-medium text-emerald-500 hover:text-emerald-400 hover:underline transition-all duration-200 outline-none"
          >
            Şifremi Unuttum?
          </button>
        </div>

        <div className="pt-2">
            <AuthButton text="Giriş Yap" type="submit" />
        </div>

      

        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none mix-blend-screen"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none mix-blend-screen"></div>
      </form>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </>
  );
};

export default LoginForm;