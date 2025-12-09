import React, { useRef, useEffect } from 'react';

const GradientBlinds = ({
  gradientColors = ['#064e3b', '#10b981'], 
  blindCount = 12,
  animationSpeed = 0.002
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let isMobile = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const blindWidth = width / blindCount;

      for (let i = 0; i < blindCount; i++) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        
        const offset = Math.sin(time + i * 0.5) * 0.5 + 0.5; 
        
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(Math.max(0.1, Math.min(0.9, offset)), gradientColors[1]); 
        gradient.addColorStop(1, gradientColors[0]);

        ctx.fillStyle = gradient;
        
        ctx.fillRect(i * blindWidth, 0, blindWidth, height);
        
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(i * blindWidth, 0, blindWidth, height);
      }

      const speedMultiplier = isMobile ? 0.3 : 1;
      time += animationSpeed * 10 * speedMultiplier;

      animationFrameId = window.requestAnimationFrame(draw);
    };


    resize();
    window.addEventListener('resize', resize);
    draw();

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