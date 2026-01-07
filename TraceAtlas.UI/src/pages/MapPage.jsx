import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";
import { X, Sparkles } from "lucide-react";

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);



  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-zinc-950">
      <Navbar />

      <div className="absolute inset-0 z-0">
        <MapContainer />
      </div>

     
    </div>
  );
};

export default MapPage;