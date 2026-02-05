<script setup lang="ts">
import { ref } from "vue"

const username = ref<string>("")
const password = ref<string>("")
const showPwd = ref<boolean>(false)
const toggleShowPwd = () => (showPwd.value = !showPwd.value)
const hasCapital = /[A-Z]/
const hasNumAndLetter = /(?=.*[a-zA-Z])(?=.*[0-9])/
const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/
const validatePwd = (value: string): string | boolean => {
  if (value.length < 8) {
    return "Password must be more than 8 characters"
  }
  if (!hasNumAndLetter.test(value)) {
    return "Password should contain both numbers and letters"
  }
  if (!hasCapital.test(value)) {
    return "Password should contain at least one capital letter"
  }
  if (!hasSpecial.test(value)) {
    return "Password should contain at least one special character"
  }
  return true
}
const validateUsername = (value: string): string | boolean => {
  if (value.length < 8) {
    return "Username must be more than 8 characters"
  }
  return true
}
</script>

<template>
  <v-container max-width="sm">
    <h1 class="mb-4">Login</h1>
    <v-form class="d-flex flex-column ga-3">
      <v-text-field label="Username" v-model="username" :rules="[validateUsername]" />
      <v-text-field
        label="Password"
        v-model="password"
        :type="showPwd ? 'text' : 'password'"
        :append-inner-icon="showPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        @click:append-inner="toggleShowPwd()"
        :rules="[validatePwd]"
      />
      <v-btn text="Submit" type="submit" class="align-self-start" />
    </v-form>
  </v-container>
</template>
