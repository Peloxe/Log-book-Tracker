<template>
  <div class="flex flex-col sm:flex-row gap-6">
    <!-- Supervisors Card -->
    <div
      class="flex-1 bg-blue-600 text-white shadow rounded-lg p-6 flex flex-col items-center justify-center transition hover:shadow-lg">
      <h2 class="text-sm font-medium uppercase tracking-wide">Supervisors</h2>
      <p class="text-4xl font-bold mt-2">{{ supervisors.length }}</p>
    </div>

    <!-- Students Card -->
    <div
      class="flex-1 bg-green-600 text-white shadow rounded-lg p-6 flex flex-col items-center justify-center transition hover:shadow-lg">
      <h2 class="text-sm font-medium uppercase tracking-wide">Students</h2>
      <p class="text-4xl font-bold mt-2">{{ students.length }}</p>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useSupervisorStore } from '@/stores/supervisorStore';
import { useStudentStore } from '@/stores/studentStore';

const supervisorStore = useSupervisorStore();
const studentStore = useStudentStore();

const supervisorCount = computed(() => supervisorStore.supervisors.length);
const studentCount = computed(() => studentStore.students.length);

const props = defineProps({
  supervisors: { type: Array, required: true },
  students: { type: Array, required: true }
});
</script>