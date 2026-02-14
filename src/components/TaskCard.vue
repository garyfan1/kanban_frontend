<script setup lang="ts">
import EditTaskForm from "@/components/EditTaskForm.vue";
import { useTaskStore } from "@/stores/taskStore";

interface TaskCardProps {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  status?: "todo" | "doing" | "done";
}
const { id, title, subtitle, desc, status = "todo" } = defineProps<TaskCardProps>();
const taskStore = useTaskStore();

const handleMoveNext = async () => {
  if (status === "todo") {
    await taskStore.patchTask({ id: id, data: { status: "doing" } });
  }
  if (status === "doing") {
    await taskStore.patchTask({ id: id, data: { status: "done" } });
  }
};
const handleMoveBack = async () => {
  if (status === "doing") {
    await taskStore.patchTask({ id: id, data: { status: "todo" } });
  }
  if (status === "done") {
    await taskStore.patchTask({ id: id, data: { status: "doing" } });
  }
};
</script>

<template>
  <v-card variant="outlined">
    <v-card-title> {{ title }} </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>{{ desc }}</v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn :class="['justify-start', status === 'todo' && 'hidden']" @click="handleMoveBack"
        ><</v-btn
      >
      <v-dialog max-width="70%">
        <template #activator="{ props }">
          <v-btn v-bind="props">Edit</v-btn>
        </template>
        <template #default="{ isActive }">
          <EditTaskForm
            @close="isActive.value = false"
            :id="id"
            :defaults="{ title: title, status: status, desc: desc }"
          />
        </template>
      </v-dialog>
      <v-btn :class="['justify-end', status === 'done' && 'hidden']" @click="handleMoveNext"
        >></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}
</style>
