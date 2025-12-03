import React, { useState } from 'react';
import { FiX, FiUser, FiCalendar, FiTag, FiShare2, FiMap, FiHeart } from 'react-icons/fi';
import { addFavorite } from '../../services/locationService.js';

const MarkerDetailModal = ({ location, onClose, onFavoriteAdded }) => {
  if (!location) return null;

  const [addingFavorite, setAddingFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(location.isFavorite || false);

  const imageSrc = location.imageBase64 || location.image
    ? (location.imageBase64?.startsWith('data:') ? location.imageBase64 : `data:image/jpeg;base64,${location.imageBase64 || location.image}`)
    : null;

  

  const handleShare = () => navigator.share 
    ? navigator.share({ title: location.title, text: location.description, url: window.location.href }).catch(console.error)
    : (navigator.clipboard.writeText(window.location.href), alert("Bağlantı kopyalandı!"));

  const handleDirections = () => window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank');

  const handleFavoriteClick = async () => {
    if (addingFavorite) return;
    const token = localStorage.getItem('accessToken');
    if (!token) return alert("Lütfen giriş yapın.");
    
    setAddingFavorite(true);
    try {
      await addFavorite(location.id);
      setIsFavorite(true);
      alert("Favorilere eklendi!");
        if (onFavoriteAdded) onFavoriteAdded(location.id); // Parent component'i bilgilendir
    } catch {
      alert("Zaten eklenmiş veya hata oluştu.");
    } finally {
      setAddingFavorite(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md" onClick={onClose}><FiX size={20} /></button>

        {imageSrc && <img src={imageSrc} alt={location.title} className="h-72 w-full object-cover" onError={e=>e.target.style.display='none'}/>}

        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{location.title}</h2>
          </div>
          <div className="flex gap-3 flex-wrap text-sm text-gray-600">
            <span className="flex items-center gap-1"><FiUser /> @{location.creatorUsername}</span>
        
          </div>

          <p className="bg-gray-50 p-4 rounded-xl border border-gray-100">{location.description}</p>

          {location.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {location.tags.map((tag,i) => <span key={i} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm"><FiTag size={14}/>{tag}</span>)}
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button onClick={handleDirections} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-700 text-white rounded-xl"> <FiMap /> Yol Tarifi </button>
            <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl"> <FiShare2 /> Paylaş </button>
            <button 
              onClick={handleFavoriteClick} 
              disabled={addingFavorite || isFavorite} 
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${isFavorite ? 'bg-gray-300 text-white' : 'bg-yellow-500 text-white'}`}
            > 
              <FiHeart /> {isFavorite ? 'Favori' : 'Favori Ekle'} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerDetailModal;
