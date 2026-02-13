<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <h1>Some stub text</h1>
  <v-btn @click="emit('close')">Close</v-btn>
</template>
