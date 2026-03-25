import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";
import { X, Sparkles } from "lucide-react";

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-zinc-950">
      <Helmet>
        <title>Deneyim Haritası | TraceAtlas</title>
        <meta name="description" content="TraceAtlas interaktif haritası ile dünyayı keşfet. Kullanıcıların paylaştığı anıları, rotaları ve gizli kalmış mekanları canlı harita üzerinden incele." />
        <meta property="og:title" content="Deneyim Haritası | TraceAtlas" />
        <meta property="og:description" content="İnteraktif harita üzerinde yeni yerler ve kullanıcı deneyimleri keşfet." />
        <meta property="og:url" content="https://www.traceatlas.com.tr/map" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/map" />
      </Helmet>

      <Navbar />

      <div className="absolute inset-0 z-0">
        <MapContainer />
      </div>
    </div>
  );
};

export default MapPage;