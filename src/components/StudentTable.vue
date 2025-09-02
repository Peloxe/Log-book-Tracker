<template>
  <div class="overflow-x-auto w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matric_number</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(student, index) in studentStore.students"
          :key="student.id"
          class="hover:bg-gray-50 cursor-pointer"
          @click="$router.push({ name: 'LogTable', params: { userId: student.id, fullName:student.full_name } })"
        >
          <td class="px-6 py-3">{{ index + 1 }}</td>
          <td class="px-6 py-3 text-blue-600 hover:underline">{{ student.full_name }}</td>
          <td class="px-6 py-3 text-sm">
            {{ student.profile.matric_number }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStudentStore } from '@/stores/studentStore';
import { useLogStore } from '@/stores/logStore';

const studentStore = useStudentStore();
const logStore = useLogStore();

onMounted(() => {
  studentStore.fetchAssignedStudents();
});

// compute student status based on logs
function studentStatus(userId) {
  const logs = logStore.logs.filter(l => l.user_id === userId);
  if (!logs.length) return 'Pending';
  if (logs.every(l => l.status === 'approved')) return 'Approved';
  if (logs.some(l => l.status === 'rejected')) return 'Rejected';
  return 'Pending';
}
</script>
