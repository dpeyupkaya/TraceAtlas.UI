import React, { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { useNavigate, useLocation } from "react-router-dom";

/* --- ICONS --- */
const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" className={className} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" className={className} viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const MenuToggleIcon = ({ isOpen, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" className={className} viewBox="0 0 24 24">
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </>
    ) : (
      <>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </>
    )}
  </svg>
);

/* --- YENİ MODERN GOOEYNAV (ENTEGRE) --- */
const GooeyNav = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef([]);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const idx = items.findIndex(i => i.href === location.pathname);
    if (idx !== -1) setActiveIndex(idx);
  }, [location.pathname]);

  useEffect(() => {
    const tab = tabsRef.current[activeIndex];
    if (tab) {
      setTabStyle({ left: tab.offsetLeft, width: tab.offsetWidth });
    }
  }, [activeIndex]);

  return (
    <div className="relative bg-white/60 backdrop-blur-xl border border-stone-200 rounded-full p-1 flex shadow-sm">
      
      <div
        className="absolute top-1 h-[calc(100%-8px)]
                   bg-gradient-to-br from-[#183E3E] via-[#225650] to-[#3A7B72]
                   rounded-full shadow-[0_0_14px_rgba(32,75,70,0.45)]
                   transition-all duration-500 ease-[cubic-bezier(.25,1,.30,1)]"
        style={{ left: tabStyle.left, width: tabStyle.width }}
      />

      <ul className="flex relative z-10">
        {items.map((item, i) => {
          const active = i === activeIndex;
          return (
            <li key={i} ref={el => tabsRef.current[i] = el}>
              <button
                onClick={() => navigate(item.href)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all 
                  ${active ? "text-white" : "text-stone-700 hover:text-stone-900"}`}
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

/* --- ANA NAVBAR --- */
const Navbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = [
    { label: "Home", href: "/home" },
    { label: "Map", href: "/map" },
    { label: "Profile", href: "/profile" }
  ];

  const glassStyle = {
    backgroundColor: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 8px 32px -4px rgba(0,0,0,0.1)",
    borderRadius: "9999px"
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] md:w-auto md:min-w-[650px] max-w-6xl transition-all">
      
      <div style={glassStyle} className="flex items-center justify-between p-2 pl-3 gap-4">

        {/* Search */}
        <div className="flex-1 group relative max-w-md">
          <div className="absolute inset-0 bg-stone-100 rounded-full border border-stone-200/60
                          group-focus-within:bg-white group-focus-within:border-[#2D554F]/30
                          group-focus-within:shadow-[0_4px_20px_-4px_rgba(45,85,79,0.15)] transition-all" />
          
          <div className="relative flex items-center w-full px-4 py-2.5 z-10">
            <SearchIcon className="w-5 h-5 text-stone-400 group-focus-within:text-[#2D554F] transition-colors" />
            
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Keşfet..."
              className="bg-transparent outline-none ml-3 text-sm font-semibold w-full text-stone-700 placeholder-stone-400"
            />

            {searchText && (
              <button onClick={() => { setSearchText(""); onSearch && onSearch(""); }}
                className="ml-2 p-1 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Ayırıcı */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent hidden md:block" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <GooeyNav items={items} />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-3 rounded-full transition-all active:scale-95 ${
              isMobileMenuOpen ? "bg-stone-100 text-stone-800 rotate-90" :
              "text-stone-600 hover:bg-stone-100 hover:text-[#2D554F]"
            }`}
          >
            <MenuToggleIcon isOpen={isMobileMenuOpen} className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        items={items}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default Navbar;
