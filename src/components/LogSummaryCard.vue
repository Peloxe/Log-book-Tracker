<template>
  <div class="bg-white p-4 rounded-lg shadow text-center">
    <p class="text-gray-500">{{ title }}</p>
    <p class="text-3xl font-extrabold">{{ value }}</p>
  </div>
</template>
<script setup>
defineProps({ title: String, value: [String, Number] });
</script>
