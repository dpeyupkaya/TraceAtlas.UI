import React, { useState, useEffect } from 'react';
import { Mail, X, CheckCircle, AlertCircle, Snowflake } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Lütfen e-posta adresinizi giriniz.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    setStatus('loading');
    
    try {
      await authService.forgotPassword(email);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      const responseData = error?.response?.data;
      if (responseData?.errors) {
        const firstField = Object.keys(responseData.errors)[0];
        if (firstField) {
           setErrorMessage(responseData.errors[firstField][0]);
           return;
        }
      }
      if (responseData?.message) {
        setErrorMessage(responseData.message);
        return;
      }
      setErrorMessage("Sunucu ile iletişim kurulurken bir hata oluştu.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-emerald-950/90 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-emerald-100/40 hover:text-red-500 transition-colors duration-300"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-6 space-y-6 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white tracking-tight uppercase">Bağlantı Gönderildi</h3>
              <p className="text-emerald-100/60 text-sm font-medium leading-relaxed px-4">
                Şifre sıfırlama bağlantısı e-posta adresinize ulaştırıldı. Gelen kutunuzu kontrol edin.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all text-xs font-black tracking-widest uppercase active:scale-95"
            >
              Kapat
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-emerald-900/50 rounded-2xl border border-white/5 text-emerald-400">
                  <Snowflake size={32} className="animate-spin-slow" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Şifreni mi Unuttun?</h3>
              <p className="text-emerald-100/40 text-[10px] font-black tracking-[0.2em] uppercase">
                Sıfırlama linki için e-posta adresini gir
              </p>
            </div>

            <div className="space-y-4">
              <InputField 
                icon={Mail}
                type="email"
                placeholder="E-posta Adresin"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="bg-black/20 border-white/5 focus:border-emerald-500/50"
              />

              {errorMessage && (
                <div className="flex items-center gap-3 text-red-400 text-[11px] font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20 animate-in slide-in-from-top-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage.toUpperCase()}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <AuthButton
                type="submit"
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading' ? 'GÖNDERİLİYOR...' : 'BAĞLANTI GÖNDER'}
              </AuthButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;