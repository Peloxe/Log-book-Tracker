import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/utils/axios"; // Adjust the import path as necessary


export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);

  const isAuthenticated = computed(() => !!token.value);

  function setAuth(data) {
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem("token", data.token);
  }

  async function login(credentials) {
    try {
      const res = await api.post("/auth/login", credentials);
      setAuth(res.data);
    } catch (err) {
      throw err.response?.data || err;
    }
  }

  async function register(payload) {
    try {
      const res = await api.post("/auth/register", payload);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  }

  async function fetchUser() {
    try {
      const res = await api.get("/auth/me");
      user.value = res.data;
    } catch (err) {
      logout();
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  }

  return { user, token, isAuthenticated, setAuth, logout };
});
