import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GooeyNav = ({
  items,
  animationTime = 1500,
  particleCount = 20, 
  particleDistances = [100, 40],
  particleR = 50, 
  timeVariance = 500,
  colors = ["#22c55e", "#0ea5e9", "#eab308"], 
  initialActiveIndex = 0
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);

  // Gerçek URL state'i
  const [activeIndex, setActiveIndex] = useState(() => {
    const foundIndex = items.findIndex(item => item.href === location.pathname);
    return foundIndex !== -1 ? foundIndex : initialActiveIndex;
  });

  // Görsel state (Hover/Focus için)
  const [hoverIndex, setHoverIndex] = useState(null);
  
  // Hangi indeksi göstereceğimizi belirle: Hover varsa onu, yoksa aktif olanı göster
  const visibleIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  const noise = (n = 1) => n / 2 - Math.random() * n;
  
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)], 
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = element => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', p.color);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch { }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = element => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !element) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  // --- HANDLERS ---

  // Mouse üzerine gelince veya Fokuslanınca (Efektleri Patlat)
  const handleInteractionStart = (index) => {
    setHoverIndex(index); // Görsel olarak oraya git
    
    // Partikül efektini başlat
    if (filterRef.current) {
      // Öncekileri temizle (opsiyonel, daha temiz animasyon için)
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current.removeChild(p));
      makeParticles(filterRef.current);
    }
  };

  // Mouse ayrılınca (Eski yerine dön)
  const handleInteractionEnd = () => {
    setHoverIndex(null); // Aktif sekmeye geri dön
  };

  // Tıklama (Sadece yönlendirme yap)
  const handleNavClick = (e, index, href) => {
    e.preventDefault();
    setActiveIndex(index);
    setTimeout(() => {
      navigate(href);
    }, 300); // Yönlendirme süresini kısalttım, daha seri olsun
  };

  const handleKeyDown = (e, index, href) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNavClick(e, index, href);
    }
  };

  // --- EFFECTS ---

  // visibleIndex değiştiğinde baloncuk pozisyonunu güncelle
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    const targetLi = navRef.current.querySelectorAll('li')[visibleIndex];
    if (targetLi) {
      updateEffectPosition(targetLi);
      textRef.current?.classList.add('active');
    }
    
    // Resize durumunda tekrar hesapla
    const resizeObserver = new ResizeObserver(() => {
      const currentLi = navRef.current?.querySelectorAll('li')[visibleIndex];
      if (currentLi) updateEffectPosition(currentLi);
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [visibleIndex]);

  // URL değişirse activeIndex'i güncelle
  useEffect(() => {
    const foundIndex = items.findIndex(item => item.href === location.pathname);
    if (foundIndex !== -1 && foundIndex !== activeIndex) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

  return (
    <>
      <style>
        {`
          .effect {
            position: absolute; opacity: 1; pointer-events: none; display: grid; place-items: center; z-index: 1;
            /* Baloncuk geçiş animasyonu */
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .effect.text {
            color: #000000; transition: color 0.3s ease; font-weight: 600; display: flex; justify-content: center; align-items: center;
          }
          .effect.text.active { color: #000000; }
          .effect.filter { filter: blur(8px) contrast(120) blur(0); mix-blend-mode: normal; }
          .effect.filter::before { content: ""; position: absolute; inset: -75px; z-index: -2; background: inherit; }
          .effect.filter::after {
            content: ""; position: absolute; inset: 0; background: #dcfce7; transform: scale(1); opacity: 1; z-index: -1; border-radius: 9999px; box-shadow: 0 0 20px 2px rgba(74, 222, 128, 0.3); 
          }
          .effect.active::after { animation: pill 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
          @keyframes pill { 0% { transform: scale(0.9); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
          .particle, .point { display: block; opacity: 0; width: 20px; height: 20px; border-radius: 9999px; transform-origin: center; }
          .particle { --time: 5s; position: absolute; top: calc(50% - 8px); left: calc(50% - 8px); animation: particle calc(var(--time)) ease-out 1; }
          .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease-out 1; box-shadow: 0 0 5px 0px var(--color); }
          @keyframes particle {
            0% { transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: rotate(calc(var(--rotate))) translate(calc(var(--end-x)), calc(var(--end-y))); opacity: 0; }
          }
          @keyframes point {
            0% { transform: scale(0); }
            30% { transform: scale(var(--scale)); }
            70% { transform: scale(calc(var(--scale) * 0.8)); opacity: 0.8; }
            100% { transform: scale(0); opacity: 0; }
          }
        `}
      </style>
      <div className="relative" ref={containerRef} style={{position: 'relative', width:'fit-content'}}>
        <nav 
            className="flex relative" 
            style={{ transform: 'translate3d(0,0,0.01px)' }}
            onMouseLeave={handleInteractionEnd} // Mouse menüden çıkınca eski yerine dön
        >
          <ul
            ref={navRef}
            className="flex gap-4 sm:gap-8 list-none p-0 px-2 sm:px-4 m-0 relative z-[3]"
            style={{ display: 'flex', listStyle: 'none', margin: 0, position: 'relative', zIndex: 3, color: 'black' }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                // Hover ve Focus anında efektleri tetikle
                onMouseEnter={() => handleInteractionStart(index)}
                onFocus={() => handleInteractionStart(index)}
                style={{
                  position: 'relative', cursor: 'pointer', borderRadius: '9999px',
                  // visibleIndex'e göre text rengini ayarla (üstünde baloncuk varsa text gizlenir)
                  color: visibleIndex === index ? 'transparent' : 'black', 
                  transition: 'color 0.3s', 
                  zIndex: 10
                }}
              >
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, index, item.href)}
                  onKeyDown={e => handleKeyDown(e, index, item.href)}
                  style={{
                    display: 'inline-block', padding: '0.6em 1em', textDecoration: 'none', color: 'inherit', fontFamily: 'sans-serif', letterSpacing: '0.5px', fontWeight: '600',
                    touchAction: 'manipulation'
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;