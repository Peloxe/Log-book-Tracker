<template>
  <div class="p-4">
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search student by name..."
        class="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>

    <!-- Assignment Table -->
    <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm w-full">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(student, index) in displayedStudents" :key="student.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-3 font-medium">{{ index + 1 }}</td>
            <td class="px-6 py-3 text-blue-600 cursor-pointer hover:underline">{{ student.name }}</td>
            <td class="px-6 py-3">{{ getSupervisorName(student.supervisorId) }}</td>
          </tr>
          <tr v-if="displayedStudents.length === 0">
            <td colspan="3" class="px-6 py-3 text-center text-gray-500">No students found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStudentStore } from '@/stores/studentStore';
import { useSupervisorStore } from '@/stores/supervisorStore';

const studentStore = useStudentStore();
const supervisorStore = useSupervisorStore();
const searchTerm = ref('');

// Reactive filtered students (searchable, max 20)
const displayedStudents = computed(() => {
  return studentStore.students
    .filter(student =>
      student.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    .slice(0, 20);
});

// Get supervisor name or 'Unassigned'
const getSupervisorName = (id) => {
  const sup = supervisorStore.fetchSupervisor(id);
  return sup ? sup.name : 'Unassigned';
};
</script>