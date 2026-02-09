<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import { useAuthStore } from "./stores/authStore"
import { onMounted, ref } from "vue"

const authStore = useAuthStore()
const appReady = ref<boolean>(false)

const handleLogOut = () => {
  authStore.logout()
}
onMounted(async () => {
  if (authStore.refreshToken) {
    try {
      await authStore.refreshLogIn()
    } catch (e) {
      authStore.logout()
    }
  }
  appReady.value = true
})
</script>

<template>
  <v-app v-if="appReady">
    <v-app-bar>
      <v-container class="d-flex ga-4">
        <RouterLink to="/auth">Auth</RouterLink>
        <RouterLink to="/kanban">Kanban</RouterLink>
        <v-spacer />
        <v-btn v-if="useAuthStore().isLoggedIn" @click="handleLogOut">Log out</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
