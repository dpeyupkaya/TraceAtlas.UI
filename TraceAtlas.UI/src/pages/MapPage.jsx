// MapPage.jsx
import React from "react";
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";
import MiniatureWidget from "../common/MiniatureWidget"; 

const MapPage = () => {
  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-gray-100">
      
      {/* Navbar - Üstte sabit, yeni navbar tasarımıyla uyumlu */}
      <Navbar />

      {/* Mini Widget */}
      <div className="fixed bottom-4 right-4 z-[9000]">
        <MiniatureWidget />
      </div>

      {/* Harita */}
      <div className="absolute inset-0 z-0">
        <MapContainer />
      </div>

    </div>
  );
};

export default MapPage;