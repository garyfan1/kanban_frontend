<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import { useAuthStore } from "./stores/authStore"

const handleLogOut = () => {
  useAuthStore().logout()
}
</script>

<template>
  <v-app>
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
