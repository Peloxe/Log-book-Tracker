import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/utils/axios";

export const useLogbookStore = defineStore("log", () => {
  const logs = ref([]);

  // ✅ Fetch all logs
  async function fetchLogs() {
    try {
      const res = await api.get("/api/v1/log/list/");
      logs.value = res.data;
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  }

  async function addLog(payload) {
    try {
      const res = await api.post("/api/v1/log/create/", payload);
      logs.value.push(res.data); // keep local state in sync
      return res.data;
    } catch (err) {
      console.error("Failed to add log:", err);
      throw err;
    }
  }


  async function updateLog(id, payload) {
    try {
      const res = await api.put(`/api/v1/log/update/${id}/`, payload);
      const index = logs.value.findIndex((log) => log.id === id);
      if (index !== -1) logs.value[index] = res.data;
      return res.data;
    } catch (err) {
      console.error("Failed to update log:", err);
      throw err;
    }
  }


  async function deleteLog(id) {
    try {
      await api.delete(`/api/v1/log/delete/${id}/`);
      logs.value = logs.value.filter((log) => log.id !== id);
    } catch (err) {
      console.error("Failed to delete log:", err);
      throw err;
    }
  }

  return { logs, fetchLogs, addLog, updateLog, deleteLog };
});
