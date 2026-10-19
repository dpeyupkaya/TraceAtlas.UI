import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AtSign, Repeat, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';
import { useGlobalLoader } from '../../hooks/useGlobalLoader';

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { withLoader } = useGlobalLoader();

  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (notification) setNotification(null);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    if (!formData.userName || !formData.firstName || !formData.lastName) {
      setNotification({ severity: 'error', message: t('auth.register.missingFields') });
      return;
    }

    if (!validateEmail(formData.email)) {
      setNotification({ severity: 'error', message: t('auth.register.invalidEmail') });
      return;
    }

    if (!validatePassword(formData.password)) {
      setNotification({
        severity: 'error',
        message: t('auth.register.weakPassword')
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({ severity: 'error', message: t('auth.register.passwordMismatch') });
      return;
    }

    await withLoader(async () => {
      try {
        const dataToSend = {
          userName: formData.userName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        };

        await authService.register(dataToSend);

        setNotification({
          severity: 'success',
          message: t('auth.register.success')
        });

        setTimeout(() => {
          navigate('/auth');
        }, 3000);

      } catch (err) {
        const data = err?.response?.data;
        const rawMessage = data?.message || data?.detail || data?.error || "";
        const messageLower = rawMessage.toString().toLowerCase();
        const errors = data?.errors;

        if (errors) {
          const firstField = Object.keys(errors)[0];
          const firstError = errors[firstField][0];
          setNotification({ severity: 'error', message: firstError });
          return;
        }

        if (messageLower.includes("silinmiş")) {
          setNotification({
            severity: 'error',
            message: t('auth.register.deletedAccount')
          });
          return;
        }

        if (messageLower.includes("zaten kayıtlı") || messageLower.includes("e-posta")) {
          setNotification({
            severity: 'error',
            message: t('auth.register.emailExists')
          });
          return;
        }

        if (messageLower.includes("kullanılıyor") || messageLower.includes("kullanıcı adı")) {
          setNotification({
            severity: 'error',
            message: t('auth.register.usernameExists')
          });
          return;
        }

      
      }
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 select-none relative"
      autoComplete="off"
    >
      {/* Bildirim alanı */}
      {notification && (
        <div className={`flex items-start gap-3 text-[11px] font-bold p-4 rounded-xl border tracking-wide ${
          notification.severity === 'success'
            ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/15'
            : 'text-red-400 bg-red-500/5 border-red-500/15'
        }`}>
          {notification.severity === 'success' 
            ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> 
            : <AlertCircle size={16} className="shrink-0 mt-0.5" />
          }
          <span className="leading-relaxed">{notification.message}</span>
        </div>
      )}

      <div className="relative group">
        <InputField 
          icon={AtSign} 
          type="text" 
          name="userName"
          placeholder={t('common.fields.username')} 
          value={formData.userName}
          onChange={handleChange}
          autoComplete="off"
          data-lpignore="true"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InputField 
          icon={User} 
          type="text" 
          name="firstName"
          placeholder={t('common.fields.firstName')} 
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="off"
          data-lpignore="true"
        />
        <InputField 
          icon={User} 
          type="text" 
          name="lastName"
          placeholder={t('common.fields.lastName')} 
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="off"
          data-lpignore="true"
        />
      </div>

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
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-100/25 hover:text-emerald-400 transition-colors outline-none"
          tabIndex="-1"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      <div className="relative group">
        <InputField 
          icon={Repeat} 
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder={t('common.fields.confirmPassword')} 
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-100/25 hover:text-emerald-400 transition-colors outline-none"
          tabIndex="-1"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      {/* Kullanım Şartları */}
      <div className="flex items-start gap-3 px-1 py-1 group cursor-pointer">
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" 
            required
            className="peer appearance-none w-4 h-4 border border-white/10 rounded bg-white/[0.03] checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer focus:ring-0 focus:ring-offset-0"
          />
          <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5 top-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-[11px] text-emerald-100/40 leading-tight select-none">
          <span 
            onClick={(e) => {
              e.preventDefault();
              navigate('/terms');
            }}
            className="text-emerald-500 hover:text-emerald-400 font-bold hover:underline cursor-pointer transition-colors"
          >
            {t('auth.register.terms')}
          </span>{t('auth.register.termsAccepted')}
        </span>
      </div>

      <div className="pt-1">
        <AuthButton 
          type="submit"
        > {t('auth.register.submit')} </AuthButton>
      </div>

    </form>
  );
};

export default RegisterForm;
