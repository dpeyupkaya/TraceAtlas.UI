import React, { useState, useCallback, useMemo } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import AddMarkerButton from '../components/button/AddMarkerButton';
import AddLocation from '../components/button/AddLocation';
import AddMarkerModal from './modal/AddMarkerModal';
import MarkerDetailModal from './modal/MarkerDetailModal';
import MarkerPopup from './marker/MarkerPopup';
import { useLocations } from '../hooks/useLocations';
import { getMarkerIcon } from '../components/marker/MarkerIcon';

const FlyToLocation = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 15, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
};
const userLocationIcon = L.divIcon({
  className: 'user-location-marker-container',
  html: '<div class="user-location-dot"></div><div class="user-location-pulse"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MapClickHandler = ({ onMapClick, isAddingMode }) => {
  useMapEvents({
    click: (e) => isAddingMode && onMapClick(e),
  });
  return null;
};

const MapContainer = () => {
  const { locations, fetchLocations, loading } = useLocations();

  const [state, setState] = useState({
    modalOpen: false,
    selectedPosition: null,
    isAddingMode: false,
    selectedDetailLocation: null,
    flyToCoords: null,
    userLocation: null,
  });

  const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

  const worldBounds = useMemo(() => [[-90, -180], [90, 180]], []);

  const handleButtonClick = useCallback(() => {
    setState(prev => ({ ...prev, isAddingMode: !prev.isAddingMode }));
  }, []);

  const handleMapClick = useCallback((e) => {
    setState(prev => ({
      ...prev,
      selectedPosition: e.latlng,
      modalOpen: true,
      isAddingMode: false
    }));
  }, []);

  const handleOpenDetail = useCallback((loc) => {
    updateState('selectedDetailLocation', loc);
  }, []);

  const handleLocationFound = useCallback((coords) => {
    setState(prev => ({
      ...prev,
      flyToCoords: coords,
      userLocation: coords
    }));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-white">Yükleniyor...</div>;

  return (
    <div className="relative w-full h-full">
      <LeafletMap
        center={[39, 35]}
        zoom={6}
        minZoom={3}
        scrollWheelZoom={true}
        maxBounds={worldBounds}
        maxBoundsViscosity={1.0}
        style={{ background: '#aad3df', cursor: state.isAddingMode ? 'crosshair' : 'grab' }}
        className="w-full h-full outline-none"
      >
        <TileLayer
          noWrap={true}
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation center={state.flyToCoords} />

        <MapClickHandler onMapClick={handleMapClick} isAddingMode={state.isAddingMode} />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={getMarkerIcon(loc.imageBase64)}
          >
            <Popup closeButton={false} className="custom-popup">
              <MarkerPopup
                location={loc}
                onOpenDetail={handleOpenDetail}
              />
            </Popup>
          </Marker>
        ))}

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
          <AddMarkerButton onClick={handleButtonClick} isActive={state.isAddingMode} />
        </div>
      </LeafletMap>

     

      {state.modalOpen && state.selectedPosition && (
        <AddMarkerModal
          selectedPosition={state.selectedPosition}
          isOpen={true}
          onClose={() => updateState('modalOpen', false)}
          onSuccess={() => fetchLocations()}
        />
      )}

      {state.selectedDetailLocation && (
        <MarkerDetailModal
          location={state.selectedDetailLocation}
          onClose={() => updateState('selectedDetailLocation', null)}
        />
      )}
    </div>
  );
};

export default MapContainer;