import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Repeat, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react'; // Snowflake/Star silindi, ShieldCheck eklendi
import { useTranslation } from 'react-i18next';
import InputField from './InputField';
import { authService } from '../../services/authService';
import AuthButton from './AuthButton';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
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
      setErrorMessage(t('auth.resetPassword.mismatch'));
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage(t('auth.resetPassword.weak'));
      return;
    }

    try {
      setStatus('loading');
      await authService.resetPassword(token, formData.password);
      setStatus('success');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error?.response?.data?.message || t('auth.resetPassword.expired'));
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden select-none">
      
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-emerald-950/10 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-3xl relative z-10 overflow-hidden">
      
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {status === 'success' ? (
          <div className="text-center space-y-6 py-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <CheckCircle size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">{t('auth.resetPassword.successTitle')}</h2>
              <p className="text-emerald-100/40 text-sm font-medium uppercase tracking-widest">{t('auth.resetPassword.successText')}</p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-10 space-y-3">
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-emerald-500/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative w-14 h-14 bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10">
                    <ShieldCheck size={28} />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{t('auth.resetPassword.title')}</h2>
              <p className="text-emerald-100/40 text-[10px] font-black tracking-[0.2em] uppercase">{t('auth.resetPassword.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <InputField 
                  icon={Lock} 
                  type="password" 
                  placeholder={t('common.fields.newPassword')} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-white/[0.03] border-white/5 focus:border-emerald-500/50"
                />

                <InputField 
                  icon={Repeat} 
                  type="password" 
                  placeholder={t('common.fields.confirmPassword')} 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="bg-white/[0.03] border-white/5 focus:border-emerald-500/50"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-3 text-red-400/80 text-[10px] font-black bg-red-500/5 p-4 rounded-xl border border-red-500/10 animate-shake uppercase tracking-wider">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-4">
                <AuthButton
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black tracking-[0.2em] shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
                >
                  {status === 'loading' ? t('common.states.processing') : t('auth.resetPassword.submit')}
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
