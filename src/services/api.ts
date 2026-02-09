import router from "@/router"
import { useAuthStore } from "@/stores/authStore"
import axios from "axios"
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry"

export const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
})

axiosRetry(api, {
  retries: 1,
  retryCondition: (error) => {
    return error.response?.status == 401 ? true : isNetworkOrIdempotentRequestError(error)
  },
})

let refreshPromise: Promise<void> | null = null

api.interceptors.request.use(async function (config) {
  const authStore = useAuthStore()

  if (refreshPromise) {
    await refreshPromise
  }

  if (authStore.isLoggedIn) {
    config.headers["Authorization"] = "Bearer " + authStore.accessToken
  }

  return config
})

api.interceptors.response.use(
  function (config) {
    return config
  },
  async function onRejected(error) {
    const authStore = useAuthStore()

    if (!error.response) {
      return Promise.reject(error)
    }
    if (error.response.status == 401) {
      if (refreshPromise) {
        await refreshPromise
      } else {
        try {
          refreshPromise = authStore.refreshLogIn()
          await refreshPromise
        } catch (e) {
          authStore.logout()
          router.push("/auth")
        } finally {
          refreshPromise = null
        }
      }
    }
    return Promise.reject(error)
  },
)
