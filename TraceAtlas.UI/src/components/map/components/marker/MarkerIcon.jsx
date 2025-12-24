import React from 'react';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MdLocationOn } from 'react-icons/md';

export const getMarkerIcon = (location) => {
  const hasImage = !!(
    location.hasImage === true ||
    (location.blobUrl && location.blobUrl.length > 0) ||
    (location.imageBase64 && location.imageBase64.length > 10)
  );

  const mainColor = hasImage ? '#13eb0bff' : '#ff0000ff';
  const size = 38;

  const iconHTML = renderToStaticMarkup(
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
    }}>
      <div style={{
        position: 'relative',
        zIndex: 2,
      }}>
        <MdLocationOn
          size={size}
          color={mainColor}
        />
      </div>

      <div style={{
        marginTop: '-4px',
        width: '16px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: mainColor,
        opacity: 0.3,
        zIndex: 1
      }} />
    </div>
  );

  return L.divIcon({
    className: 'atlas-clean-pin',
    html: iconHTML,
    iconSize: [size, size + 5],
    iconAnchor: [size / 2, size + 2],
    popupAnchor: [0, -size]
  });
};