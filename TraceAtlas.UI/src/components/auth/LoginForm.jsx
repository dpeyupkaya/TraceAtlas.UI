import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
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
        console.error("Login Error:", err);

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Bir hata oluştu.";

        window.__showSnackbar(message);
      }
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    await withLoader(async () => {
      try {
        const token = credentialResponse.credential;
        await authService.googleLogin(token);
        navigate('/map');
      } catch (err) {
        console.error("Google Login Error:", err);
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Google ile giriş yaparken bir hata oluştu.";
        window.__showSnackbar(message);
      }
    });
  };

  const handleGoogleError = () => {
    window.__showSnackbar("Google Sign-In işlemi iptal edildi veya başarısız oldu.");
  };

  return (
    <>
      <div className="space-y-5 select-none relative">
        
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
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
            <AuthButton type="submit">Giriş Yap</AuthButton> 
          </div>
        </form>
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-700/50"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium">veya</span>
          <div className="flex-grow border-t border-slate-700/50"></div>
        </div>

   <div className="flex justify-center pb-2 w-full">
  <button
    onClick={() => document.querySelector('[role="button"]')?.click()}
    className="
      flex items-center justify-center gap-3
      w-full max-w-sm h-14
      rounded-2xl
      bg-[#111827]
      border border-white/10
      text-white
      transition
      hover:bg-[#1f2937]
    "
  >
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6 6.8l6.2 5.2C39.1 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
      </svg>
    </div>

    <span className="font-medium">
      Google ile Devam Et
    </span>

    <div className="hidden">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap
      />
    </div>
  </button>
</div>
      

        <Link to="/home" className='block pt-2'>
          <div>
            <AuthButton type="button">Ana Sayfa</AuthButton>
          </div>
        </Link>

        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none mix-blend-screen"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none mix-blend-screen"></div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </>
  );
};

export default LoginForm;