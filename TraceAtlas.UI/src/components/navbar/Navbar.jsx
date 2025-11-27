// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import GooeyNav from "../../bits/GooeyNav";
import MobileMenu from "./MobileMenu";

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MenuToggleIcon = ({ isOpen, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const Navbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = [
    { label: "Home", href: "/" },
    { label: "Map", href: "/map" },
    { label: "Profile", href: "/profile" },
  ];

  
const natureColors = [
    "#059669", // Zümrüt Yeşili
    "#84cc16", // Lime Yeşili
    "#eab308", // Güneş Sarısı
    "#f97316", // Gün Batımı Turuncusu
    "#e11d48", // Yabani Gül Kırmızısı
    "#6366f1", // Alacakaranlık İndigo
    "#06b6d4", // Okyanus Mavisi
  ];

  // Daha ince, zarif cam efekti
  const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.75)", // Opaklık düşürüldü
    backdropFilter: "blur(16px) saturate(180%)", 
    border: "1px solid rgba(255, 255, 255, 0.4)", // Kenarlık inceltildi
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.05)", 
    borderRadius: "9999px",
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchText(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-[90vw] md:w-auto md:min-w-[600px] max-w-5xl transition-all duration-500 ease-out">
      
      <div 
        style={glassStyle} 
        className="flex items-center justify-between p-1.5 pl-2 relative w-full"
      >
        
       
        <div className="flex-1 flex items-center group relative w-full mr-2">
            
          
          <div className="absolute inset-0 bg-stone-100/80 rounded-full transition-all duration-500 ease-out 
                          group-focus-within:bg-white group-focus-within:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] 
                          group-focus-within:scale-[1.02] border border-transparent group-focus-within:border-emerald-200">
          </div>

          <div className="relative flex items-center w-full px-3 py-2 z-10">
            <SearchIcon className="w-5 h-5 text-stone-400 group-focus-within:text-emerald-600 transition-colors duration-300 shrink-0" />
            
            <input 
              type="text" 
              value={searchText}
              onChange={handleSearch}
              placeholder="Keşfet..."
              className="bg-transparent border-none outline-none ml-2 text-stone-700 placeholder-stone-400 text-sm font-medium w-full min-w-[50px] transition-colors"
            />
            
            {searchText && (
              <button 
                onClick={() => { setSearchText(""); if(onSearch) onSearch(""); }}
                className="ml-2 p-1 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" /></svg>
              </button>
            )}
          </div>
        </div>

        
        <div className="h-6 w-px bg-stone-200/60 mx-1 hidden md:block"></div>

        <div className="hidden md:flex flex-shrink-0 items-center justify-end px-1">
          <GooeyNav
            items={items}
            colors={natureColors} 
          />
        </div>

        <div className="md:hidden flex-shrink-0 ml-1">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2.5 rounded-full transition-all active:scale-90 ${isMobileMenuOpen ? 'bg-stone-100 text-stone-800' : 'bg-transparent text-stone-600 hover:bg-emerald-50 hover:text-emerald-700'}`}
          >
            <MenuToggleIcon isOpen={isMobileMenuOpen} className="w-6 h-6" />
          </button>
        </div>

      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        items={items} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default Navbar;