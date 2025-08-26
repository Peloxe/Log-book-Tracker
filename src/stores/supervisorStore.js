import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSupervisorStore = defineStore('supervisor', () => {
  const supervisors = ref([
    { id: 1, name: 'Dr. Smith', department: 'Computer Science', university: 'Tech University' },
    { id: 2, name: 'Prof. Johnson', department: 'Engineering', university: 'Tech University' }
  ]);

  // Auto-login first supervisor by default
  const currentSupervisor = ref(supervisors.value[0]);

  const fetchSupervisor = (id) => supervisors.value.find(s => s.id === id);

  const loginSupervisor = (id) => {
    const sup = fetchSupervisor(id);
    if (sup) currentSupervisor.value = sup;
  };

  return { supervisors, fetchSupervisor, currentSupervisor, loginSupervisor };
});