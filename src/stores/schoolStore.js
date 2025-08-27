import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSchoolStore = defineStore('school', () => {
  // Always start as unregistered
  const isRegistered = ref(false);
  const name = ref('');

  // Register school (state only in current session)
  const registerSchool = (schoolName) => {
    name.value = schoolName;
    isRegistered.value = true;
  };

  return { isRegistered, name, registerSchool };
});