import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSupervisorStore = defineStore('supervisor', () => {
  // List of supervisors
  const supervisors = ref([
    { id: 1, name: 'Dr. Smith', department: 'Computer Science', university: 'Tech University', profilePicture: null },
    { id: 2, name: 'Prof. Johnson', department: 'Engineering', university: 'Tech University', profilePicture: null }
  ]);

  // Load current supervisor from localStorage OR default to first supervisor
  const currentSupervisor = ref(
    JSON.parse(localStorage.getItem('currentSupervisor')) || supervisors.value[0]
  );

  // Fetch supervisor by ID
  const fetchSupervisor = (id) => supervisors.value.find(s => s.id === id);

  // Update supervisor profile picture
  const updateProfilePicture = (file) => {
    if (!file || !currentSupervisor.value) return;

    const reader = new FileReader();
    reader.onload = () => {
      currentSupervisor.value.profilePicture = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // Remove supervisor profile picture
  const removeProfilePicture = () => {
    if (currentSupervisor.value) {
      currentSupervisor.value.profilePicture = null;
    }
  };

  // Automatically persist current supervisor in localStorage
  watch(
    currentSupervisor,
    (newVal) => {
      localStorage.setItem('currentSupervisor', JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    supervisors,
    currentSupervisor,
    fetchSupervisor,
    updateProfilePicture,
    removeProfilePicture
  };
});