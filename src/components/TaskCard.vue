<script setup lang="ts">
interface TaskCardProps {
  title: string;
  subtitle: string;
  desc: string;
  status?: "todo" | "doing" | "done";
}
const { title, subtitle, desc, status = "todo" } = defineProps<TaskCardProps>();
</script>

<template>
  <v-card variant="outlined">
    <v-card-title> {{ title }} </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>{{ desc }}</v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn :class="['justify-start', status === 'todo' && 'hidden']"><</v-btn>
      <v-btn>Edit</v-btn>
      <v-btn :class="['justify-end', status === 'done' && 'hidden']">></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}
</style>
