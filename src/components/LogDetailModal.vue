<template v-if="open">
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
      <h2 class="text-xl font-bold mb-4">Log Details</h2>
      <p><strong>Date:</strong> {{ log.date }}</p>
      <p><strong>Activity:</strong> {{ log.summary }}</p>
      <p><strong>Hours:</strong> {{ log.hours }}</p>
      <p v-if="log.challenges"><strong>Challenges:</strong> {{ log.challenges }}</p>
      <p v-if="log.note"><strong>Supervisor Note:</strong> {{ log.note }}</p>
      <button @click="$emit('close')" class="mt-4 btn-blue">Close</button>
    </div>
  </div>
</template>
<script setup>
defineProps({ log: Object, open: Boolean });
</script>