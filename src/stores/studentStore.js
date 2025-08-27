// src/stores/studentStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/utils/axios'

export const useStudentStore = defineStore('student', () => {
  const students = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // fetch students assigned to current supervisor
  const fetchAssignedStudents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get('/api/v1/users/list-assigned-students/');
      students.value = res.data;
    } catch (err) {
      error.value = err.response?.data || err.message;
    } finally {
      loading.value = false;
    }
  };

  return { students, loading, error, fetchAssignedStudents };
});
