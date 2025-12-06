import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Repeat, CheckCircle, AlertCircle } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Şifreler birbirini tutmuyor!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage("Şifre en az 6 karakter olmalı; 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir.");
      return;
    }

    try {
      setStatus('loading');
      
      await authService.resetPassword(token, formData.password);
      
      setStatus('success');
      
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
      
    } catch (error) {
      console.error(error);
      setStatus('error');
      const msg = error?.response?.data?.message || error?.response?.data?.detail || "Sıfırlama başarısız. Linkin süresi dolmuş olabilir.";
      setErrorMessage(msg);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] mx-auto">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white">Şifreniz Yenilendi!</h2>
          <p className="text-slate-400">Harika! Şimdi yeni şifrenle giriş yapabilirsin.</p>
          <p className="text-xs text-slate-500">Giriş sayfasına yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="text-center mb-8 space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
              <Lock size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Yeni Şifre Belirle</h2>
          <p className="text-slate-400 text-sm">Lütfen unutmayacağın güçlü bir şifre seç.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <InputField 
            icon={Lock}
            type="password"
            placeholder="Yeni Şifre"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <InputField 
            icon={Repeat}
            type="password"
            placeholder="Şifreyi Onayla"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />

          {errorMessage && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-4">
            <AuthButton 
              text={status === 'loading' ? 'Şifre Güncelleniyor...' : 'Şifreyi Kaydet'}
              type="submit"
              disabled={status === 'loading'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;