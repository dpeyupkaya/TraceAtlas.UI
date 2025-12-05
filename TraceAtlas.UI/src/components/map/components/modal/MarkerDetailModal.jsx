import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiUser, FiTag, FiShare2, FiMap, FiHeart, FiLoader, FiChevronLeft } from 'react-icons/fi';
import { addFavorite, getLocationById, createShareLink } from '../../services/locationService';
import { clearSelection } from '../../../../store/slices/mapSlice';

const MarkerDetailModal = () => {
  const dispatch = useDispatch();
  const { selectedLocation, isSidebarOpen } = useSelector((state) => state.map);

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addingFavorite, setAddingFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedLocation?.id) return;
      
      try {
        setLoading(true);
        const data = await getLocationById(selectedLocation.id);
        setDetails(data);
        setIsFavorite(data.isFavorite || false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (isSidebarOpen && selectedLocation) {
      fetchDetails();
    }
  }, [selectedLocation, isSidebarOpen]);

  const handleClose = () => {
    dispatch(clearSelection());
    setDetails(null);
  };

  if (!isSidebarOpen) return null;

  let finalImageSrc = null;
  if (details?.blobUrl && details.blobUrl.length > 0) {
    finalImageSrc = details.blobUrl[0]; 
  } 

  const handleShare = async () => {
    try {
      const res = await createShareLink(details.id);
      const shareUrl = res.url;  

      if (navigator.share) {
        await navigator.share({
          title: details.title,
          text: details.description,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Bağlantı kopyalandı!");
      }
    } catch (err) {
      console.error(err);
      alert("Paylaşım linki oluşturulamadı.");
    }
  };

  const handleDirections = () => window.open(`http://googleusercontent.com/maps.google.com/?q=${details.latitude},${details.longitude}`, '_blank');

  const handleFavoriteClick = async () => {
    if (addingFavorite) return;
    const token = localStorage.getItem('accessToken');
    if (!token) return alert("Lütfen giriş yapın.");
    
    setAddingFavorite(true);
    try {
      await addFavorite(details.id);
      setIsFavorite(true);
      alert("Favorilere eklendi!");
    } catch {
      alert("Zaten eklenmiş veya hata oluştu.");
    } finally {
      setAddingFavorite(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full z-[1500] pointer-events-none flex flex-col">
      <div 
        className={`
          pointer-events-auto
          h-full bg-white shadow-2xl 
          transition-transform duration-300 ease-in-out
          w-screen md:w-[400px] flex flex-col
          ${selectedLocation ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <FiChevronLeft size={24} />
          </button>
          <span className="font-semibold text-gray-700">Lokasyon Detayı</span>
          <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-64 gap-3">
                <FiLoader className="animate-spin text-teal-600" size={32} />
                <span className="text-gray-500 text-sm">Yükleniyor...</span>
             </div>
          ) : details ? (
            <div className="pb-8">
              {finalImageSrc ? (
                 <div className="relative h-64 w-full bg-gray-100">
                    <img 
                        src={finalImageSrc} 
                        alt={details.title} 
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.style.display='none'; }}
                    />
                 </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-emerald-200">
                  <FiMap size={48} />
                </div>
              )}

              <div className="px-6 py-6 flex flex-col gap-5">
                <div>
                   <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{details.title}</h1>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="p-1 bg-gray-100 rounded-full">
                        <FiUser size={14} />
                      </div>
                      <span>@{details.creatorUsername || "Gizli Kullanıcı"}</span>
                   </div>
                </div>

                <div className="flex gap-2">
                    <button 
                      onClick={handleDirections} 
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FiMap /> Yol Tarifi
                    </button>
                    <button 
                       onClick={handleFavoriteClick}
                       disabled={addingFavorite || isFavorite}
                       className={`w-12 flex items-center justify-center rounded-xl border transition-colors ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                    >
                       <FiHeart fill={isFavorite ? "currentColor" : "none"} size={20} />
                    </button>
                    <button 
                       onClick={handleShare}
                       className="w-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 transition-colors"
                    >
                       <FiShare2 size={20} />
                    </button>
                </div>

                <div>
                   <h3 className="text-sm font-semibold text-gray-900 mb-2">Açıklama</h3>
                   <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {details.description || "Açıklama girilmemiş."}
                   </p>
                </div>

                {details.tags?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Etiketler</h3>
                    <div className="flex flex-wrap gap-2">
                      {details.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                           #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Veri bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkerDetailModal;