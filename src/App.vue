<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/authStore";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const appReady = ref<boolean>(false);

const handleLogOut = () => {
  authStore.logout();
};
onMounted(async () => {
  if (authStore.refreshToken) {
    try {
      await authStore.refreshLogIn();
    } catch (e) {
      authStore.logout();
    }
  }
  appReady.value = true;
});
</script>

<template>
  <v-app v-if="appReady">
    <v-app-bar class="px-6">
      <div class="d-flex ga-4 align-center">
        <v-btn icon="mdi-calendar-blank" to="/" :active="false" />
        <v-btn density="comfortable" text="Home" to="/" variant="plain" />
        <v-btn
          v-if="!authStore.isLoggedIn"
          density="comfortable"
          text="Auth"
          to="/auth"
          variant="plain"
        />
        <v-btn
          v-if="authStore.isLoggedIn"
          density="comfortable"
          text="Kanban"
          to="/kanban"
          variant="plain"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        class="ml-auto"
        text="Log Out"
        append-icon="mdi-logout"
        v-if="useAuthStore().isLoggedIn"
        @click="handleLogOut"
      />
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
