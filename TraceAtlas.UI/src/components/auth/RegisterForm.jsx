import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AtSign, Repeat, Eye, EyeOff } from 'lucide-react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';
import { useGlobalLoader } from '../../hooks/useGlobalLoader';

const RegisterForm = () => {
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
      setNotification({ severity: 'error', message: 'Lütfen tüm alanları doldurunuz.' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setNotification({ severity: 'error', message: 'Geçersiz e-posta formatı.' });
      return;
    }

    if (!validatePassword(formData.password)) {
      setNotification({
        severity: 'error',
        message: 'Şifre en az 6 karakter olmalı; 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir.'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({ severity: 'error', message: 'Şifreler uyuşmuyor!' });
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
          message: 'Kayıt başarılı! Doğrulama bağlantısı e-posta adresinize gönderildi. Yönlendiriliyorsunuz...'
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
            message: 'Bu hesap daha önce silinmiş. Lütfen destek ekibiyle iletişime geçin.'
          });
          return;
        }

        if (messageLower.includes("zaten kayıtlı") || messageLower.includes("e-posta")) {
          setNotification({
            severity: 'error',
            message: 'Bu e-posta adresi ile zaten bir hesap mevcut.'
          });
          return;
        }

        if (messageLower.includes("kullanılıyor") || messageLower.includes("kullanıcı adı")) {
          setNotification({
            severity: 'error',
            message: 'Bu kullanıcı adı başkası tarafından alınmış, lütfen başka bir tane seçin.'
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
      {notification && (
        <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
          <Alert severity={notification.severity} variant="filled" className="rounded-xl shadow-lg">
            {notification.message}
          </Alert>
        </Stack>
      )}

      <div className="relative group">
        <InputField 
          icon={AtSign} 
          type="text" 
          name="userName"
          placeholder="Kullanıcı Adı" 
          value={formData.userName}
          onChange={handleChange}
          autoComplete="off"
          data-lpignore="true"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField 
          icon={User} 
          type="text" 
          name="firstName"
          placeholder="Adın" 
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="off"
          data-lpignore="true"
        />
        <InputField 
          icon={User} 
          type="text" 
          name="lastName"
          placeholder="Soyadın" 
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors outline-none"
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
          placeholder="Şifreni Onayla" 
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors outline-none"
          tabIndex="-1"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      <div className="flex items-start gap-3 px-1 py-2 group cursor-pointer">
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" 
            required
            className="peer appearance-none w-4 h-4 border border-slate-600 rounded bg-slate-800/50 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer focus:ring-0 focus:ring-offset-0"
          />
          <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5 top-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-xs text-slate-400 leading-tight select-none">
          <span 
            onClick={(e) => {
              e.preventDefault();
              navigate('/terms');
            }}
            className="text-emerald-500 hover:text-emerald-400 font-medium hover:underline cursor-pointer transition-colors"
          >
            Kullanım Şartları
          </span>'nı okudum ve kabul ediyorum
        </span>
      </div>

      <div className="pt-2">
        <AuthButton 
          text="Hesap Oluştur" 
          type="submit"
        />
      </div>

     

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none mix-blend-screen"></div>
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none mix-blend-screen"></div>
    </form>
  );
};

export default RegisterForm;