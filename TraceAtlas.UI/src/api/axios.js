import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
  
   

  
    if (error.response.status === 429) {
      const msg =
        error.response.data?.message ||
        "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.";

      window.__showSnackbar(msg, "warning");
    }

    if (error.response.status >= 500) {
      window.__showSnackbar("Sunucu hatası. Birazdan tekrar deneyin.", "error");
    }

    return Promise.reject(error);
  }
);

export default api;
