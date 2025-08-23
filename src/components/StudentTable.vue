<template>
  <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            #
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Student Name
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(student, index) in displayedStudents"
          :key="student.id"
          class="hover:bg-gray-50 transition"
        >
          <td class="px-6 py-3 font-medium">{{ index + 1 }}</td>
          <td
            class="px-6 py-3 text-blue-600 font-medium cursor-pointer hover:underline"
            @click="$router.push({ name: 'LogReview', params: { studentId: student.id } })"
          >
            {{ student.name }}
          </td>
          <td class="px-6 py-3">
            <span
              v-if="student.status === 'Approved'"
              class="px-2 py-1 rounded-full bg-green-600 text-white text-sm font-semibold"
            >
              Approved
            </span>
            <span
              v-else-if="student.status === 'Rejected'"
              class="px-2 py-1 rounded-full bg-red-600 text-white text-sm font-semibold"
            >
              Rejected
            </span>
            <span
              v-else
              class="px-2 py-1 rounded-full bg-yellow-500 text-white text-sm font-semibold"
            >
              Pending
            </span>
          </td>
          <td class="px-6 py-3 space-x-2">
            <button
              v-if="student.status === 'Pending'"
              @click="approve(student)"
              class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Approve
            </button>
            <button
              v-if="student.status === 'Pending'"
              @click="reject(student)"
              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Reject
            </button>
          </td>
        </tr>
        <tr v-if="displayedStudents.length === 0">
          <td colspan="4" class="px-6 py-3 text-center text-gray-500">
            No students assigned.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStudentStore } from '@/stores/studentStore';

const studentStore = useStudentStore();
const supervisorId = 1; // logged-in supervisor

// Show only assigned students, max 10
const displayedStudents = computed(() =>
  studentStore.students.filter(s => s.supervisorId === supervisorId).slice(0, 10)
);

// Approve / Reject updates status reactively
const approve = (student) => studentStore.updateStatus(student.id, 'Approved');
const reject = (student) => studentStore.updateStatus(student.id, 'Rejected');
</script>