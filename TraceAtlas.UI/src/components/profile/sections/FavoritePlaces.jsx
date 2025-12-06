import React, { useState, useEffect } from 'react';
import MarkerDetailModal from '../../map/components/modal/MarkerDetailModal';
import profileService  from '../../../services/profileService';
import { removeFavorite } from '../../map/services/locationService.js';
import { FiEye, FiTrash2, FiMapPin } from 'react-icons/fi';

const FavoritePlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await profileService.getFavorites();
        
        const mappedData = data.map(item => ({
          id: item.locationId,      // Modalın veri çekmesi için şart
          title: item.title,        // Kartta göstermek için
         
        }));

        setFavorites(mappedData);
      } catch (error) {
        console.error("Favoriler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveClick = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Bu mekanı favorilerden çıkarmak istediğine emin misin?")) return;

    try {
      await removeFavorite(id);
      setFavorites(prev => prev.filter(place => place.id !== id));
    } catch (error) {
      alert("Hata oluştu.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A3A]"></div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#1E3A3A]">Favori Mekanlarım</h2>
        <span className="px-3 py-1 rounded-full bg-[#1E3A3A]/5 text-[#1E3A3A] text-sm font-semibold border border-[#1E3A3A]/10">
          {favorites.length} Mekan
        </span>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((place) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedPlace(place)} // Sadece eldeki veriyi (ID ve Title) modala atıyoruz
              className="group bg-white rounded-2xl shadow-sm  border-gray-10flex flex-col cursor-pointer p-6 relative overflow-hidden"
            >
              <div className="flex flex-col flex-grow relative z-10">
                <div className="flex items-center gap-3 mb-4">
                
                    <div>
                         <h3 className="font-bold text-lg text-[#1E3A3A]transition-colors line-clamp-1">
                            {place.title}
                         </h3>
                      
                    </div>
                </div>


                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button 
                    onClick={(e) => {
                         e.stopPropagation();
                         setSelectedPlace(place);
                    }}
                    className="flex-1 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FiEye /> İncele
                  </button>

                  <button 
                    onClick={(e) => handleRemoveClick(e, place.id)}
                    className="w-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
          Favori mekan bulunamadı.
        </div>
      )}

      {/* MODAL ÇAĞRISI:
          isOpen={true} -> selectedPlace doluysa modalı render et ve aç.
          location={selectedPlace} -> İçinde ID var, modal geri kalan her şeyi kendi çekecek.
      */}
      {selectedPlace && (
        <MarkerDetailModal 
          isOpen={true} 
          location={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}
    </div>
  );
};

export default FavoritePlaces;