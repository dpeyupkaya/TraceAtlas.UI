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

// --- YENİ EKLENEN KISIM: OData ile Etiket Arama ---
export const searchByTag = async (term) => {
    // 2 karakterden azsa arama yapma
    if (!term || term.length < 2) return [];

    const cleanTerm = term.trim().toLowerCase();
    
    // OData Sorgusu:
    // 1. $expand=LocationTags($expand=Tag): Lokasyonun etiketlerini de getir.
    // 2. $filter: Etiket isminde aranan kelime geçiyor mu? (contains & tolower)
    const query = `/odata/Locations?$expand=LocationTags($expand=Tag)&$filter=LocationTags/any(lt: contains(tolower(lt/Tag/Name), '${cleanTerm}'))`;
    
    try {
        const response = await api.get(query);
        // OData standardı gereği veriler 'value' dizisi içinde gelir
        return response.data.value;
    } catch (error) {
        console.error("Arama sırasında hata oluştu:", error);
        return []; // Hata olursa boş dizi dönelim ki uygulama çökmesin
    }
};