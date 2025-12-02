import api from '../../../api/api.js';

export const getLocations = async () => {
  try {
    const response = await api.get('/Locations');
    return response.data; 
  } catch (error) {
    console.error("Lokasyonlar yüklenemedi:", error);
    throw error;
  }
};

// Yeni lokasyon oluştur
// data parametresi Backend'deki CreateLocationCommand ile birebir örtüşmeli
export const createLocation = async (data) => {
  // data şunları içermeli: 
  // { Title, Description, Latitude, Longitude, ImageBase64, Tags, UserId }
  
  try {
    const response = await api.post('/Locations', data);
    return response.data; // { id: "...", message: "..." } döner
  } catch (error) {
    console.error("Lokasyon oluşturulamadı:", error);
    throw error;
  }
};

// Detay çekmek gerekirse
export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/Locations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lokasyon detayı bulunamadı:", error);
    throw error;
  }
};

// Favorilere ekle
export const addFavorite = async (locationId) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error("Kullanıcı giriş yapmamış.");

  try {
    await api.post(`/Profile/favorites/${locationId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true; // Başarılı
  } catch (error) {
    console.error("Favoriye eklenemedi:", error);
    throw error;
  }
}
// Favori çıkar
export const removeFavorite = async (locationId) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error("Kullanıcı giriş yapmamış.");

  try {
    const res = await api.delete(`/Profile/favorites/${locationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error("Favoriden çıkarılamadı:", error);
    throw error;
  }
}
