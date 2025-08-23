
<template>
  <div class="bg-white shadow-md rounded-lg border border-gray-200 p-6 md:sticky md:top-20">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Supervisor Profile</h2>
    <div class="space-y-2 text-gray-700">
      <p><span class="font-medium">Name:</span> {{ supervisor.name }}</p>
      <p><span class="font-medium">Department:</span> {{ supervisor.department }}</p>
      <p><span class="font-medium">University:</span> {{ supervisor.university }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSupervisorStore } from '@/stores/supervisorStore';

const supervisorStore = useSupervisorStore();
const supervisor = ref({});

onMounted(() => {
  supervisor.value = supervisorStore.fetchSupervisor(1); // Logged-in supervisor
});
</script>