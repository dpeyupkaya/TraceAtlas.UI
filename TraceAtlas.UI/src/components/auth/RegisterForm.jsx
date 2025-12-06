import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AtSign, Repeat, Eye, EyeOff } from 'lucide-react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

    try {
        setLoading(true);

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

        setNotification({ severity: 'error', message: rawMessage || 'Kayıt işlemi sırasında bir hata oluştu.' });
    } finally {
        setLoading(false);
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none relative">
      
      {notification && (
        <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
          <Alert severity={notification.severity} variant="filled">
            {notification.message}
          </Alert>
        </Stack>
      )}

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

      <div className="relative group">
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
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
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      <label className="flex items-center gap-2 cursor-pointer group select-none px-1 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
        <input 
          type="checkbox" 
          required
          className="appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-[#10b981] checked:border-[#10b981] transition-all cursor-pointer hover:border-[#10b981]/60 shrink-0 focus:ring-2 focus:ring-[#10b981]/30"
        />
        <span className="text-xs text-slate-300/70 group-hover:text-slate-200 transition-colors">
          <span 
            onClick={(e) => {
              e.preventDefault();
              navigate('/terms');
            }}
            className="text-[#10b981] hover:text-[#10b981]/80 hover:underline underline-offset-2 transition-colors duration-300 cursor-pointer"
          >
            Kullanım Şartları
          </span>'nı okudum ve kabul ediyorum
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
          text={loading ? "İşlem Yapılıyor..." : "Hesap Oluştur"} 
          type="submit"
          disabled={loading}
        />
      </div>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#10b981]/3 rounded-full blur-xl pointer-events-none"></div>
    </form>
  );
};

export default RegisterForm;