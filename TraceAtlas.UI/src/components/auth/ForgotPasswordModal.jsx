import React, { useState } from 'react';
import { Mail, X, CheckCircle, AlertCircle, Compass } from 'lucide-react'; 
import { useTranslation } from 'react-i18next';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  if (!isOpen) return null;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage(t('auth.forgot.missingEmail'));
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage(t('auth.forgot.invalidEmail'));
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
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#041a14]/95 backdrop-blur-xl">
    
      <div className="relative w-full max-w-md bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden">
        
        {/* Üst çizgi aksan */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        {/* Ambient glow */}
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 text-emerald-100/20 hover:text-emerald-400 transition-colors duration-300 z-10"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-6 space-y-6 relative z-10">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <CheckCircle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white tracking-tight uppercase">{t('auth.forgot.sentTitle')}</h3>
              <p className="text-emerald-100/50 text-xs font-medium leading-relaxed px-4 tracking-wide">
                {t('auth.forgot.sentText')}
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="px-8 py-3 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-xl border border-white/10 hover:border-emerald-500/20 transition-all text-[10px] font-black tracking-[0.2em] uppercase active:scale-95"
            >
              {t('common.buttons.close')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
                  <Compass size={32} className="animate-[spin_20s_linear_infinite]" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">{t('auth.forgot.title')}</h3>
              <p className="text-emerald-100/40 text-[10px] font-bold tracking-[0.2em] uppercase">
                {t('auth.forgot.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              <InputField 
                icon={Mail}
                type="email"
                placeholder={t('common.fields.email')}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
              />

              {errorMessage && (
                <div className="flex items-center gap-3 text-red-400 text-[11px] font-bold bg-red-500/5 p-4 rounded-xl border border-red-500/10 tracking-wide">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <div className="pt-1">
              <AuthButton
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? t('common.states.processing') : t('auth.forgot.sendLink')}
              </AuthButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
