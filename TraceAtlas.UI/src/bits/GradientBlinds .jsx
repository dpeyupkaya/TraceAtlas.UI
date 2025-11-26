// src/bits/GradientBlinds.jsx
import React, { useRef, useEffect } from 'react';

const GradientBlinds = ({
  // DEĞİŞİKLİK BURADA: Doğayla uyumlu 'Zümrüt Orman' paleti
  // Renk 1: #064e3b (Derin Yosun Yeşili - Gölge)
  // Renk 2: #10b981 (Canlı Zümrüt Yeşili - Işık)
  gradientColors = ['#064e3b', '#10b981'], 
  blindCount = 12,
  animationSpeed = 0.002 // Hareket hızı
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      // Ekranı temizle
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const blindWidth = width / blindCount;

      // Her bir şeridi çiz
      for (let i = 0; i < blindCount; i++) {
        // Renk geçişi (Gradient) oluştur
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        
        // Hareket efekti için zamanı kullanıyoruz
        // Math.sin ile dalgalanma efekti veriyoruz
        const offset = Math.sin(time + i * 0.5) * 0.5 + 0.5; 
        
        gradient.addColorStop(0, gradientColors[0]);
        // Ortadaki renk geçişi zamana göre hareket etsin
        gradient.addColorStop(Math.max(0.1, Math.min(0.9, offset)), gradientColors[1]); 
        gradient.addColorStop(1, gradientColors[0]);

        ctx.fillStyle = gradient;
        
        // Şeridi çiz
        // x, y, width, height
        ctx.fillRect(i * blindWidth, 0, blindWidth, height);
        
        // Şeritlerin arasına çok ince siyah çizgi atalım (Blinds efekti)
        // Doğal görünüm için çizgiyi biraz daha yumuşattım (opacity 0.3 -> 0.2)
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(i * blindWidth, 0, blindWidth, height);
      }

      time += animationSpeed * 10; // Zamanı ilerlet
      animationFrameId = window.requestAnimationFrame(draw);
    };


    resize();
    window.addEventListener('resize', resize);
    draw();

    // Temizlik (Component kapanırsa döngüyü durdur)
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [gradientColors, blindCount, animationSpeed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
    />
  );
};

export default GradientBlinds;