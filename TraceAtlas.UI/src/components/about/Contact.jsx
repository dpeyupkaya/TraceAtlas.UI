import React, { useState } from 'react';
import { Mail, Send, Linkedin, Github, AlertCircle, Loader2 } from 'lucide-react'; 
import contactService from '../../services/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "İsim alanı boş bırakılamaz.";
    } else if (formData.name.length > 50) {
      newErrors.name = "İsim 50 karakterden uzun olamaz.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj alanı boş bırakılamaz.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Mesajınız çok kısa (en az 10 karakter).";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Mesajınız 1000 karakteri geçemez.";
    } else if (formData.message.includes('<script>') || formData.message.includes('</script>')) {
      newErrors.message = "Mesajınızda güvenlik nedeniyle izin verilmeyen ifadeler var.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await contactService.sendMessage(formData);
      alert("Mesajınız başarıyla gönderildi! Teşekkürler.");
      setFormData({ name: '', email: '', message: '' }); 
      setErrors({}); 
    } catch (error) {
      console.error(error);
      
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          backendErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(backendErrors);
      } else {
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="min-h-screen bg-[#1E3A3A] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#10b981] bg-clip-text text-transparent">
            İletişime Geç
          </h1>
          <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto">
            Proje hakkında sorularınız, önerileriniz veya iş birliği teklifleriniz için bana ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-[#2D554F]/30 p-8 rounded-2xl border border-[#10b981]/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-white">İletişim Kanalları</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#10b981]/20 rounded-lg text-[#10b981]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">E-posta</h4>
                    <a href="mailto:info@traceatlas.com" className="text-emerald-100/70 text-sm mt-1 hover:text-[#10b981] transition-colors block">
                      info@traceatlas.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#10b981]/20 rounded-lg text-[#10b981]">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">LinkedIn</h4>
                    <a href="https://linkedin.com/in/dp-eyup-kaya" target="_blank" rel="noopener noreferrer" className="text-emerald-100/70 text-sm mt-1 hover:text-[#10b981] transition-colors block">
                      linkedin.com/in/eyupkaya
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#10b981]/20 rounded-lg text-[#10b981]">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">GitHub</h4>
                    <a href="https://github.com/dpeyupkaya" target="_blank" rel="noopener noreferrer" className="text-emerald-100/70 text-sm mt-1 hover:text-[#10b981] transition-colors block">
                      github.com/eyupkaya
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2D554F]/30 p-8 rounded-2xl border border-[#10b981]/10 backdrop-blur-sm">
               <p className="text-emerald-100/60 text-sm">
                 Not: Bu form aktiftir ve mesajınız doğrudan bana ulaşır.
               </p>
            </div>
          </div>

          <div className="bg-[#2D554F]/50 p-8 rounded-2xl border border-[#10b981]/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white">Mesaj Gönder</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-emerald-100/80 mb-2">Ad Soyad</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    className={`w-full bg-[#1E3A3A]/50 border ${errors.name ? 'border-red-500' : 'border-[#10b981]/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10b981] transition-colors`}
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-100/80 mb-2">E-posta</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    className={`w-full bg-[#1E3A3A]/50 border ${errors.email ? 'border-red-500' : 'border-[#10b981]/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10b981] transition-colors`}
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-100/80 mb-2">Mesajınız</label>
                <div className="relative">
                  <textarea 
                    rows="4"
                    name="message"
                    className={`w-full bg-[#1E3A3A]/50 border ${errors.message ? 'border-red-500' : 'border-[#10b981]/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10b981] transition-colors resize-none`}
                    placeholder="Mesajınızı buraya yazınız..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.message}
                  </p>
                )}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Mesajı Gönder
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;