import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { authService } from '../../services/authService';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(formData.email, formData.password);
      navigate('/map');
    } catch (error) {
      console.error(error);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
        
        <InputField 
          icon={Mail} 
          type="email" 
          name="email"
          placeholder="E-posta Adresin" 
          value={formData.email}
          onChange={handleChange}
        />
        
        <InputField 
          icon={Lock} 
          type="password" 
          name="password"
          placeholder="Şifren" 
          value={formData.password}
          onChange={handleChange}
        />
        
        <div className="flex justify-end pt-1 pb-4">
          <button
            type="button"
            onClick={() => setIsForgotModalOpen(true)}
            className="text-xs text-[#10b981] hover:text-[#10b981]/80 hover:underline transition-colors"
          >
            Şifremi Unuttum?
          </button>
        </div>
        
        <AuthButton 
          text="Giriş Yap" 
          type="submit" 
        />

        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400/80">
            <div className="w-1.5 h-1.5 bg-[#10b981]/60 rounded-full animate-pulse"></div>
            <span>Güvenli giriş • SSL korumalı</span>
          </div>
        </div>

        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#10b981]/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#10b981]/3 rounded-full blur-lg pointer-events-none"></div>
      </form>
      <ForgotPasswordModal 
        isOpen={isForgotModalOpen} 
        onClose={() => setIsForgotModalOpen(false)} 
      />
    </>
  );
};

export default LoginForm;