import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";

const MapPage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-zinc-950">
      <Helmet>
        <title>{t('map.seoTitle')}</title>
        <meta name="description" content={t('map.seoDescription')} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.traceatlas.com.tr/map" />
        <meta property="og:title" content={t('map.seoTitle')} />
        <meta property="og:description" content={t('map.seoSocialDescription')} />
        <meta property="og:image" content="https://www.traceatlas.com.tr/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('map.seoTitle')} />
        <meta name="twitter:description" content={t('map.seoSocialDescription')} />
        <meta name="twitter:image" content="https://www.traceatlas.com.tr/og-image.jpg" />
        
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
