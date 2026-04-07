import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import AuthButton from './AuthButton';
import { authService } from '../../services/authService';

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    if (!token) {
      navigate('/map');
      return;
    }

    const verifyEmail = async () => {
      try {
        await authService.confirmEmail(token);
        
        setTimeout(() => {
            setStatus('success');
        }, 1500);

      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center animate-in zoom-in duration-300">
        
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mx-auto">
              <Loader2 size={40} className="animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white">Doğrulanıyor...</h2>
            <p className="text-slate-400">E-posta adresiniz kontrol ediliyor, lütfen bekleyin.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] mx-auto">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white">Hesap Doğrulandı!</h2>
            <p className="text-slate-400">E-posta adresiniz başarıyla onaylandı. Artık giriş yapabilirsiniz.</p>
            
            <div className="pt-4">
                <AuthButton 
                    text="Giriş Yap" 
                    onClick={() => navigate('/auth')}
                />
            </div>
          </div>
        )}

     
        {status === 'error' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto">
              <XCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white">Doğrulama Başarısız</h2>
            <p className="text-slate-400">Bağlantı geçersiz veya süresi dolmuş olabilir.</p>
            
            <div className="pt-4">
                <AuthButton 
                    text="Giriş Sayfasına Dön" 
                    onClick={() => navigate('/auth')}
                />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ConfirmEmailPage;