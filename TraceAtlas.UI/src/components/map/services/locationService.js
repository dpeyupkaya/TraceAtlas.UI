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

export const createLocation = async (formData) => {
  try {
    const response = await api.post('/Locations', formData, {
      headers: {
      
        "Content-Type": undefined 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Lokasyon oluşturulamadı:", error);
    throw error;
  }
};

export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/Locations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lokasyon detayı bulunamadı:", error);
    throw error;
  }
};

export const addFavorite = async (locationId) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error("Kullanıcı giriş yapmamış.");

  try {
    await api.post(`/Profile/favorites/${locationId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    console.error("Favoriye eklenemedi:", error);
    throw error;
  }
}

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

export const searchByTag = async (term) => {
    if (!term || term.length < 2) return [];

    const cleanTerm = term.trim().toLowerCase();
    const query = `/odata/Locations?$expand=LocationTags($expand=Tag)&$filter=LocationTags/any(lt: contains(tolower(lt/Tag/Name), '${cleanTerm}'))`;
    
    try {
        const response = await api.get(query);
        return response.data.value;
    } catch (error) {
        console.error("Arama sırasında hata oluştu:", error);
        return []; 
    }
};
export const createShareLink = async (locationId) => {
  try {
    const response = await api.post(`/SharedLinks/${locationId}`);
    return response.data;
  } catch (error) {
    console.error("Paylaşım linki oluşturulamadı:", error);
    throw error;
  }
};
export const resolveSharedLink = async (token) => {
  try {
    const response = await api.get(`/SharedLinks/${token}`);
    return response.data;
  } catch (error) {
    console.error("Shared link çözülemedi:", error);
    throw error;
  }
};
