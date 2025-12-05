import React from 'react';

const EyeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const PhotoIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const PinIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const MarkerPopup = ({ location, onOpenDetail }) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenDetail(location);
  };

  const displayTitle = location.title 
    ? location.title 
    : (location.hasImage ? "Fotoğraflı Konum" : "İşaretlenmiş Konum");

  const displaySubtitle = location.title 
    ? "Detaylar için tıklayın" 
    : "Detayları görmek için tıklayın...";

  return (
    <div className="w-56 bg-white rounded-lg shadow-xl border border-emerald-100 overflow-hidden">
      
      <div className="p-3">
        
        <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-full ${location.hasImage ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-600'}`}>
                {location.hasImage ? <PhotoIcon className="w-4 h-4" /> : <PinIcon className="w-4 h-4" />}
            </div>
            <div>
                <h3 className="font-bold text-slate-800 text-sm leading-tight">
                {displayTitle}
                </h3>
            </div>
        </div>
        
        <p className="text-xs text-slate-500 mb-3 ml-1">
            {displaySubtitle}
        </p>

        <button 
          onClick={handleDetailClick}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-xs font-semibold transition-colors shadow-sm"
        >
          <EyeIcon className="w-3.5 h-3.5" />
          İncele
        </button>
      </div>

      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-400"></div>
    </div>
  );
};

export default MarkerPopup;