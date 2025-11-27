// MapPage.jsx
import React from "react";
import Navbar from "../components/navbar/Navbar"; // Yolun doğru olduğundan emin ol
import MapContainer from "../components/map/components/MapContainer";

export const MapPage = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      
   
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-[9999]">
        <Navbar />
      </div>

      {/* Harita Katmanı */}
      <div className="w-full h-full z-0">
        <MapContainer />
      </div>
    </div>
  );
};

export default MapPage;