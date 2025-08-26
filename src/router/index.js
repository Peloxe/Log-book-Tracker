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
import { useAuthStore } from "@/stores/auth";

const routes = [
  { path: "/", component: LandingPage, meta: { requiresGuest: true } },
  { path: "/verify", component: VerificationForm, meta: { requiresPendingEmail: true }, },
  { path: "/login", component: LoginPage, meta: { requiresGuest: true } },
  { path: "/profile", component: ProfilePage, meta: { requiresAuth: true }  },
  { path: "/student-setup", component: StudentProfileSetup, meta: { requiresAuth: true }  },
  { path: "/supervisor-setup", component: SupervisorProfileSetup, meta: { requiresAuth: true }  },
  { path: "/admin-setup", component: AdminProfileSetup,meta: { requiresAuth: true }  },

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
    meta: { requiresAuth: true } 
  },
    {
    path: "/ProfileCard",
    name: "ProfileCard",
    component: ProfileCard,
    meta: { requiresAuth: true } 
  },
  {
    path: "/add-log",
    name: "AddLog",
    component: AddLog,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresPendingEmail) {
    const pendingEmail = localStorage.getItem("pendingEmail");

    if (!pendingEmail) {
      // No pending email → don’t allow verify page
      return next("/"); // or "/login"
    }
  }
  // If logged in and going to a guest-only page (like login/register)
  if (to.meta.requiresGuest && auth.accessToken) {
    // Avoid infinite redirect → only redirect if not already in a dashboard
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.role) {
      return next(`/${user.role}/dashboard`);
    }

    return next("/"); // fallback, but won’t loop
  }

  // If route requires auth but not logged in
  if (to.meta.requiresAuth && !auth.accessToken) {
    return next("/login");
  }

  next();
});
export default router;
