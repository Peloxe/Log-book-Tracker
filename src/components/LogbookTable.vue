<template>
  <div class="overflow-x-auto mt-6">
    <h2 class="text-lg font-semibold mb-2">Logbook Entries</h2>

    <table class="w-full table-auto border border-gray-300 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">Date</th>
          <th class="px-4 py-2 border">Activity</th>
          <th class="px-4 py-2 border">Status</th>
          <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="logs.length === 0">
          <td colspan="4" class="text-center py-4">No log entries yet.</td>
        </tr>
        <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 border">{{ log.date }}</td>
          <td class="px-4 py-2 border">{{ truncate(log.activities) }}</td>
          <td class="px-4 py-2 border">
            <span
              :class="[
                'px-2 py-1 rounded text-xs',
                log.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                log.status === 'Approved' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              ]"
            >
              {{ log.status }}
            </span>
          </td>
          <td class="px-4 py-2 border flex flex-wrap gap-2">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
              @click="$emit('view', log)"
            >
              View
            </button>
            <button
              class="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
              v-if="log.status === 'Pending'"
              @click="$emit('edit', log)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              v-if="log.status === 'Pending'"
              @click="$emit('delete', log.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  logs: {
    type: Array,
    default: () => []
  }
})

function truncate(text, max = 60) {
  return text.length > max ? text.slice(0, max) + '...' : text
}
</script>