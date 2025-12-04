import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiTag, FiShare2, FiMap, FiHeart, FiLoader } from 'react-icons/fi';
// getLocationById fonksiyonunu servisten çekiyoruz
import { addFavorite, getLocationById } from '../../services/locationService.js';

const MarkerDetailModal = ({ location, onClose, onFavoriteAdded }) => {
  // location prop'u sadece ID ve Koordinat içeriyor (MapDto).
  // Detayları (Title, Desc, Image) sunucudan çekeceğiz.
  
  const [details, setDetails] = useState(null); // Detay verisi
  const [loading, setLoading] = useState(true); // Yükleniyor mu?
  const [addingFavorite, setAddingFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Modal açılınca veriyi çek
  useEffect(() => {
    const fetchDetails = async () => {
      if (!location?.id) return;
      
      try {
        setLoading(true);
        // Backend'deki GetLocationByIdHandler'ı tetikliyoruz
        const data = await getLocationById(location.id);
        setDetails(data);
        setIsFavorite(data.isFavorite || false);
      } catch (error) {
        console.error("Detaylar çekilemedi", error);
        alert("Bağlantı hatası: Detaylar yüklenemedi.");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [location]);

  if (!location) return null;

  // Yükleme ekranı
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
         <div className="bg-white p-8 rounded-2xl flex flex-col items-center gap-3">
            <FiLoader className="animate-spin text-teal-600" size={40} />
            <span className="text-gray-600 font-medium">Bilgiler getiriliyor...</span>
         </div>
      </div>
    );
  }

  // Veri gelmediyse boş dön
  if (!details) return null;

  // --- RESİM URL MANTIĞI (Azure Blob Listesi) ---
  let finalImageSrc = null;
  if (details.blobUrl && details.blobUrl.length > 0) {
    finalImageSrc = details.blobUrl[0]; 
  } 
  // ----------------------------------------------

  const handleShare = () => navigator.share 
    ? navigator.share({ title: details.title, text: details.description, url: window.location.href }).catch(console.error)
    : (navigator.clipboard.writeText(window.location.href), alert("Bağlantı kopyalandı!"));

  const handleDirections = () => window.open(`http://maps.google.com/maps?daddr=${details.latitude},${details.longitude}`, '_blank');

  const handleFavoriteClick = async () => {
    if (addingFavorite) return;
    const token = localStorage.getItem('accessToken');
    if (!token) return alert("Lütfen giriş yapın.");
    
    setAddingFavorite(true);
    try {
      await addFavorite(details.id);
      setIsFavorite(true);
      alert("Favorilere eklendi!");
        if (onFavoriteAdded) onFavoriteAdded(details.id);
    } catch {
      alert("Zaten eklenmiş veya hata oluştu.");
    } finally {
      setAddingFavorite(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md z-10" onClick={onClose}><FiX size={20} /></button>

        {finalImageSrc && (
            <img 
                src={finalImageSrc} 
                alt={details.title} 
                className="h-72 w-full object-cover" 
                onError={(e) => { e.target.style.display='none'; }}
            />
        )}

        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{details.title}</h2>
          </div>
          <div className="flex gap-3 flex-wrap text-sm text-gray-600">
            <span className="flex items-center gap-1"><FiUser /> @{details.creatorUsername || "Bilinmiyor"}</span>
          </div>

          <p className="bg-gray-50 p-4 rounded-xl border border-gray-100">{details.description}</p>

          {details.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {details.tags.map((tag,i) => <span key={i} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm"><FiTag size={14}/>{tag}</span>)}
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