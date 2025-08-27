<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">Log Details</h2>
    <div v-if="log" class="border rounded-lg p-4 bg-white shadow-sm">
      <p><strong>Date:</strong> {{ log.date }}</p>
      <p><strong>Task:</strong> {{ log.task }}</p>
      <p><strong>Details:</strong> {{ log.details }}</p>
      <p><strong>Status:</strong>
        <span
          :class="{
            'text-green-600': log.status === 'Approved',
            'text-red-600': log.status === 'Rejected',
            'text-yellow-600': log.status === 'Pending'
          }"
        >
          {{ log.status }}
        </span>
      </p>
    </div>
    <div v-else>
      <p class="text-gray-500">Log not found.</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useLogStore } from '@/stores/logStore';

const route = useRoute();
const logStore = useLogStore();

const logId = route.params.logId;
const log = computed(() => logStore.getLogById(logId));
</script>