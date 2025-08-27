import router from "@/router/router";
import { defineStore } from "pinia";
import axios from "axios";
import api from "@/utils/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: null,
    user: null,
    pendingEmail: localStorage.getItem("pendingEmail") || null,
    loadingUser: false,
  }),

  actions: {
    async signup(payload) {
      const res = await api.post("/api/v1/users/register/", payload);
      this.pendingEmail = payload.email;
      localStorage.setItem("pendingEmail", payload.email);
      return res.data;
    },

    async verifyAccount(code) {
      const payload = { email: this.pendingEmail, code };
      console.log("📤 Verify payload:", payload);

      const res = await api.post("/api/v1/users/verify-code/", payload);

      console.log("🔑 Verify response:", res.data);

      this.accessToken = res.data.access;
      this.refreshToken = res.data.refresh;

      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);

      this.pendingEmail = null;
      localStorage.removeItem("pendingEmail");

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.accessToken}`;

      console.log("📥 Fetching user with token:", this.accessToken);
      await this.fetchUser(true); // 🔥 trigger redirect after verify
    },

    async login(credentials) {
      const res = await api.post("/api/login/", credentials);

      console.log("🔑 Login response:", res.data);

      this.accessToken = res.data.access;
      this.refreshToken = res.data.refresh;

      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.accessToken}`;

      console.log("📥 Fetching user with token:", this.accessToken);
      await this.fetchUser(true); // 🔥 trigger redirect after login
    },

    async fetchUser(redirect = false) {
      if (!this.accessToken) {
        console.warn("⚠️ No access token, skipping fetchUser");
        return;
      }

      this.loadingUser = true;
      try {
        console.log("➡️ Calling /users/detail with token:", this.accessToken);
        const res = await api.get("/api/v1/users/detail/");
        this.user = res.data;
        localStorage.setItem("user", JSON.stringify(this.user)); // ✅ cache user
        console.log("✅ User fetched:", res.data);

        if (redirect) {
          if (this.user.profile) {
            console.log("🚀 Profile exists → redirecting to Dashboard");
            switch (this.user.role) {
              case "student":
                router.push("/student/dashboard");
                break;
              case "supervisor":
                router.push("/supervisor/dashboard");
                break;
              case "admin":
                router.push("/admin/dashboard");
                break;
              default:
                console.error("❌ Unknown role, staying put");
            }
          } else {
            console.log("⚠️ No profile found, checking role:", this.user.role);
            switch (this.user.role) {
              case "student":
                router.push("/student-setup");
                break;
              case "supervisor":
                router.push("/supervisor-setup");
                break;
              case "admin":
                router.push("/admin-setup");
                break;
              default:
                console.error("❌ Unknown role, staying put");
            }
          }
        }
      } catch (err) {
        console.error("❌ Failed to fetch user:", err.response?.data || err);
      } finally {
        this.loadingUser = false;
      }
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      this.pendingEmail = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("pendingEmail");
      localStorage.removeItem("user"); // ✅ remove cached user

      delete axios.defaults.headers.common["Authorization"];
    },

    init() {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const cachedUser = localStorage.getItem("user");

      if (accessToken && refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        this.fetchUser();
      }

      if (cachedUser) {
        this.user = JSON.parse(cachedUser);
        console.log("♻️ Restored cached user:", this.user);
      }

      this.pendingEmail = localStorage.getItem("pendingEmail") || null;
    },
  },
});
