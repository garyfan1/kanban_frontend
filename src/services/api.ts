import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
});

let refreshPromise: Promise<void> | null = null;

api.interceptors.request.use(async function (config) {
  const authStore = useAuthStore();

  if (refreshPromise) {
    await refreshPromise;
  }

  if (authStore.isLoggedIn) {
    config.headers["Authorization"] = "Bearer " + authStore.accessToken;
  }

  return config;
});

api.interceptors.response.use(
  function (config) {
    return config;
  },
  async function onRejected(error) {
    const authStore = useAuthStore();

    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status == 401) {
      const url = error.config?.url || "";
      if (url.includes("token/")) {
        return Promise.reject(error);
      }
      if (refreshPromise) {
        await refreshPromise;
        return api(error.config);
      } else {
        try {
          refreshPromise = authStore.refreshLogIn();
          await refreshPromise;
          return api(error.config);
        } catch (e) {
          authStore.logout();
        } finally {
          refreshPromise = null;
        }
      }
    }
    return Promise.reject(error);
  },
);
