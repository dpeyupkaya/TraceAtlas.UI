import React from 'react';
import { Code2, Globe, Database, Cpu } from 'lucide-react';
import Footer from '../footer/Footer';

const About = () => {
  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Başlık Bölümü */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#10b981] bg-clip-text text-transparent">
            TraceAtlas Hakkında
          </h1>
          <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto">
            Doğayı keşfet, rotanı çiz, anılarını haritala. TraceAtlas, modern web teknolojileri ile geliştirilmiş açık kaynaklı bir haritalama projesidir.
          </p>
        </div>

        {/* Proje Hikayesi Kartı */}
        <div className="bg-[#2D554F]/50 border border-[#10b981]/20 rounded-2xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-[#10b981]">Proje Vizyonu</h2>
          <p className="text-emerald-100/80 leading-relaxed mb-4">
            Bu proje, gezginlerin keşfettikleri lokasyonları kaydedebilmesi ve diğer doğaseverlerle paylaşabilmesi amacıyla geliştirilmiştir. 
            Klasik harita uygulamalarından farklı olarak, TraceAtlas kullanıcı deneyimini ve topluluk odaklı paylaşımı merkeze alır.
          </p>
          <p className="text-emerald-100/80 leading-relaxed">
            Tamamen eğitim amaçlı geliştirilen bu proje, modern yazılım mimarileri (Clean Architecture, Onion Architecture) kullanılarak tasarlanmıştır.
          </p>
        </div>

        {/* Teknoloji Stack Bölümü */}
        <h3 className="text-xl font-bold mb-6 text-center text-white">Kullanılan Teknolojiler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          <div className="p-6 bg-[#2D554F]/30 rounded-xl border border-[#10b981]/10 hover:border-[#10b981]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-[#10b981]" />
              <h4 className="font-bold">Frontend</h4>
            </div>
            <p className="text-sm text-emerald-100/60">React, Vite, Tailwind CSS, Leaflet Maps entegrasyonu.</p>
          </div>

          <div className="p-6 bg-[#2D554F]/30 rounded-xl border border-[#10b981]/10 hover:border-[#10b981]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-6 h-6 text-[#10b981]" />
              <h4 className="font-bold">Backend</h4>
            </div>
            <p className="text-sm text-emerald-100/60">.NET Core 8, C#, Entity Framework Core, PostgreSQL.</p>
          </div>

          <div className="p-6 bg-[#2D554F]/30 rounded-xl border border-[#10b981]/10 hover:border-[#10b981]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Code2 className="w-6 h-6 text-[#10b981]" />
              <h4 className="font-bold">Mimari</h4>
            </div>
            <p className="text-sm text-emerald-100/60">Clean Architecture, CQRS Pattern, MediatR.</p>
          </div>
          
           <div className="p-6 bg-[#2D554F]/30 rounded-xl border border-[#10b981]/10 hover:border-[#10b981]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="w-6 h-6 text-[#10b981]" />
              <h4 className="font-bold">Geliştirici</h4>
            </div>
            <p className="text-sm text-emerald-100/60">Eyüp Kaya tarafından geliştirilmektedir.</p>
          </div>

        </div>

      </div>
       <Footer />
    </div>
   
    </>
  );
};

export default About;