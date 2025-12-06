import api from '../api/api';

const profileService = {
    getProfile: async () => {
        const response = await api.get('/Profile');
        return response.data;
    },
    getFavorites: async () => {
        const response = await api.get('/Profile/favorites');
        return response.data;
    },
    getMyPlaces: async () => {
        const response = await api.get('/Profile/places');
        return response.data;
    },
    deleteAccount: async () => {
        const response = await api.delete('/Profile');
        return response.data;
    },
    sendPasswordResetLink: async (email) => {
        const response = await api.post('/Auth/forgot-password', { email });
        return response.data;
    },
   
    deleteMyPlace: async (locationId) => {
        const response = await api.delete(`/Profile/${locationId}`);
        return response.data;
    },
     updateEmailPreferences: async (preferences) => {
        // Token işlemi api interceptor içinde halledildiği için header eklemeye gerek yok
        const response = await api.put('/EmailPreferences', preferences);
        return response.data;
    },

    getEmailPreferences: async () => {
        const response = await api.get('/EmailPreferences');
        return response.data;
    },

     getPublicStats: async () => {
        // Backend'de: [HttpGet("api/public/stats")]
        // Axios base URL'inin sonunda '/api' olduğunu varsayıyoruz.
        const response = await api.get('/public/stats');
        return response.data;
    }
    
};


export default profileService;