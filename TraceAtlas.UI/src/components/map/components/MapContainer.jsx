import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'; 
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';

import AddMarkerButton from '../components/button/AddMarkerButton';
import AddLocation from '../components/button/AddLocation';
import AddMarkerModal from './modal/AddMarkerModal';
import MarkerDetailModal from './modal/MarkerDetailModal';
import MarkerPopup from './marker/MarkerPopup';

import { useLocations } from '../hooks/useLocations';
import { getMarkerIcon } from '../components/marker/MarkerIcon';
import { setSelectedLocation, clearSelection, setNewLocationPosition } from '../../../store/slices/mapSlice.js';

// Haritayı uçuran alt bileşen
const FlyToLocation = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    // Sadece center doluysa uçur
    if (center) {
      map.flyTo([center.lat, center.lng], 15, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  
  return null;
};

// Kullanıcı konum ikonu
const userLocationIcon = L.divIcon({
  className: 'user-location-marker-container',
  html: '<div class="user-location-dot"></div><div class="user-location-pulse"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Harita tıklama olayları
const MapClickHandler = () => {
  const dispatch = useDispatch();
  const isAddingMode = useSelector((state) => state.map.isAddingMode);

  useMapEvents({
    click: (e) => {
      if (isAddingMode) {
        dispatch(setNewLocationPosition(e.latlng));
      } else {
        dispatch(clearSelection());
      }
    },
  });
  return null;
};

const MapContainer = () => {
  const dispatch = useDispatch();
  const { locations, loading } = useLocations(); // fetchLocations burada kullanılmıyorsa silebilirsin
  const routeLocation = useLocation();
  
  // selectedLocation'ı buradan çektik ama useEffect ile dinleyip uçurmayacağız.
  const { isAddingMode } = useSelector((state) => state.map);

  const [state, setState] = useState({
    flyToCoords: null,
    userLocation: null,
  });

  const worldBounds = useMemo(() => [[-90, -180], [90, 180]], []);

  const createClusterCustomIcon = useCallback((cluster) => {
    const count = cluster.getChildCount();
    let sizeClass = 'dot-small';
    let dimension = 16;
 
    if (count > 10 && count <= 50) {
      sizeClass = 'dot-medium';
      dimension = 24;
    }
    else if (count > 50) {
      sizeClass = 'dot-large';
      dimension = 32;
    }

    return L.divIcon({
      html: '', 
      className: `custom-cluster-dot ${sizeClass}`, 
      iconSize: L.point(dimension, dimension, true),
    });
  }, []);

  // 1. Senaryo: Başka sayfadan yönlendirme ile gelindiyse uçur (Opsiyonel, istersen kalabilir)
  useEffect(() => {
    if (routeLocation.state && routeLocation.state.focusedLocation) {
        const { Latitude, Longitude } = routeLocation.state.focusedLocation;
        if (Latitude && Longitude) {
            setState(prev => ({
                ...prev,
                flyToCoords: { lat: Latitude, lng: Longitude }
            }));
        }
    }
  }, [routeLocation.state]);

  // DİKKAT: Buradaki "useEffect(() => { if (selectedLocation) ... }, [selectedLocation])" bloğu SİLİNDİ.
  // Böylece modal açılınca harita hareket etmeyecek.

  const handleOpenDetail = useCallback((loc) => {
    dispatch(setSelectedLocation(loc));
  }, [dispatch]);

  // 2. Senaryo: "Konumumu Bul" butonuna basınca uçur
  const handleLocationFound = useCallback((coords) => {
    setState(prev => ({
      ...prev,
      flyToCoords: coords, // Burası set edildiği için FlyToLocation çalışır
      userLocation: coords
    }));
  }, []);


if (loading) return (
  <div className="flex flex-col items-center justify-center w-full h-full bg-[#050505]">
    <div className="relative flex items-center justify-center">
      
      {/* Dönen Dış Halkalar (Çift katman derinlik katar) */}
      <div className="w-24 h-24 border-2 border-emerald-500/10 rounded-full absolute"></div>
      <div className="w-24 h-24 border-t-2 border-emerald-500 rounded-full animate-spin shadow-[0_0_15px_rgba(16,185,129,0.2)]"></div>
      
      {/* İçerideki Yazı */}
      <div className="absolute flex flex-col items-center">
        <span className="text-emerald-500 text-[10px] font-black tracking-[0.2em] uppercase">
          Trace
        </span>
        <span className="text-white text-[9px] font-light tracking-[0.1em] opacity-60 uppercase">
          Atlas
        </span>
      </div>

    </div>

   
  </div>
);

  return (
<div className="relative w-full h-full bg-[#050505]">
    <LeafletMap
      preferCanvas={true}
      center={[39, 35]}
      zoom={6}
      minZoom={3}
      maxZoom={20} // Haritanın toplamda ne kadar yaklaşabileceği
      scrollWheelZoom={true}
      maxBounds={worldBounds}
      maxBoundsViscosity={1.0}
      style={{ cursor: isAddingMode ? 'crosshair' : 'grab' }}
      className="w-full h-full outline-none"
    >
      {/* 1. KATMAN: ANA UYDU GÖRÜNTÜSÜ */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; Esri'
        /* maxNativeZoom ÇOK KRİTİK: 18'den sonra tile yoksa harita beyaz olmaz, 18'i büyütür */
        maxNativeZoom={18} 
        maxZoom={20}
      />

   
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; Esri'
        opacity={0.8} // İsimlerin uydu üzerinde çok parlak durmaması için hafif şeffaflık
        maxNativeZoom={18}
        maxZoom={20}
      />

      <FlyToLocation center={state.flyToCoords} />
      
        <MapClickHandler />

        <MarkerClusterGroup 
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon} 
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            disableClusteringAtZoom={16}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={getMarkerIcon(loc)} 
              eventHandlers={{
                click: (e) => {
                   // Tıklayınca sadece harita eventlerini durdur, flyTo yapma
                   e.originalEvent.stopPropagation();
                }
              }}
            >
              <Popup closeButton={false} className="custom-popup-clean">
                <MarkerPopup
                  location={loc}
                  onOpenDetail={handleOpenDetail}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {state.userLocation && (
          <Marker
            position={[state.userLocation.lat, state.userLocation.lng]}
            icon={userLocationIcon}
          >
            <Popup>
              <div className="text-center font-semibold text-emerald-600">
                📍 Sizin Konumunuz
              </div>
            </Popup>
          </Marker>
        )}

        <div className="absolute bottom-8 right-8 z-[1000] flex flex-col items-center gap-4">
          <AddLocation onLocationFound={handleLocationFound} />
          <AddMarkerButton />
        </div>
      </LeafletMap>

      <AddMarkerModal />

      <MarkerDetailModal />
    </div>
  );
};

export default MapContainer;