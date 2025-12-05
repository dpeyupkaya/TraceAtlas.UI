import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// DÜZELTME 1: Dosya yolunu standart hale getirdik. 
// Eğer locationService.js 'src/services/' altındaysa:
import { searchByTag } from ".././map/services/locationService.js"; 
// Veya 'src/components/map/services/' altındaysa:
// import { searchByTag } from "../map/services/locationService"; 

// --- ICON COMPONENTS ---
const Icon = ({ p, c }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={c}>{p}</svg>;
const SearchIcon = ({ c }) => <Icon c={c} p={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
const CloseIcon = ({ c }) => <Icon c={c} p={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
const MenuIcon = ({ o, c }) => <Icon c={c} p={o ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></>} />;

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) { return null; }
};

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // --- ARAMA STATE'LERİ ---
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]); 
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const [loading, setLoading] = useState(false); 
  // ------------------------

  const tabsRef = useRef([]);
  const searchRef = useRef(null); 
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  
  // Kullanıcı bilgisini çek
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded) setUser(decoded.unique_name || decoded.sub);
    }
  }, []);

  // --- DEBOUNCE ARAMA MANTIĞI ---
  useEffect(() => {
    // Input temizlenirse listeyi kapat
    if (!search || search.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
    }

    // 500ms bekle ve istek at
    const timer = setTimeout(async () => {
        setLoading(true);
        try {
            // DÜZELTME 2: searchByTag servisini çağırıyoruz
            const results = await searchByTag(search);
            // Gelen veri dizi mi kontrol et (Hata almamak için)
            if (Array.isArray(results)) {
                setSuggestions(results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Arama hatası:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, 500);

    return () => clearTimeout(timer); 
  }, [search]);

  // Sayfa dışına tıklanınca kapat
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
              setShowSuggestions(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (loc) => {
      setShowSuggestions(false);
      setSearch(""); // Seçim sonrası input temizlensin mi? (İsteğe bağlı)
      
      // Harita sayfasına yönlendir ve odaklan
      navigate('/map', { state: { focusedLocation: loc } });
  };

  const items = [
    { label: "Map", href: "/map" },
    { label: user || "Giriş Yap", href: user ? "/profile" : "/auth" }
  ];

  const activeIdx = items.findIndex(i => i.href === location.pathname);

  useEffect(() => {
    const el = tabsRef.current[activeIdx !== -1 ? activeIdx : 0];
    if (el) setTabStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeIdx, user]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] md:w-auto md:min-w-[650px] max-w-6xl">
      <div className="flex items-center justify-between p-2 pl-3 gap-4 bg-white/80 backdrop-blur-md border border-white/60 shadow-lg rounded-full">
        
        {/* ARAMA ALANI */}
        <div className="flex-1 group relative max-w-md" ref={searchRef}>
          <div className="absolute inset-0 bg-stone-100 rounded-full border border-stone-200 group-focus-within:bg-white group-focus-within:shadow-md transition-all" />
          <div className="relative flex items-center px-4 py-2.5 z-10">
            <SearchIcon c="w-5 h-5 text-stone-400 group-focus-within:text-emerald-700" />
            <input 
                type="text" 
                value={search} 
                onChange={(e) => { 
                    setSearch(e.target.value); 
                    // Eğer parent component de arama yapıyorsa ona bildir
                    if(onSearch) onSearch(e.target.value); 
                }}
                onFocus={() => search.length >= 2 && setShowSuggestions(true)}
                placeholder="Etiket giriniz(örn: doğa, kamp)..." 
                className="bg-transparent outline-none ml-3 text-sm font-semibold w-full text-stone-700 placeholder-stone-400" 
            />
            {search && <button onClick={() => { setSearch(""); setSuggestions([]); }} className="ml-2 text-stone-400 hover:text-red-500"><CloseIcon c="w-4 h-4" /></button>}
          </div>

          {/* --- AÇILIR LİSTE (DROPDOWN) --- */}
          {showSuggestions && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-200 z-50">
                {loading ? (
                    <div className="p-4 text-center text-stone-400 text-sm">Aranıyor...</div>
                ) : suggestions.length > 0 ? (
                    <ul>
                        {suggestions.map((loc) => (
                            <li 
                                key={loc.Id} 
                                onClick={() => handleResultClick(loc)}
                                className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-stone-50 last:border-0 transition-colors"
                            >
                                <div className="font-semibold text-stone-700 text-sm">{loc.Title}</div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {loc.LocationTags && loc.LocationTags.map((lt, idx) => (
                                        lt.Tag && (
                                            <span key={idx} className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-md">
                                                #{lt.Tag.Name}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 text-center text-stone-400 text-sm">Sonuç bulunamadı.</div>
                )}
            </div>
          )}
        </div>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden md:block h-8 w-px bg-stone-300 mx-2" />
        <div className="hidden md:flex relative bg-white/60 rounded-full p-1 shadow-sm border border-stone-200">
          <div className="absolute top-1 h-[calc(100%-8px)] bg-gradient-to-br from-[#183E3E] to-[#3A7B72] rounded-full transition-all duration-500 shadow-md" style={tabStyle} />
          <ul className="flex relative z-10">
            {items.map((item, i) => (
              <li key={i} ref={el => tabsRef.current[i] = el}>
                <button onClick={() => navigate(item.href)} className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${i === activeIdx ? "text-white" : "text-stone-700 hover:text-stone-900"}`}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBİL MENÜ BUTONU */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 text-stone-600 hover:bg-stone-100 rounded-full"><MenuIcon o={isOpen} c="w-6 h-6" /></button>
      </div>

      {/* MOBİL MENÜ İÇERİK */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-3 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl flex flex-col gap-1 md:hidden animate-in slide-in-from-top-2">
          {items.map((item, i) => (
            <button key={i} onClick={() => { navigate(item.href); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium flex justify-between group">
              {item.label} <span className="opacity-0 group-hover:opacity-100">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;