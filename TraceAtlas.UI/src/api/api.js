import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.__showSnackbar?.("Sunucuya ulaşılamıyor.");
      return Promise.reject({ status: 0, message: "Sunucuya ulaşılamıyor." });
    }

    const { status, data, headers } = error.response;

    const message = data?.message || data?.error || "Beklenmeyen bir hata oluştu.";
    const errors = data?.errors || null;
    const traceId = data?.traceId || headers["x-trace-id"];

    if (status === 401) {
      window.__showSnackbar?.(message || "Giriş yetkisi bulunamadı.");
      return Promise.reject({ status, message, traceId });
    }

    if (status === 403) {
      window.__showSnackbar?.("Bu işlem için yetkin yok.");
      return Promise.reject({ status, message, traceId });
    }

    if (status === 400 && errors) {
      const firstField = Object.keys(errors)[0];
      const firstError = errors[firstField][0];
      window.__showSnackbar?.(firstError);
      return Promise.reject({ status, message, errors, traceId });
    }

    window.__showSnackbar?.(message);

    return Promise.reject({
      status,
      message,
      errors,
      traceId,
    });
  }
);

export default api;
