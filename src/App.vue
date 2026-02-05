<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <v-app>
    <RouterLink to="/auth">Auth</RouterLink>
    <RouterLink to="/kanban">Kanban</RouterLink>

    <RouterView />
  </v-app>
</template>

<style scoped></style>
