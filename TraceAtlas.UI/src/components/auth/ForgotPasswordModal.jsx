import React, { useState, useEffect } from 'react';
import { Mail, X, CheckCircle, AlertCircle } from 'lucide-react';
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
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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
      
      // Backend Middleware'den gelen 'message' alanını öncelikli al
      const rawMessage = responseData?.message || responseData?.detail || responseData?.error || "";
      const messageLower = rawMessage.toString().toLowerCase();
      
      const validationErrors = responseData?.errors;

      // 1. Eğer Validasyon hatası varsa (Dictionary formatında geldiyse)
      if (validationErrors) {
        // İlk hatayı bulup göster
        const firstField = Object.keys(validationErrors)[0];
        if (firstField) {
           const firstError = validationErrors[firstField][0];
           
           // Eğer hata "hak" veya "limit" içeriyorsa özel mesaj göster, değilse hatayı olduğu gibi göster
           if (firstError.toLowerCase().includes("hak") || firstError.toLowerCase().includes("limit")) {
              setErrorMessage("Günlük şifre sıfırlama hakkınızı aştınız. Lütfen 24 saat sonra tekrar deneyiniz.");
           } else {
              setErrorMessage(firstError);
           }
           return;
        }
      }

      // 2. Genel Mesaj Kontrolleri
      if (messageLower.includes("silinmiş") || messageLower.includes("deleted")) {
        setErrorMessage("Bu hesap silinmiş veya devre dışı bırakılmış. Lütfen destek ile iletişime geçin.");
        return;
      }

      if (messageLower.includes("bulunamadı") || messageLower.includes("not found")) {
        setErrorMessage("Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.");
        return;
      }
      
      // Validasyon listesinde değil de direkt mesajda geldiyse
      if (messageLower.includes("hak") || messageLower.includes("limit") || messageLower.includes("aştınız")) {
        setErrorMessage("Günlük şifre sıfırlama hakkınızı aştınız. Lütfen 24 saat sonra tekrar deneyiniz.");
        return;
      }

      // Hiçbiri değilse gelen mesajı göster
      setErrorMessage(rawMessage || "Sunucu ile iletişim kurulurken bir hata oluştu.");
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
            <h3 className="text-xl font-semibold text-white">İşlem Başarılı</h3>
            <p className="text-slate-400 text-sm">
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin.
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />

            {errorMessage && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg animate-in slide-in-from-top-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <AuthButton 
              text={status === 'loading' ? 'Kontrol Ediliyor...' : 'Sıfırlama Linki Gönder'}
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