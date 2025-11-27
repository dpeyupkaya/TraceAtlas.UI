// components/map/components/MapContainer.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import AddMarkerButton from '../components/button/AddMarkerButton';
import AddLocation from '../components/button/AddLocation';
import AddMarkerModal from './modal/AddMarkerModal';
import MarkerDetailModal from './modal/MarkerDetailModal'; 
import MarkerPopup from './marker/MarkerPopup';
import { useLocations } from '../hooks/useLocations';

// Haritayı uçurmak için yardımcı bileşen
const FlyToLocation = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 15, {
        animate: true,
        duration: 1.5 // Uçuş süresi (saniye)
      });
    }
  }, [center, map]);

  return null;
};

// Harita tıklamalarını dinleyen bileşen
const MapClickHandler = ({ onMapClick, isAddingMode }) => {
    useMapEvents({
        click: (e) => {
            if (isAddingMode) {
                onMapClick(e);
            }
        },
    });
    return null;
};

const MapContainer = () => {
    const { locations, fetchLocations, loading } = useLocations();
    
    // --- STATE YÖNETİMİ ---
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [selectedDetailLocation, setSelectedDetailLocation] = useState(null);
    
    // Konum bulununca haritayı uçurmak için tuttuğumuz state
    const [flyToCoords, setFlyToCoords] = useState(null);
    // Bulunan konuma marker koymak için tuttuğumuz state
    const [userLocation, setUserLocation] = useState(null);

    const worldBounds = [[-90, -180], [90, 180]];

    // --- BUTONA TIKLANINCA ---
    const handleButtonClick = () => {
        setIsAddingMode(!isAddingMode);
    };

    // --- HARİTAYA TIKLANINCA (EKLEME MODU) ---
    const handleMapClick = (e) => {
        setSelectedPosition(e.latlng);
        setModalOpen(true);
        setIsAddingMode(false);
    };

    // --- DETAY GÖR BUTONUNA TIKLANINCA ---
    const handleOpenDetail = (loc) => {
        setSelectedDetailLocation(loc);
    };

    // --- KONUM BULUNUNCA ---
    const handleLocationFound = (coords) => {
        // 1. Haritayı uçur
        setFlyToCoords(coords);
        // 2. Oraya marker koy
        setUserLocation(coords);
    };

    if (loading) return <div>Loading map...</div>;

    return (
        <div className="relative w-full h-full">
            <LeafletMap
                center={[39, 35]} // Türkiye civarı başlangıç
                zoom={6}
                minZoom={3}
                scrollWheelZoom={true}
                maxBounds={worldBounds}
                maxBoundsViscosity={1.0}
                style={{ 
                    background: '#aad3df',
                    cursor: isAddingMode ? 'crosshair' : 'grab' 
                }}
                className="w-full h-full outline-none"
            >
                <TileLayer
                    noWrap={true}
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Haritayı uçuran görünmez bileşen */}
                <FlyToLocation center={flyToCoords} />

                <MapClickHandler 
                    onMapClick={handleMapClick} 
                    isAddingMode={isAddingMode} 
                />

                {/* VERİTABANINDAN GELEN LOKASYONLAR */}
                {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                        <Popup closeButton={false}>
                            <MarkerPopup 
                                location={loc} 
                                onOpenDetail={handleOpenDetail} 
                            />
                        </Popup>
                    </Marker>
                ))}

                {/* KULLANICININ BULUNAN KONUMU (MAVİ MARKER) */}
                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                        <Popup>
                            <div className="text-center font-semibold text-emerald-600">
                                📍 Sizin Konumunuz
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* BUTONLAR - Harita Container'ı içinde (LeafletMap children) */}
                <div className="absolute bottom-8 right-8 z-[1000] flex flex-col items-center gap-4">
                    <AddLocation onLocationFound={handleLocationFound} />
                    
                    <AddMarkerButton 
                        onClick={handleButtonClick} 
                        isActive={isAddingMode} 
                    />
                </div>

            </LeafletMap>
            
            {isAddingMode && (
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-[1000] bg-emerald-900/80 text-white px-6 py-2 rounded-full backdrop-blur-md border border-white/20 animate-pulse pointer-events-none">
                    Konum seçmek için haritaya tıklayın
                </div>
            )}

            {/* MODALLAR */}
            {modalOpen && selectedPosition && (
                <AddMarkerModal
                    position={selectedPosition}
                    onClose={() => setModalOpen(false)}
                    onSave={fetchLocations}
                />
            )}

            {selectedDetailLocation && (
                <MarkerDetailModal
                    location={selectedDetailLocation}
                    onClose={() => setSelectedDetailLocation(null)}
                />
            )}
        </div>
    );
};

export default MapContainer;