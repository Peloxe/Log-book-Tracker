<template>
  <div class="p-6 bg-gray-100 min-h-screen space-y-6">
    <!-- Stage 1: School Registration -->
    <div v-if="!schoolStore.isRegistered" class="flex justify-center items-center min-h-[60vh]">
      <SchoolRegistrationCard @register="handleRegister" />
    </div>

    <!-- Stage 2: Dashboard -->
    <div v-else class="space-y-6">
      <!-- Top Stats Cards -->
      <DashboardStats :supervisors="supervisorStore.supervisors" :students="studentStore.students" />

      <!-- Supervisor List and Details -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Supervisor List -->
        <SupervisorList :supervisors="supervisorStore.supervisors" @selectSupervisor="selectSupervisor" />

        <!-- Supervisor Detail -->
        <div v-if="selectedSupervisor" class="md:col-span-2">
          <SupervisorDetail :supervisor="selectedSupervisor" :students="getAssignedStudents(selectedSupervisor.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSchoolStore } from '@/stores/schoolStore';
import { useSupervisorStore } from '@/stores/supervisorStore';
import { useStudentStore } from '@/stores/studentStore';

import SchoolRegistrationCard from '@/components/SchoolRegistrationCard.vue';
import DashboardStats from '@/components/DashboardStats.vue';
import SupervisorList from '@/components/SupervisorList.vue';
import SupervisorDetail from '@/components/SupervisorDetail.vue';

const schoolStore = useSchoolStore();
const supervisorStore = useSupervisorStore();
const studentStore = useStudentStore();

const selectedSupervisor = ref(null);

const handleRegister = (schoolName) => {
  schoolStore.registerSchool(schoolName);
};

const selectSupervisor = (supervisor) => {
  selectedSupervisor.value = supervisor;
};

const getAssignedStudents = (supervisorId) => {
  return studentStore.students.filter(s => s.supervisorId === supervisorId);
};
</script>