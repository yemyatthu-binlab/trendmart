import axios from "axios";
import { useAuthStore } from "@/store/auth";

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith("/admin")) {
      config.withCredentials = true;
    }

    const token = useAuthStore.getState().token;

    if (token && !config.url?.startsWith("/admin")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
