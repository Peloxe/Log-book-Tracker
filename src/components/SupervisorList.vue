<template>
  <div class="bg-white shadow rounded-lg p-4 h-full overflow-y-auto">
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Supervisors</h3>
    <table class="min-w-full divide-y divide-gray-200">
      <tbody class="divide-y divide-gray-200">
        <tr v-for="sup in supervisors" :key="sup.id"
          class="hover:bg-blue-50 cursor-pointer transition-colors duration-200"
          @click="$emit('selectSupervisor', sup)">
          <td class="px-4 py-2 text-blue-700 font-medium hover:underline">{{ sup.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup>
const props = defineProps({
  supervisors: { type: Array, required: true }
});
</script>
