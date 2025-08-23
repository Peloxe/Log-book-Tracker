import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSupervisorStore = defineStore('supervisor', () => {
  const supervisors = ref([
    { id: 1, name: 'Dr. Smith', department: 'Computer Science', university: 'Tech University' },
    { id: 2, name: 'Prof. Johnson', department: 'Engineering', university: 'Tech University' }
  ]);

  const fetchSupervisor = (id) => supervisors.value.find(s => s.id === id);

  return { supervisors, fetchSupervisor };
});