import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change this to your backend API URL
  withCredentials: true, // if you’re using cookies for auth
});

// Optional: Add auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
