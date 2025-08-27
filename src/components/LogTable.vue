<!-- LogTable.vue -->
<template>
  <div>
    <h2 class="text-xl font-bold m-4">
      {{ route.params.fullName }}'s Logs
    </h2>

    <!-- If no logs -->
    <div v-if="!logStore.logs.length" class="p-4 text-gray-500 italic">
      This student hasn't filled any log yet.
    </div>

    <!-- If logs exist -->
    <table v-else class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr class="bg-gray-50">
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="log in logStore.logs"
          :key="log.id"
          class="hover:bg-gray-50"
        >
          <td class="px-6 py-3">{{ log.date }}</td>

          <!-- Clickable log content -->
          <td
            class="px-6 py-3 text-blue-600 underline cursor-pointer"
            @click="openLog(log)"
          >
            {{ log.content }}
          </td>

          <td class="px-6 py-3">{{ log.hours_worked }}</td>
          <td class="px-6 py-3 capitalize">{{ log.status }}</td>
          <td class="px-6 py-3 flex gap-2">
            <!-- Approved -->
            <span v-if="log.status === 'approved'" class="text-gray-500 italic">
              Can't edit anymore
            </span>

            <!-- Pending -->
            <template v-else-if="log.status === 'pending'">
              <button
                class="px-3 py-1 bg-green-600 text-white rounded"
                @click="logStore.updateLogStatus(log.id, 'approved')"
              >
                Approve
              </button>
              <button
                class="px-3 py-1 bg-red-600 text-white rounded"
                @click="logStore.updateLogStatus(log.id, 'rejected')"
              >
                Reject
              </button>
            </template>

            <!-- Rejected -->
            <template v-else-if="log.status === 'rejected'">
              <button
                class="px-3 py-1 bg-green-600 text-white rounded"
                @click="logStore.updateLogStatus(log.id, 'approved')"
              >
                Approve
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Log Detail Modal -->
    <div
      v-if="selectedLog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          @click="selectedLog = null"
        >
          ✕
        </button>
        <h2 class="text-xl font-semibold mb-4">Log Details</h2>
        <p><strong>Date:</strong> {{ selectedLog.date }}</p>
        <p><strong>Hours Worked:</strong> {{ selectedLog.hours_worked }}</p>
        <p><strong>Details:</strong> {{ selectedLog.content }}</p>
        <p>
          <strong>Status:</strong>
          <span
            :class="{
              'text-green-600': selectedLog.status === 'approved',
              'text-red-600': selectedLog.status === 'rejected',
              'text-yellow-600': selectedLog.status === 'pending'
            }"
          >
            {{ selectedLog.status }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLogStore } from '@/stores/logStore'

const route = useRoute()
const logStore = useLogStore()

const selectedLog = ref(null)

const openLog = (log) => {
  selectedLog.value = log
}

onMounted(() => {
  logStore.fetchLogs(route.params.userId)
})
</script>
