import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { resolveSharedLink } from "../components/map/services/locationService";
import { setSelectedLocation } from ".././store/slices/mapSlice";
import { FiLoader, FiAlertCircle } from "react-icons/fi";

const SharedLocationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [error, setError] = useState(false);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const loadAndRedirect = async () => {
      try {
        const data = await resolveSharedLink(token);

        if (data) {
          setLocationData(data);
          dispatch(setSelectedLocation(data));
          
          setTimeout(() => {
            navigate("/map");
          }, 1000); 
        }
      } catch (err) {
        console.error("Paylaşım hatası:", err);
        setError(true);
      }
    };

    loadAndRedirect();
  }, [token, dispatch, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <Helmet>
        <title>{locationData ? `${locationData.title} | TraceAtlas` : 'Paylaşılan Konum | TraceAtlas'}</title>
        <meta name="description" content={locationData?.description || "TraceAtlas üzerinden paylaşılan özel bir konumu görüntüle."} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.traceatlas.com.tr/shared/${token}`} />
        <meta property="og:title" content={locationData ? `${locationData.title} | TraceAtlas` : 'Paylaşılan Konum'} />
        <meta property="og:description" content={locationData?.description || "Seninle bir konum paylaşıldı. Detayları harita üzerinde gör."} />
        <meta property="og:image" content={locationData?.imageUrl || "https://www.traceatlas.com.tr/og-image.jpg"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={locationData ? `${locationData.title} | TraceAtlas` : 'Paylaşılan Konum'} />
        <meta name="twitter:description" content={locationData?.description || "Seninle bir konum paylaşıldı."} />
        <meta name="twitter:image" content={locationData?.imageUrl || "https://www.traceatlas.com.tr/og-image.jpg"} />
        
        <link rel="canonical" href={`https://www.traceatlas.com.tr/shared/${token}`} />
      </Helmet>

      {error ? (
        <div className="flex flex-col gap-4 items-center justify-center text-slate-400">
          <FiAlertCircle size={50} />
          <p>Bağlantı geçersiz veya süresi dolmuş.</p>
          <button 
            onClick={() => navigate('/map')}
            className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 text-white transition"
          >
            Haritaya Dön
          </button>
        </div>
      ) : (
        <>
          <FiLoader className="animate-spin mb-4" size={40} />
          <p className="text-slate-400">{locationData ? `${locationData.title} konumuna gidiliyor...` : "Konum verisi yükleniyor..."}</p>
        </>
      )}
    </div>
  );
};

export default SharedLocationPage;