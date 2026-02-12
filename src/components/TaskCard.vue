<script setup lang="ts">
interface TaskCardProps {
  title: string
  subtitle: string
  desc: string
}
const { title, subtitle, desc } = defineProps<TaskCardProps>()
</script>

<template>
  <v-card variant="outlined">
    <v-card-title> {{ title }} </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>{{ desc }}</v-card-text>
    <v-card-actions>
      <v-btn>Btn1</v-btn>
      <v-btn>Btn2</v-btn>
    </v-card-actions>
  </v-card>
</template>
