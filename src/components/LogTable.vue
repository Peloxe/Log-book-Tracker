<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-semibold mb-4">Logs for {{ student?.name }}</h2>

    <!-- Logs Table -->
    <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200 table-fixed">
        <thead class="bg-gray-50">
          <tr>
            <th class="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="w-2/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
            <th class="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
            <td class="px-6 py-3">{{ log.date }}</td>
            <td class="px-6 py-3 text-blue-600 cursor-pointer hover:underline truncate" title="Click to view details" @click="openModal(log)">
              {{ log.task }}
            </td>
            <td class="px-6 py-3 space-y-2">
              <!-- Approved / Rejected -->
              <span
                v-if="log.status === 'Approved' || log.status === 'Rejected'"
                :class="{
                  'bg-green-600': log.status === 'Approved',
                  'bg-red-600': log.status === 'Rejected',
                  'text-white px-2 py-1 rounded-full text-sm font-semibold': true
                }"
              >
                {{ log.status }}
              </span>

              <!-- Pending logs: only show buttons -->
              <div v-else class="space-x-2">
                <button
                  @click="approve(log.id)"
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  @click="reject(log.id)"
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Overlay -->
    <transition name="fade">
      <div
        v-if="activeLog"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 relative overflow-y-auto max-h-[90vh]">
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ✖
          </button>
          <h3 class="text-2xl font-semibold mb-4">{{ activeLog.task }}</h3>

          <!-- Description box -->
          <div class="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 max-h-96 overflow-y-auto">
            <p class="text-gray-700 whitespace-pre-line">{{ activeLog.description }}</p>
          </div>

          <p class="text-gray-700 mb-2"><strong>Date:</strong> {{ activeLog.date }}</p>
          <p class="text-gray-700 mb-2"><strong>Hours Worked:</strong> {{ activeLog.hours || 0 }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentStore } from '@/stores/studentStore';
import { useLogStore } from '@/stores/logStore';

const route = useRoute();
const studentId = parseInt(route.params.studentId);

const studentStore = useStudentStore();
const logStore = useLogStore();
logStore.initLogs(studentStore.students);

const student = computed(() => studentStore.students.find(s => s.id === studentId));
const logs = computed(() => logStore.getLogsByStudent(studentId));

const activeLog = ref(null);

function openModal(log) {
  activeLog.value = log;
}

function closeModal() {
  activeLog.value = null;
}

function approve(logId) {
  logStore.updateStatus(logId, 'Approved');
}

function reject(logId) {
  logStore.updateStatus(logId, 'Rejected');
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>