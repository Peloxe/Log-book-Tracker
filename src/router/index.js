import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import VerificationForm from "@/components/VerificationForm.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ProfilePage from "@/pages/ProfileSetup.vue";
import StudentProfileSetup from "@/pages/StudentProfileSetup.vue";
import SupervisorProfileSetup from "@/pages/SupervisorProfileSetup.vue";
import AdminProfileSetup from "@/pages/AdminProfilePage.vue";
import Dashboard from "../views/Dashboard.vue";
import AddLog from "../views/AddLog.vue";
import ProfileCard from "../components/ProfileCard.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/verify", component: VerificationForm },
  { path: "/login", component: LoginPage },
  { path: "/profile", component: ProfilePage },
  { path: "/student-setup", component: StudentProfileSetup },
  { path: "/supervisor-setup", component: SupervisorProfileSetup },
  { path: "/admin-setup", component: AdminProfileSetup },

  {
    path: "/signup/:role(student|supervisor|admin)",
    name: "RoleForm",
    component: SignupPage,
    props: true,
  },

  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/student/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
    {
    path: "/ProfileCard",
    name: "ProfileCard",
    component: ProfileCard,
  },
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
