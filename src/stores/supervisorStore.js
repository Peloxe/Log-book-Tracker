import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useSupervisorStore = defineStore('supervisor', () => {
  const supervisors = ref([
    { id: 1, name: 'Dr. Smith', department: 'Computer Science', university: 'Tech University', profilePicture: null },
    { id: 2, name: 'Prof. Johnson', department: 'Engineering', university: 'Tech University', profilePicture: null }
  ]);

  // Current logged-in supervisor (for admin this is optional, but we keep it for consistency)
  const currentSupervisor = ref(JSON.parse(localStorage.getItem('currentSupervisor')) || supervisors.value[0]);

  const loggedInSupervisorId = computed(() => currentSupervisor.value?.id);

  const fetchSupervisor = (id) => supervisors.value.find(s => s.id === id);

  const updateProfilePicture = (file) => {
    if (!file || !currentSupervisor.value) return;
    const reader = new FileReader();
    reader.onload = () => currentSupervisor.value.profilePicture = reader.result;
    reader.readAsDataURL(file);
  };

  const removeProfilePicture = () => {
    if (currentSupervisor.value) currentSupervisor.value.profilePicture = null;
  };

  // Persist current supervisor
  watch(currentSupervisor, (val) => {
    localStorage.setItem('currentSupervisor', JSON.stringify(val));
  }, { deep: true });

  return { supervisors, currentSupervisor, loggedInSupervisorId, fetchSupervisor, updateProfilePicture, removeProfilePicture };
});