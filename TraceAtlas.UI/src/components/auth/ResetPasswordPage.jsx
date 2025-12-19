import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Repeat, CheckCircle, AlertCircle, Snowflake, Star } from 'lucide-react';
import InputField from './InputField';
import ChristmasButton from '../../common/ChristmasButton'; // Daha önce yaptığımız butonu kullanıyoruz
import { authService } from '../../services/authService';
import Snowfall from 'react-snowfall';
import AuthButton from './AuthButton';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) navigate('/auth');
  }, [token, navigate]);

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Şifreler birbirini tutmuyor!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage("Şifre en az 6 karakter; 1 büyük, 1 küçük harf ve 1 rakam içermelidir.");
      return;
    }

    try {
      setStatus('loading');
      await authService.resetPassword(token, formData.password);
      setStatus('success');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error?.response?.data?.message || "Linkin süresi dolmuş olabilir.");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#040d0a] flex items-center justify-center p-4 relative overflow-hidden select-none">
      <Snowfall color='white' snowflakeCount={100} style={{ position: 'fixed', zIndex: 0 }} />
      
      {/* Arka Plan Işımaları */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-emerald-950/30 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl relative z-10 overflow-hidden">
        {/* Üst Dekoratif Çizgi */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        {status === 'success' ? (
          <div className="text-center space-y-6 py-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">ŞİFRE YENİLENDİ!</h2>
              <p className="text-emerald-100/50 text-sm font-medium">Harika! Şimdi yeni şifrenle giriş yapabilirsin.</p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-10 space-y-3">
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-emerald-500/50 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative w-14 h-14 bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10">
                    <Lock size={28} />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">YENİ ŞİFRE BELİRLE</h2>
              <p className="text-emerald-100/40 text-[10px] font-black tracking-[0.2em] uppercase">Güvenliğin İçin Güçlü Bir Şifre Seç</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <InputField 
                  icon={Lock} 
                  type="password" 
                  placeholder="Yeni Şifre" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-black/20 border-white/5 focus:border-emerald-500/50"
                />

                <InputField 
                  icon={Repeat} 
                  type="password" 
                  placeholder="Şifreyi Onayla" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="bg-black/20 border-white/5 focus:border-emerald-500/50"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-3 text-red-400 text-xs font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20 animate-shake">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage.toUpperCase()}</span>
                </div>
              )}

              <div className="pt-4">
                <AuthButton
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? 'GÜNCELLENİYOR...' : 'ŞİFREYİ KAYDET'}
                </AuthButton>
              </div>
            </form>
          </>
        )}
      </div>

     
    </div>
  );
};

export default ResetPasswordPage;