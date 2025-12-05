import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveSharedLink } from "../components/map/services/locationService";
import MarkerDetailModal from "../components/map/components/modal/MarkerDetailModal";
import { FiLoader } from "react-icons/fi";

const SharedLocationPage = () => {
  const { token } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await resolveSharedLink(token);
        setLocationData(data);
      } catch {
        alert("Geçersiz veya süresi dolmuş bağlantı.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <FiLoader className="animate-spin" size={40} />
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        Bağlantı geçersiz.
      </div>
    );
  }

  return (
    <MarkerDetailModal
      location={{
        id: locationData.id,
        latitude: locationData.latitude,
        longitude: locationData.longitude
      }}
      onClose={() => (window.location.href = "/map")}
    />
  );
};

export default SharedLocationPage;
