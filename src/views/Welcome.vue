<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const handleGuestLogIn = async () => {
  try {
    await authStore.logIn({ username: "GuestUser", password: "Test1234!" });
    router.push("/kanban");
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center pt-12 ga-6">
    <p class="text-h1">Welcome to <span class="text-primary">Kanban</span></p>
    <p class="text-h4">Organize your tasks!</p>
    <div v-if="!authStore.isLoggedIn" class="d-flex flex-column ga-3">
      <v-btn
        size="large"
        variant="flat"
        color="primary"
        text="Sign Up"
        :to="{ path: '/auth', query: { mode: 'signUp' } }"
      />
      <v-btn
        size="large"
        variant="outlined"
        color="primary"
        text="Log In"
        :to="{ path: '/auth', query: { mode: 'signIn' } }"
      />
      <v-btn
        size="large"
        variant="text"
        text="Continue as Guest (Demo)"
        @click="handleGuestLogIn"
      />
    </div>
    <div v-else class="d-flex flex-column ga-3">
      <v-btn size="large" variant="flat" color="primary" text="Go to Board" to="/kanban" />
      <v-btn
        size="large"
        variant="outlined"
        color="error"
        text="Logout"
        @click="authStore.logout()"
      />
    </div>
  </v-container>
</template>
