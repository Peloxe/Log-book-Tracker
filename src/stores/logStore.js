// src/stores/logStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/utils/axios'

export const useLogStore = defineStore('log', () => {
  const logs = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // fetch logs by student user_id
  const fetchLogs = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get(`/api/v1/log/list/?user_id=${userId}`);
      logs.value = res.data;
    } catch (err) {
      error.value = err.response?.data || err.message;
    } finally {
      loading.value = false;
    }
  };

  // update log status (approve/reject)
  const updateLogStatus = async (logId, status) => {
    try {
      await api.patch(`/api/v1/log/${logId}/status/`, { status });
      // update locally
      const index = logs.value.findIndex(l => l.id === logId);
      if (index !== -1) logs.value[index].status = status;
    } catch (err) {
      console.error("Failed to update log status:", err.response?.data || err.message);
      throw err;
    }
  };

  return { logs, loading, error, fetchLogs, updateLogStatus };
});
