import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AddLog from "../views/AddLog.vue";
import ProfileCard from "../components/ProfileCard.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  //   {
  //   path: "/ProfileCard",
  //   name: "ProfileCard",
  //   component: ProfileCard,
  // },
  {
    path: "/add-log",
    name: "AddLog",
    component: AddLog,
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
