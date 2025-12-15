import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchByTag } from ".././map/services/locationService.js"; 
import { Search, X, MapPin, User, LogIn, Compass, Menu } from 'lucide-react';

const Navbar = ({ onSearch, searchInput }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); 
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const decoded = JSON.parse(jsonPayload);
        // Burada user değişkenine ismi atıyoruz
        setUser(decoded.unique_name || decoded.sub);
      } catch (e) { setUser(null); }
    }
  }, []);

  
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
        setSuggestions([]); setShowSuggestions(false); return;
    }
    const timer = setTimeout(async () => {
        setLoading(true);
        try {
            const results = await searchByTag(searchQuery);
            setSuggestions(Array.isArray(results) ? results : []);
            setShowSuggestions(true);
        } catch (e) { setSuggestions([]); } 
        finally { setLoading(false); }
    }, 400);
    return () => clearTimeout(timer); 
  }, [searchQuery]);

  // Dışarı tıklayınca kapat
  useEffect(() => {
      const handleClickOutside = (e) => {
          if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (loc) => {
      setShowSuggestions(false); setSearchQuery(""); setMobileMenuOpen(false);
      navigate('/map', { state: { focusedLocation: loc } });
  };

  return (
    // NAVBAR WRAPPER: Tepede sabit, ortalanmış "Ada"
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[95%] max-w-5xl">
      
      <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl shadow-black/5 rounded-2xl flex items-center justify-between p-2 pl-4 gap-4 transition-all">
        
        {/* 1. SOL: LOGO */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group shrink-0">
          <span className="hidden sm:block font-bold text-lg text-slate-800 tracking-tight">TraceAtlas</span>
        </div>

        {/* 2. ORTA: ARAMA ÇUBUĞU */}
        <div className="flex-1 max-w-lg relative" ref={searchRef}>
          <div className="flex items-center bg-slate-100/80 hover:bg-slate-100 border border-transparent focus-within:border-emerald-500/50 focus-within:bg-white focus-within:shadow-md transition-all rounded-xl px-3 py-2.5">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              className="bg-transparent border-none outline-none w-full ml-3 text-sm font-medium text-slate-700 placeholder:text-slate-400"
              placeholder="Rota veya konum ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
            />
            {searchQuery && (
               <button onClick={() => {setSearchQuery(""); setSuggestions([])}} className="p-1 hover:bg-slate-200 rounded-full text-slate-400"><X size={14}/></button>
            )}
          </div>

          {/* Sonuçlar Listesi */}
          {showSuggestions && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden max-h-[350px] overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-xs text-slate-400">Aranıyor...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((loc) => (
                  <div key={loc.Id} onClick={() => handleResultClick(loc)} className="px-4 py-3 hover:bg-emerald-5 cursor-pointer border-b border-slate-50 last:border-0 flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-700">{loc.Title}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                           {loc.LocationTags?.slice(0,3).map((t,i) => t.Tag && <span key={i} className="text-[10px] bg-slate-100 px-1.5 rounded text-slate-500">#{t.Tag.Name}</span>)}
                        </div>
                      </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">Sonuç bulunamadı.</div>
              )}
            </div>
          )}
        </div>

        {/* 3. SAĞ: BUTONLAR (Desktop) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button onClick={() => navigate('/map')} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Harita</button>
          
          {user ? (
             // DEĞİŞİKLİK BURADA YAPILDI: "Profilim" yerine {user} yazıldı
             <button onClick={() => navigate('/profile')} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all flex items-center gap-2 max-w-[200px]">
                <User size={16} /> 
                <span className="truncate">{user}</span>
             </button>
          ) : (
             <button onClick={() => navigate('/auth')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">
                Giriş Yap
             </button>
          )}
        </div>

        {/* Mobil Menü Butonu */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 bg-slate-100 rounded-lg text-slate-600">
           {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* MOBİL MENÜ (Aşağı açılır) */}
      {mobileMenuOpen && (
        <div className="mt-2 p-2 bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl flex flex-col gap-1 md:hidden animate-in slide-in-from-top-2">
            <button onClick={() => navigate('/map')} className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 text-slate-700 font-medium">Harita</button>
            
            {user ? (
               // DEĞİŞİKLİK BURADA DA YAPILDI
               <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 text-white font-medium flex items-center gap-2">
                 <User size={16} /> {user}
               </button>
            ) : (
               <button onClick={() => navigate('/auth')} className="w-full text-left px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium">Giriş Yap</button>
            )}
        </div>
      )}
    </div>
  );
};

export default Navbar;