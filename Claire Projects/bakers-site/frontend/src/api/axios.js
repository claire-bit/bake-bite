import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const getToken = (key) =>
  localStorage.getItem(key) || sessionStorage.getItem(key);

export const clearTokens = () =>
  ["access", "refresh"].forEach((k) => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });

// "Remember me" -> localStorage (survives restarts), otherwise sessionStorage.
export const saveTokens = ({ access, refresh }, remember) => {
  clearTokens();
  const store = remember ? localStorage : sessionStorage;
  store.setItem("access", access);
  store.setItem("refresh", refresh);
};

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const access = getToken("access");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// On a 401, try one silent token refresh, then retry the original request.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isAuthCall =
      original?.url?.includes("users/login/") ||
      original?.url?.includes("token/refresh/");

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !isAuthCall &&
      getToken("refresh")
    ) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/users/token/refresh/`, {
          refresh: getToken("refresh"),
        });
        const store = localStorage.getItem("refresh") ? localStorage : sessionStorage;
        store.setItem("access", data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        clearTokens();
      }
    }
    return Promise.reject(error);
  }
);

export default api;