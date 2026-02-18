<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const username = ref<string>("");
const password = ref<string>("");
const showPwd = ref<boolean>(false);
const isFormValid = ref<boolean>(false);
const snackbar = ref<boolean>(false);

const authState = useAuthStore();
const route = useRoute();
const router = useRouter();
const mode = ref<"signUp" | "signIn">(route.query.mode === "signUp" ? "signUp" : "signIn");

const toggleShowPwd = () => (showPwd.value = !showPwd.value);
const hasCapital = /[A-Z]/;
const hasNumAndLetter = /(?=.*[a-zA-Z])(?=.*[0-9])/;
const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;
const validatePwd = (value: string): string | boolean => {
  if (value.length < 8) {
    return "Password must be more than 8 characters";
  }
  if (!hasNumAndLetter.test(value)) {
    return "Password should contain both numbers and letters";
  }
  if (!hasCapital.test(value)) {
    return "Password should contain at least one capital letter";
  }
  if (!hasSpecial.test(value)) {
    return "Password should contain at least one special character";
  }
  return true;
};
const validateUsername = (value: string): string | boolean => {
  if (value.length < 8) {
    return "Username must be more than 8 characters";
  }
  return true;
};
const handleSubmit = async () => {
  try {
    if (mode.value === "signIn") {
      await authState.logIn({ username: username.value, password: password.value });
      snackbar.value = true;
      router.push("/kanban");
    } else {
      await authState.signUp({ username: username.value, password: password.value });
      await authState.logIn({ username: username.value, password: password.value });
      snackbar.value = true;
      router.push("/kanban");
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <v-container max-width="sm">
    <v-tabs v-model="mode">
      <v-tab value="signUp">Sign Up</v-tab>
      <v-tab value="signIn">Sign In</v-tab>
    </v-tabs>
    <p class="my-4 text-h4">{{ mode === "signIn" ? "Sign In" : "Create an Account" }}</p>
    <v-form class="d-flex flex-column ga-3" v-model="isFormValid" @submit.prevent="handleSubmit">
      <v-text-field label="Username" v-model="username" :rules="[validateUsername]" />
      <v-text-field
        label="Password"
        v-model="password"
        :type="showPwd ? 'text' : 'password'"
        :append-inner-icon="showPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        @click:append-inner="toggleShowPwd()"
        :rules="[validatePwd]"
      />
      <v-btn text="Submit" type="submit" class="align-self-start" :disabled="!isFormValid" />
    </v-form>
  </v-container>
  <v-snackbar v-model="snackbar"> Logged In! </v-snackbar>
</template>
