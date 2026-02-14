<script setup lang="ts">
import TaskCard from "@/components/TaskCard.vue";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useDateFormat } from "@vueuse/core";
import EditTaskForm from "@/components/EditTaskForm.vue";

const authStore = useAuthStore();
const username = ref("");
const taskStore = useTaskStore();
const { todoTasks, doingTasks, doneTasks } = storeToRefs(taskStore);

onMounted(async () => {
  try {
    username.value = (await authStore.getProfile()).username || "";
    await taskStore.getTaskList();
    console.log(taskStore.tasks);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div class="pa-6 d-flex flex-column ga-4">
    <div class="d-flex align-center">
      <h1 v-if="!!username">{{ username + "'s" }} Board</h1>
      <v-dialog>
        <template #activator="{ props }">
          <v-btn class="ml-auto" v-bind="props">Create Task</v-btn>
        </template>
        <template #default="{ isActive }">
          <EditTaskForm mode="add" @close="isActive.value = false" />
        </template>
      </v-dialog>
    </div>

    <v-container fluid class="border">
      <v-row>
        <v-col cols="4" class="d-flex flex-column ga-3">
          <h2>To Do</h2>
          <TaskCard
            v-for="task in todoTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :subtitle="useDateFormat(task.created_at, 'YYYY/MM/DD HH:mm').value"
            :desc="task.description"
            status="todo"
          />
        </v-col>
        <v-col cols="4" class="d-flex flex-column ga-3">
          <h2>In Progress</h2>
          <TaskCard
            v-for="task in doingTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :subtitle="useDateFormat(task.created_at, 'YYYY/MM/DD HH:mm').value"
            :desc="task.description"
            status="doing"
          />
        </v-col>
        <v-col cols="4" class="d-flex flex-column ga-3">
          <h2>Done</h2>
          <TaskCard
            v-for="task in doneTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :subtitle="useDateFormat(task.created_at, 'YYYY/MM/DD HH:mm').value"
            :desc="task.description"
            status="done"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
