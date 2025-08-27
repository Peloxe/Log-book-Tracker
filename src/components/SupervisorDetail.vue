<template>
  <div class="bg-white shadow rounded-lg p-6 transition hover:shadow-lg">
    <h3 class="text-xl font-semibold mb-4 text-gray-800">{{ supervisor.name }}</h3>
    <p class="text-gray-500 mb-2"><span class="font-medium">Department:</span> {{ supervisor.department }}</p>
    <p class="text-gray-500 mb-4"><span class="font-medium">University:</span> {{ supervisor.university }}</p>

    <h4 class="text-lg font-semibold mb-2 text-gray-700">Assigned Students</h4>
    <ul class="divide-y divide-gray-200">
      <li v-for="student in students" :key="student.id" class="py-2 text-gray-800">
        {{ student.name }}
      </li>
      <li v-if="students.length === 0" class="py-2 text-gray-400 italic">No students assigned.</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  supervisor: { type: Object, required: true },
  students: { type: Array, required: true }
});
</script>