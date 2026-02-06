import { useAuthStore } from "@/stores/authStore"
import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
})

api.interceptors.request.use(function (config) {
  const authStore = useAuthStore()

  if (authStore.isLoggedIn) {
    config.headers["Authorization"] = "Bearer " + authStore.accessToken
  }
  return config
})
