<script setup lang="ts">
import EditTaskForm from "@/components/EditTaskForm.vue";

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
      <v-dialog max-width="70%">
        <template #activator="{ props }">
          <v-btn v-bind="props">Edit</v-btn>
        </template>
        <template #default="{ isActive }">
          <EditTaskForm
            @close="isActive.value = false"
            :defaults="{ title: title, status: status, desc: desc }"
          />
        </template>
      </v-dialog>
      <v-btn :class="['justify-end', status === 'done' && 'hidden']">></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}
</style>
