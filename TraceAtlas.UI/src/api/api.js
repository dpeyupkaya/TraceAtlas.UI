import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------
// REQUEST INTERCEPTOR
// ----------------------
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

// ----------------------
// REFRESH TOKEN QUEUE
// ----------------------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ----------------------
// RESPONSE INTERCEPTOR
// ----------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { response } = error;
    const status = response?.status;
    const data = response?.data;
    const headers = response?.headers;

    // ----------------------
    // TOKEN EXPIRED (401)
    // ----------------------
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post(
          "/Auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.token;

        localStorage.setItem("accessToken", newAccessToken);
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ----------------------
    // RATE LIMIT (429)
    // ----------------------
    if (status === 429) {
      window.__showSnackbar?.("Çok fazla istek gönderdin, lütfen biraz bekle.");
      return Promise.reject({ status, message: "Too many requests" });
    }

    // ----------------------
    // NORMAL ERROR HANDLING
    // ----------------------
    const message = data?.message || data?.error || "Beklenmeyen bir hata oluştu. Daha sonra tekrar deneyiniz.";
    const errors = data?.errors || null;
    const traceId = data?.traceId || headers?.["x-trace-id"];

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

    if (status === 401) {
      window.__showSnackbar?.(message || "Giriş yetkisi bulunamadı.");
      return Promise.reject({ status, message, traceId });
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
