import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';

export const useSupervisorStore = defineStore('supervisor', () => {
  const supervisors = ref([
    { id: 1, name: 'Dr. Smith', department: 'Computer Science', university: 'Tech University', profilePicture: null },
    { id: 2, name: 'Prof. Johnson', department: 'Engineering', university: 'Tech University', profilePicture: null }
  ]);

  // Current supervisor object
  const currentSupervisor = ref(
    JSON.parse(localStorage.getItem('currentSupervisor')) || supervisors.value[0]
  );

  // Reactive logged-in supervisor ID
  const loggedInSupervisorId = computed(() => currentSupervisor.value?.id);

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

  // Remove profile picture
  const removeProfilePicture = () => {
    if (currentSupervisor.value) currentSupervisor.value.profilePicture = null;
  };

  // Persist current supervisor in localStorage
  watch(
    currentSupervisor,
    (newVal) => localStorage.setItem('currentSupervisor', JSON.stringify(newVal)),
    { deep: true }
  );

  return {
    supervisors,
    currentSupervisor,
    loggedInSupervisorId,
    fetchSupervisor,
    updateProfilePicture,
    removeProfilePicture
  };
});