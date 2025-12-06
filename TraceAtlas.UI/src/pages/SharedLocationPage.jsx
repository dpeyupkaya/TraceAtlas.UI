import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resolveSharedLink } from "../components/map/services/locationService";
import { setSelectedLocation, setViewState } from ".././store/slices/mapSlice"; // setViewState action'ın varsa ekle, yoksa aşağıda açıklarım
import { FiLoader, FiAlertCircle } from "react-icons/fi";

const SharedLocationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Hata durumunu state'te tutalım, başarılı olursa zaten yönlenecek
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const loadAndRedirect = async () => {
      try {
        // 1. Token ile veriyi çek
        const data = await resolveSharedLink(token);

        if (data) {
   
          dispatch(setSelectedLocation(data));

          // 3. (Opsiyonel) Harita kamerasını o noktaya odakla
          // Eğer mapSlice içinde harita pozisyonunu tutan bir state varsa (örn: viewState):
          /* dispatch(setViewState({
            latitude: data.latitude,
            longitude: data.longitude,
            zoom: 15
          }));
          */

          // 4. Ana harita sayfasına yönlendir
          navigate("/map");
        }
      } catch (err) {
        console.error("Paylaşım hatası:", err);
        setError(true);
      }
    };

    loadAndRedirect();
  }, [token, dispatch, navigate]);

  // Yönlendirme yapılana kadar yükleniyor ekranı göster
  if (error) {
    return (
      <div className="w-full h-screen flex flex-col gap-4 items-center justify-center bg-slate-900 text-slate-400">
        <FiAlertCircle size={50} />
        <p>Bağlantı geçersiz veya süresi dolmuş.</p>
        <button 
            onClick={() => navigate('/map')}
            className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 text-white transition"
        >
            Haritaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <FiLoader className="animate-spin mb-4" size={40} />
      <p className="text-slate-400">Konuma gidiliyor...</p>
    </div>
  );
};

export default SharedLocationPage;