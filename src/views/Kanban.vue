<script setup lang="ts">
import TaskCard from "@/components/TaskCard.vue"
import { useAuthStore } from "@/stores/authStore"
import { onMounted, ref } from "vue"

const authStore = useAuthStore()
const username = ref("")
onMounted(async () => {
  try {
    username.value = (await authStore.getProfile()).username || ""
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <h1>Welcome to {{ username + "'s" }} Kanban!</h1>

  <v-container fluid class="border">
    <v-row>
      <v-col cols="4" class="d-flex flex-column ga-3">
        <h2>To Do</h2>
        <TaskCard title="Title" subtitle="SubTitle" desc="Here are some description" />
        <TaskCard title="Title" subtitle="SubTitle" desc="Here are some description" />
      </v-col>
      <v-col cols="4" class="d-flex flex-column ga-3">
        <h2>In Progress</h2>
        <TaskCard title="Title" subtitle="SubTitle" desc="Here are some description" />
      </v-col>
      <v-col cols="4" class="d-flex flex-column ga-3">
        <h2>Done</h2>
        <TaskCard title="Title" subtitle="SubTitle" desc="Here are some description" />
      </v-col>
    </v-row>
  </v-container>
</template>
