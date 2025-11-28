import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GooeyNav = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

  useEffect(() => {
    const found = items.findIndex((i) => i.href === location.pathname);
    if (found !== -1) setActiveIndex(found);
  }, [location.pathname]);

  useEffect(() => {
    const tab = tabsRef.current[activeIndex];
    if (tab) {
      setTabStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth
      });
    }
  }, [activeIndex]);

  const handleClick = (e, i, href) => {
    e.preventDefault();
    setActiveIndex(i);
    navigate(href);
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-full p-1 border border-stone-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center">
      
      {/* Glow Blur Capsule */}
      <div
        className="
          absolute top-1 h-[calc(100%-8px)]
          rounded-full
          bg-gradient-to-br from-[#183E3E] via-[#225650] to-[#3A7B72]
          shadow-[0_0_16px_rgba(34,85,80,0.55)]
          transition-all duration-500 ease-[cubic-bezier(.25,1,.30,1)]
        "
        style={{
          left: tabStyle.left,
          width: tabStyle.width
        }}
      />

      <ul className="flex list-none m-0 p-0 relative z-10">
        {items.map((item, i) => {
          const active = i === activeIndex;
          return (
            <li key={i} ref={(el) => (tabsRef.current[i] = el)}>
              <button
                onClick={(e) => handleClick(e, i, item.href)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 
                  ${active ? "text-white" : "text-stone-700 hover:text-stone-950"}
                `}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GooeyNav;
