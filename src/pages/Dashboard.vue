<template>
  <div class="p-4 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
    <!-- Profile Sidebar -->
    <div class="md:w-1/4 flex-shrink-0">
      <Profile />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center w-full">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full mb-6">
        <div class="p-4 bg-blue-100 rounded shadow text-center">
          <h3 class="text-sm font-semibold text-gray-700">Total Students</h3>
          <p class="mt-2 text-2xl font-bold text-gray-900">{{ totalStudents }}</p>
        </div>
        <div class="p-4 bg-yellow-100 rounded shadow text-center">
          <h3 class="text-sm font-semibold text-gray-700">Pending Logs</h3>
          <p class="mt-2 text-2xl font-bold text-gray-900">{{ pendingLogs }}</p>
        </div>
        <div class="p-4 bg-green-100 rounded shadow text-center">
          <h3 class="text-sm font-semibold text-gray-700">Approved Logs</h3>
          <p class="mt-2 text-2xl font-bold text-gray-900">{{ approvedLogs }}</p>
        </div>
        <div class="p-4 bg-red-100 rounded shadow text-center">
          <h3 class="text-sm font-semibold text-gray-700">Rejected Logs</h3>
          <p class="mt-2 text-2xl font-bold text-gray-900">{{ rejectedLogs }}</p>
        </div>
      </div>

      <!-- Student Table -->
      <div class="w-full">
        <StudentTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStudentStore } from '@/stores/studentStore';
import Profile from '@/pages/Profile.vue';
import StudentTable from '@/components/StudentTable.vue';

const studentStore = useStudentStore();
const supervisorId = 1; // Replace with logged-in supervisor

// Only students assigned to this supervisor
const assignedStudents = computed(() =>
  studentStore.students.filter(s => s.supervisorId === supervisorId)
);

// Summary card counts (reactive)
const totalStudents = computed(() => assignedStudents.value.length);
const pendingLogs = computed(() => assignedStudents.value.filter(s => s.status === 'Pending').length);
const approvedLogs = computed(() => assignedStudents.value.filter(s => s.status === 'Approved').length);
const rejectedLogs = computed(() => assignedStudents.value.filter(s => s.status === 'Rejected').length);
</script>