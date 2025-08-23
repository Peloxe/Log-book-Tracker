<template>
  <div class="overflow-x-auto w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(student, index) in filteredStudents"
          :key="student.id"
          class="hover:bg-gray-50 cursor-pointer"
          @click="$router.push({ name: 'LogTable', params: { studentId: student.id } })"
        >
          <td class="px-6 py-3">{{ index + 1 }}</td>
          <td class="px-6 py-3 text-blue-600 hover:underline">{{ student.name }}</td>
          <td class="px-6 py-3">
            <span
              v-if="studentStatus(student.id) === 'Approved'"
              class="px-2 py-1 rounded-full bg-green-600 text-white text-sm font-semibold"
            >Approved</span>
            <span
              v-else-if="studentStatus(student.id) === 'Rejected'"
              class="px-2 py-1 rounded-full bg-red-600 text-white text-sm font-semibold"
            >Rejected</span>
            <span
              v-else
              class="px-2 py-1 rounded-full bg-yellow-500 text-white text-sm font-semibold"
            >Pending</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStudentStore } from '@/stores/studentStore';
import { useLogStore } from '@/stores/logStore';

const props = defineProps({
  supervisorId: Number
});

const studentStore = useStudentStore();
const logStore = useLogStore();

const filteredStudents = computed(() =>
  studentStore.students.filter(s => s.supervisorId === props.supervisorId)
);

function studentStatus(studentId) {
  const logs = logStore.getLogsByStudent(studentId);
  if (!logs.length) return 'Pending';
  if (logs.every(l => l.status === 'Approved')) return 'Approved';
  if (logs.some(l => l.status === 'Rejected')) return 'Rejected';
  return 'Pending';
}
</script>