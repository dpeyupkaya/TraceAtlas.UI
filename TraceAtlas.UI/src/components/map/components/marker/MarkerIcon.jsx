import L from 'leaflet';

const CAMERA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
  <circle cx="12" cy="13" r="3"/>
</svg>`;

const DOT_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
  <circle cx="12" cy="12" r="5"/>
</svg>`;

export const getMarkerIcon = (location) => {
  const hasImage = (location.hasImage === true) ||
                   (location.blobUrl && Array.isArray(location.blobUrl) && location.blobUrl.length > 0) ||
                   (location.imageBase64 && typeof location.imageBase64 === 'string' && location.imageBase64.length > 10);

  const bgColor = hasImage ? '#0d9488' : '#64748b';
  const iconSvg = hasImage ? CAMERA_SVG : DOT_SVG;
  const size = hasImage ? 28 : 22;

  const html = `
<div style="
  width: ${size}px;
  height: ${size}px;
  background: ${bgColor};
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
">
  ${iconSvg}
</div>`;

  return L.divIcon({
    className: '',
    html: html,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2]
  });
};