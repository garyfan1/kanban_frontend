import { authService } from "@/services/authServices"
import { useAuthStore } from "@/stores/authStore"
import Auth from "@/views/Auth.vue"
import Kanban from "@/views/Kanban.vue"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth", component: Auth },
    {
      path: "/kanban",
      component: Kanban,
      beforeEnter: (to, from) => {
        if (!useAuthStore().isLoggedIn) {
          return "/auth"
        }
      },
    },
  ],
})

export default router
