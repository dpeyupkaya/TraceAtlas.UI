import React from 'react';

// Kapatma ikonu
const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Kullanıcı ikonu
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

// Yer işareti ikonu
const LocationIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

// Takvim ikonu
const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

// Etiket İkonu
const TagIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581a3 3 0 004.242 0l4.318-4.318a3 3 0 000-4.242L11.688 3.129A3 3 0 009.568 2.25H5.25zM7.5 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const MarkerDetailModal = ({ location, onClose }) => {
  if (!location) return null;

  let imageSrc = null;

  if (location.imageBase64) {
    if (location.imageBase64.startsWith('/')) {
      imageSrc = location.imageBase64;
    } else if (location.imageBase64.startsWith('http')) {
       imageSrc = location.imageBase64;
    } else if (location.imageBase64.startsWith('data:image')) {
      imageSrc = location.imageBase64;
    } else {
      imageSrc = `data:image/jpeg;base64,${location.imageBase64}`;
    }
  }

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900/80 backdrop-blur-lg flex items-center justify-center z-[9999] p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[95vh] animate-scaleIn transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 z-20 p-3 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm border border-gray-200/50"
          onClick={onClose}
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {imageSrc ? (
          <div className="h-80 w-full relative bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={imageSrc}
              alt={location.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{location.title}</h2>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <UserIcon className="w-4 h-4" />
                  <span className="font-medium">@{location.creatorUsername}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{formatDate(location.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-teal-500 relative p-6 flex items-end">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-3">{location.title}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <UserIcon className="w-4 h-4" />
                  <span className="font-medium">@{location.creatorUsername}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {imageSrc && location.latitude && location.longitude && (
            <div className="px-6 pt-6">
              <div className="flex items-center gap-2 text-gray-600 bg-gray-100/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50">
                <LocationIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-mono">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="mb-6">
              {/* Açıklama */}
              <div className="text-gray-700 leading-relaxed text-lg bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                <p className="whitespace-pre-line">{location.description}</p>
              </div>
              
              {/* --- YENİ EKLENEN KISIM: ETİKETLER --- */}
              {location.tags && location.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                   {location.tags.map((tag, index) => (
                     <div key={index} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm font-medium">
                        <TagIcon className="w-3.5 h-3.5" />
                        <span>{tag}</span>
                     </div>
                   ))}
                </div>
              )}
              {/* --- BİTİŞ --- */}

            </div>

            {!imageSrc && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-200/50">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Eklenme Tarihi</p>
                    <p className="text-xs text-green-800">{formatDate(location.createdAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MarkerDetailModal;