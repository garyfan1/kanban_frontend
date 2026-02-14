<script setup lang="ts">
import { ref } from "vue";

interface EditTaskFormProps {
  type?: "add" | "edit";
  defaults?: {
    title: string;
    desc: string;
    status: "todo" | "doing" | "done";
  };
}

const { defaults } = defineProps<EditTaskFormProps>();
const emit = defineEmits(["close"]);
const formValid = ref(false);
const formTitle = ref(defaults?.title || "");
const formDesc = ref(defaults?.desc || "");
const formStatus = ref(defaults?.status || "todo");
const notEmptyRule = (s: string) => {
  if (s.trim().length <= 0) {
    return "Title can not be empty.";
  }
  return true;
};
</script>

<template>
  <v-card>
    <v-card-title> Edit Task </v-card-title>

    <v-card-text>
      <v-form v-model="formValid">
        <v-text-field label="Title" :rules="[notEmptyRule]" v-model="formTitle" />
        <v-select label="Status" :items="['todo', 'doing', 'done']" v-model="formStatus"></v-select>
        <v-textarea label="Description" variant="outlined" v-model="formDesc"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="emit('close')">Cancel</v-btn>
      <v-btn>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
