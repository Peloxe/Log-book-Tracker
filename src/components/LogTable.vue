<template>
  <div class="overflow-x-auto max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg shadow-sm mx-auto w-full md:w-3/4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50 transition">
          <td class="px-4 py-3">{{ log.date }}</td>
          <td class="px-4 py-3">{{ log.task }}</td>
          <td class="px-4 py-3">
            <span v-if="log.status==='Approved'" class="px-2 py-1 rounded-full bg-green-600 text-white text-sm font-semibold">Approved</span>
            <span v-else-if="log.status==='Rejected'" class="px-2 py-1 rounded-full bg-red-600 text-white text-sm font-semibold">Rejected</span>
            <span v-else class="px-2 py-1 rounded-full bg-yellow-500 text-white text-sm font-semibold">Pending</span>
          </td>
          <td class="px-4 py-3 space-x-2">
            <button v-if="log.status==='Pending'" @click="approve(log)" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">Approve</button>
            <button v-if="log.status==='Pending'" @click="reject(log)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Reject</button>
          </td>
        </tr>
        <tr v-if="logs.length === 0">
          <td colspan="4" class="px-4 py-3 text-center text-gray-500">No logs found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLogStore } from '@/stores/logStore';

const props = defineProps({
  studentId: Number
});

const logStore = useLogStore();
const logs = ref([]);

// Load logs for current student
const loadLogs = () => logs.value = logStore.fetchLogsByStudent(props.studentId);

const approve = (log) => logStore.approveLog(log.id);
const reject = (log) => logStore.rejectLog(log.id);

watch(() => props.studentId, loadLogs, { immediate: true });
</script>