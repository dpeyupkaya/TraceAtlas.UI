import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';
import AuthButton from './AuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { authService } from '../../services/authService';
import { useGlobalLoader } from '../../hooks/useGlobalLoader';

const LoginForm = () => {
  const { t } = useTranslation();
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
          t('common.messages.genericError');

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
          t('auth.login.googleLoginError');
        window.__showSnackbar(message);
      }
    });
  };

  const handleGoogleError = () => {
    window.__showSnackbar(t('auth.login.googleError'));
  };

  return (
    <>
      <div className="space-y-5 select-none relative">
        
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="relative group">
            <InputField
              icon={Mail}
              type="text"
              name="email"
              placeholder={t('common.fields.email')}
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
              placeholder={t('common.fields.password')}
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-100/25 hover:text-emerald-400 transition-colors duration-200 outline-none"
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-[11px] font-bold text-emerald-500 hover:text-emerald-400 hover:underline transition-all duration-200 outline-none tracking-wide"
            >
              {t('auth.login.forgotPassword')}
            </button>
          </div>

          <div className="pt-1">
            <AuthButton type="submit">{t('auth.login.submit')}</AuthButton> 
          </div>
        </form>

        {/* Ayraç */}
        <div className="relative flex items-center py-1">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-white/5"></div>
          <span className="flex-shrink-0 mx-4 text-emerald-100/20 text-[10px] font-bold tracking-widest uppercase">{t('auth.login.or')}</span>
          <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-white/5"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center w-full">
          <button
            onClick={() => document.querySelector('[role="button"]')?.click()}
            className="
              flex items-center justify-center gap-3
              w-full h-[52px]
              rounded-xl
              bg-white/[0.03] hover:bg-white/[0.07]
              border border-white/8 hover:border-emerald-500/20
              text-emerald-50
              transition-all duration-300
              active:scale-[0.98]
              group
            "
          >
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6 6.8l6.2 5.2C39.1 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
              </svg>
            </div>

            <span className="text-xs font-bold tracking-wider group-hover:text-white transition-colors">
              {t('auth.login.google')}
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

      </div>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </>
  );
};

export default LoginForm;
