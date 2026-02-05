import Auth from "@/views/Auth.vue"
import Kanban from "@/views/Kanban.vue"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth", component: Auth },
    { path: "/kanban", component: Kanban },
  ],
})

export default router
