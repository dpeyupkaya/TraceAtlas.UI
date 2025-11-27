import React, { useState, useEffect } from 'react';
import MarkerForm from '../Form/MarkerForm';
import * as locationService from '../../services/locationService';

const AddMarkerModal = ({ position, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await locationService.createLocation({ 
        ...formData, 
        latitude: position.lat, 
        longitude: position.lng 
      });
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-slate-950/60 backdrop-blur-sm opacity-100' : 'bg-transparent opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative w-full max-w-lg bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'
        }`}
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </span>
                <h2 className="text-xl font-semibold text-white tracking-tight">Konum İşaretle</h2>
              </div>
              <p className="text-slate-400 text-sm">Haritaya yeni bir keşif noktası ekleyin.</p>
            </div>

            <button 
              onClick={onClose}
              className="group p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Enlem</span>
              <span className="text-sm font-mono text-emerald-400">{position.lat.toFixed(6)}</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Boylam</span>
              <span className="text-sm font-mono text-emerald-400">{position.lng.toFixed(6)}</span>
            </div>
          </div>
        </div>

        <div className="relative px-8 pb-8">
          <MarkerForm onSubmit={handleSubmit} loading={loading} />

          <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-white/5">
            <button 
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
            >
              Vazgeç
            </button>
            <button 
              type="submit"
              form="marker-form"
              disabled={loading}
              className="relative overflow-hidden group px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-sm shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <span>Kaydet</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMarkerModal;