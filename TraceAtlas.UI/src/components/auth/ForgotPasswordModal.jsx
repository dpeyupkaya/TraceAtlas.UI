import React, { useState } from 'react';
import { Mail, X, CheckCircle } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await authService.forgotPassword(email);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl p-6">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-6 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981]">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white">E-posta Gönderildi!</h3>
            <p className="text-slate-400 text-sm">
              Şifre sıfırlama talimatlarını içeren bir e-posta gönderdik. Lütfen gelen kutunu (ve spam klasörünü) kontrol et.
            </p>
            <button 
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Tamam
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-white">Şifreni mi Unuttun?</h3>
              <p className="text-slate-400 text-sm">
                Hesabına bağlı e-posta adresini gir, sana sıfırlama bağlantısı gönderelim.
              </p>
            </div>

            <InputField 
              icon={Mail}
              type="email"
              placeholder="E-posta Adresin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {status === 'error' && (
              <div className="text-red-400 text-xs text-center bg-red-400/10 p-2 rounded">
                Bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            )}

            <AuthButton 
              text={status === 'loading' ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
              type="submit"
              disabled={status === 'loading'}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;