// FavoritePlaces.jsx
import React, { useState, useEffect } from 'react';
import MarkerDetailModal from '../../map/components/modal/MarkerDetailModal';
import profileService  from '../../../services/profileService';
import {removeFavorite} from '../../map/services/locationService.js';

const FavoritePlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await profileService.getFavorites();
       const mappedData = data.map(item => ({
  id: item.locationId,
  title: item.title,
  description: item.description,
  latitude: item.latitude,
  longitude: item.longitude,
  creatorUsername: item.creatorUsername,
  createdAt: item.createdAt,
  tags: item.tags,
  isFavorite: true
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

  const handleCardClick = (place) => setSelectedPlace(place);

  const handleRemoveClick = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Bu mekanı favorilerden çıkarmak istediğine emin misin?")) return;

    try {
      await removeFavorite(id);
      setFavorites(prev => prev.filter(place => place.id !== id));
    } catch (error) {
      alert("Favorilerden çıkarılırken bir sorun oluştu.");
      console.error(error);
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
              onClick={() => handleCardClick(place)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#10B981]/30 flex flex-col cursor-pointer p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1E3A3A]/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-all group-hover:from-[#10B981]/10"></div>
              
              <div className="flex flex-col flex-grow relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A3A]/5 flex items-center justify-center text-[#1E3A3A] mb-4 group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-xl text-[#1E3A3A] mb-2 group-hover:text-[#10B981] transition-colors line-clamp-1">{place.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.327-1.765C15.33 14.988 17 12.493 17 9A7 7 0 103 9c0 3.493 1.67 5.988 3.302 7.622.883.799 1.707 1.381 2.327 1.765.311.193.57.337.757.433l.281.14.018.008.006.003zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{place.location}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{place.description}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button 
                    onClick={(e) => handleRemoveClick(e, place.id)}
                    className="w-full py-2.5 px-4 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover/btn:scale-110 transition-transform">
                      <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.16-1.1c-2.8-2.153-3.987-3.649-4.317-5.175-.309-1.428.13-2.99 1.41-3.972 1.188-.912 2.932-.868 4.09.27l.35.34.35-.34c1.158-1.138 2.902-1.182 4.09-.27 1.28.982 1.72 2.544 1.41 3.972-.33 1.526-1.517 3.022-4.317 5.175a20.759 20.759 0 01-1.178 1.113l-.002.002z" />
                    </svg>
                    <span>Favorilerden Çıkar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-500">Henüz favori mekanın yok.</p>
        </div>
      )}

      {selectedPlace && (
        <MarkerDetailModal 
          location={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
          onFavoriteAdded={(newLocationId) => {
            setFavorites(prev => {
              const exists = prev.some(f => f.id === newLocationId);
              if (exists) return prev;
              return [...prev, { ...selectedPlace, id: newLocationId, isFavorite: true }];
            });
          }}
        />
      )}
    </div>
  );
};

export default FavoritePlaces;
