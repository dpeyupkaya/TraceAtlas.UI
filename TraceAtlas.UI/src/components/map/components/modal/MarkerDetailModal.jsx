import React from 'react';
import { FiX, FiUser, FiCalendar, FiTag, FiShare2, FiMap } from 'react-icons/fi';

const MarkerDetailModal = ({ location, onClose }) => {
  if (!location) return null;

  const rawImage = location.imageBase64 || location.image;
  const imageSrc = rawImage
    ? (rawImage.startsWith('http') || rawImage.startsWith('data:') || rawImage.startsWith('/')
      ? rawImage
      : `data:image/jpeg;base64,${rawImage}`)
    : null;

  const formatDate = (dateString) => {
    return new Date(dateString || Date.now()).toLocaleDateString('tr-TR', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: location.title,
        text: location.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Bağlantı kopyalandı!");
    }
  };

  const handleDirections = () => {
    window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full shadow-md transition-all"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        {imageSrc ? (
          <div className="h-72 w-full relative">
            <img 
              src={imageSrc} 
              alt={location.title} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A3A]/80 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-md">{location.title}</h2>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <FiUser /> <span>@{location.creatorUsername || 'Gezgin'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <FiCalendar /> <span>{formatDate(location.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-40 w-full bg-gradient-to-r from-[#1E3A3A] to-[#2D554F] relative p-6 flex items-end">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">{location.title}</h2>
              <div className="flex items-center gap-2 text-sm bg-white/20 w-fit px-3 py-1 rounded-full">
                <FiUser /> <span>@{location.creatorUsername || 'Gezgin'}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-3 mb-6">
            <button 
              onClick={handleDirections}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1E3A3A] hover:bg-[#2D554F] text-white font-medium rounded-xl shadow-lg shadow-[#1E3A3A]/20 transition-all active:scale-95"
            >
              <FiMap /> <span>Yol Tarifi</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all active:scale-95"
            >
              <FiShare2 /> <span>Paylaş</span>
            </button>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-6 text-gray-700 leading-relaxed text-lg">
            {location.description}
          </div>
          
          {location.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
                {location.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-lg text-sm font-medium">
                    <FiTag size={14} /> <span>{tag}</span>
                  </div>
                ))}
            </div>
          )}

          {!imageSrc && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <FiCalendar className="text-[#10B981]" size={20} />
              <div>
                <p className="text-sm text-gray-500">Eklenme Tarihi</p>
                <p className="text-gray-800 font-medium">{formatDate(location.createdAt)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkerDetailModal;