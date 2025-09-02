<template>
  <div :class="`bg-gradient-to-r from-${color}-400 to-${color}-600 text-white p-6 rounded-lg flex items-center justify-between`">
    <div class="text-3xl font-bold">{{ count }}</div>
    <div class="text-sm font-medium">{{ title }}</div>
  </div>
</template>

<script setup>
defineProps({
  color: String,
  title: String,
  count: Number
})
</script>
