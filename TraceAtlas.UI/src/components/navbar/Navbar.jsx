import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchByTag } from ".././map/services/locationService.js"; 
import { Search, X, MapPin, User, Menu, Compass, ChevronRight } from 'lucide-react';

const Navbar = () => {
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
    if (location.state && location.state.autoSearch) {
      setSearchQuery(location.state.autoSearch);
      window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const decoded = JSON.parse(jsonPayload);
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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-2xl font-sans">
      
      <div className="relative bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-2 pr-3 pl-6 flex items-center justify-between gap-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        <div onClick={() => navigate('/home')} className="flex items-center gap-2 cursor-pointer group shrink-0 select-none">
          
          <span className="hidden sm:block font-bold text-lg text-zinc-800 tracking-tight group-hover:text-black transition-colors">
            TraceAtlas
          </span>
        </div>

        <div className="flex-1 max-w-xl relative group" ref={searchRef}>
          <div className={`
            flex items-center transition-all duration-300 rounded-full px-4 py-2.5 w-full
            ${searchQuery || showSuggestions 
                ? 'bg-white shadow-lg ring-1 ring-black/5' 
                : 'bg-zinc-100/50 hover:bg-zinc-100'
            }
          `}>
            <Search className={`w-4 h-4 transition-colors ${searchQuery ? 'text-emerald-600' : 'text-zinc-400'}`} />
            
            <input 
              className="bg-transparent border-none outline-none w-full ml-3 text-sm font-medium text-zinc-700 placeholder:text-zinc-400 placeholder:font-normal"
              placeholder="Rota, şehir veya etiket ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
            />
            
            {searchQuery && (
               <button 
                 onClick={() => {setSearchQuery(""); setSuggestions([])}} 
                 className="p-1 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-red-500 transition-colors"
               >
                 <X size={14}/>
               </button>
            )}
          </div>

          <div className={`
              absolute top-full left-0 w-full mt-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden transition-all duration-300 origin-top
              ${showSuggestions ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'}
          `}>
            {loading ? (
              <div className="p-8 text-center">
                 <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"/>
                 <span className="text-xs text-zinc-400 font-medium">Harita taranıyor...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                 <div className="px-5 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Sonuçlar</div>
                 {suggestions.map((loc, idx) => (
                    <div key={loc.Id || idx} onClick={() => handleResultClick(loc)} className="group px-5 py-3 hover:bg-zinc-50 cursor-pointer flex items-center justify-between transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                              <MapPin size={14} />
                           </div>
                           <div>
                              <div className="text-sm font-semibold text-zinc-700 group-hover:text-black">{loc.Title}</div>
                              <div className="flex gap-2 mt-0.5">
                                 {loc.LocationTags?.slice(0,2).map((t,i) => t.Tag && (
                                   <span key={i} className="text-[10px] text-zinc-500 font-medium">#{t.Tag.Name}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-1 transition-all"/>
                    </div>
                 ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-zinc-500">
                Keşfedilecek yeni bir yer yok mu? Hemen ekle.
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button 
             onClick={() => navigate('/map')} 
             className="px-5 py-2.5 rounded-full text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
          >
            Harita
          </button>
          
          {user ? (
             <button 
                onClick={() => navigate('/profile')} 
                className="pl-3 pr-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 shadow-lg shadow-zinc-200 transition-all flex items-center gap-3 hover:shadow-xl hover:-translate-y-0.5"
             >
                
                <span className="truncate max-w-[100px]">{user}</span>
             </button>
          ) : (
             <button 
                onClick={() => navigate('/auth')} 
                className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 shadow-lg shadow-zinc-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
             >
                Giriş Yap
             </button>
          )}
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 hover:bg-zinc-100 rounded-full text-zinc-800 transition-colors">
           {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      <div className={`
          absolute top-full left-0 w-full mt-3 p-2 bg-white/90 backdrop-blur-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl overflow-hidden transition-all duration-300 origin-top z-[-1]
          ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible max-h-96' : 'opacity-0 -translate-y-4 invisible max-h-0'}
      `}>
          <div className="flex flex-col gap-1 p-1">
            <button onClick={() => navigate('/map')} className="w-full text-left px-4 py-3.5 rounded-2xl hover:bg-zinc-100 text-zinc-700 font-medium transition-colors flex items-center gap-3">
                <Compass size={18} /> Harita
            </button>
            
            {user ? (
               <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-3.5 rounded-2xl bg-zinc-900 text-white font-medium flex items-center gap-3 mt-1">
                 <User size={18} /> {user}
               </button>
            ) : (
               <button onClick={() => navigate('/auth')} className="w-full text-left px-4 py-3.5 rounded-2xl bg-black text-white font-medium mt-1">
                 Giriş Yap
               </button>
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navbar;