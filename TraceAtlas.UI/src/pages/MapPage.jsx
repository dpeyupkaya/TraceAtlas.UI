// MapPage.jsx
import React from "react";
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";
// Aynı dosyayı import ediyoruz, ama içeriği artık resim tabanlı.
import MiniatureWidget from "../common/MiniatureWidget"; 

export const MapPage = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-100">
      
      {/* Navbar */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-[9999]">
        <Navbar />
      </div>

      {/* --- BİZİM YENİ RESİMLİ WİDGET --- */}
      {/* Kendisi absolute olduğu için nereye koyduğunun çok önemi yok ama haritanın üstünde olması iyi */}
      <MiniatureWidget />
      {/* -------------------------------- */}

      {/* Harita Alanı */}
      <div className="absolute inset-0 z-0"> 
         <MapContainer />
      </div>
      
    </div>
  );
};

export default MapPage;