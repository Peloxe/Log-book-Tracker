<template>
<div v-if="auth.loadingUser" class="flex justify-center items-center min-h-screen text-gray-600 dark:text-gray-300">
    Loading supervisor dashboard…
  </div>

  <div v-else class="p-6 space-y-6">
    <!-- Supervisor Profile -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img v-if="user?.profile.photo" :src="baseURL + user.profile.photo" alt="Profile Picture" class="w-full h-full object-cover" />
          <img v-else src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="Default Avatar" class="w-full h-full object-cover" />
        </div>
        <div>
          <h2 class="text-xl font-bold">{{ user?.full_name }}</h2>
          <p class="text-gray-600">{{ user?.department }}</p>
          <p class="text-gray-600">{{ user?.school_name }}</p>
        </div>
      </div>
      <router-link to="/assign" class="bg-gradient-to-r from-blue-400 to-blue-600 h-10 rounded px-4 py-2 text-sm md:text-base text-white">Assign Students</router-link>
    </div>

    <!-- Summary Cards with Icons -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <div
        class="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow rounded-lg p-6 flex items-center space-x-4">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M12 12a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
        <div>
          <div class="text-3xl font-bold">{{ assignedStudents.length }}</div>
          <div class="mt-1 text-sm font-medium">Assigned Students</div>
        </div>
      </div>

      <div
        class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow rounded-lg p-6 flex items-center space-x-4">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
        <div>
          <div class="text-3xl font-bold">**</div>
          <div class="mt-1 text-sm font-medium">Logs Pending Review</div>
        </div>
      </div>

      <div
        class="bg-gradient-to-r from-green-400 to-green-600 text-white shadow rounded-lg p-6 flex items-center space-x-4">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <div class="text-3xl font-bold">**</div>
          <div class="mt-1 text-sm font-medium">Logs Reviewed</div>
        </div>
      </div>
    </div>

    <!-- Student Table -->
    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-4">Assigned Students</h3>
      <StudentTable :supervisorId="supervisorId" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useSupervisorStore } from '@/stores/supervisorStore';
import { useStudentStore } from '@/stores/studentStore';
import { useLogStore } from '@/stores/logStore';
import StudentTable from '@/components/StudentTable.vue';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const supervisorId = 1; // logged-in supervisor
const supervisorStore = useSupervisorStore();
const studentStore = useStudentStore();
const logStore = useLogStore();
const auth = useAuthStore();

const user = computed(() => auth.user);
onMounted(() => {
  if (!auth.user) auth.fetchUser(); // ensure user is loaded
});

const supervisor = computed(() =>
  supervisorStore.supervisors.find(s => s.id === supervisorId)
);

const assignedStudents = computed(() => studentStore.students);

// const pendingLogs = computed(() =>
//   assignedStudents.value.reduce((total, student) => {
//     return total + logStore.getLogsByStudent(student.id).filter(l => l.status === 'Pending').length;
//   }, 0)
// );

// const reviewedLogs = computed(() =>
//   assignedStudents.value.reduce((total, student) => {
//     return total + logStore.getLogsByStudent(student.id).filter(l => l.status !== 'Pending').length;
//   }, 0)
// );
</script>