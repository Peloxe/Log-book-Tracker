<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-semibold">Supervisor Profile</h2>
    <div v-if="supervisor">
      <p><strong>Name:</strong> {{ supervisor.name }}</p>
      <p><strong>Department:</strong> {{ supervisor.department }}</p>
      <p><strong>University:</strong> {{ supervisor.university }}</p>
    </div>
    <div v-else>
      <p class="text-gray-500">No supervisor found.</p>
    </div>
  </div>
</template>

<script setup>
import { useSupervisorStore } from '@/stores/supervisorStore';
import { ref } from 'vue';

// Example: assume logged-in supervisor has ID = 1
const supervisorId = 1;

const supervisorStore = useSupervisorStore();
const supervisor = ref(supervisorStore.fetchSupervisor(supervisorId));
</script>