import { createRouter, createWebHistory } from 'vue-router';



import LandingPage from '@/pages/LandingPage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import VerificationForm from '@/components/VerificationForm.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ProfilePage from '@/pages/ProfileSetup.vue';
import StudentProfile from '@/pages/StudentProfile.vue';
import SupervisorProfilePage from '@/pages/SupervisorProfilePage.vue';
import AdminProfilePage from '@/pages/AdminProfilePage.vue';



const routes = [
  { path: '/', component: LandingPage },
  { path: '/verify', component: VerificationForm },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
  { path: '/student', component: StudentProfile },
  { path: '/supervisor', component: SupervisorProfilePage },
  { path: '/admin', component: AdminProfilePage },
  
  {
  path: '/signup/:role(student|supervisor|admin)',
  name: 'RoleForm',
  component: SignupPage,
  props: true
},

  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/student",
  //   name: "StudentDashboard",
  //   component: () => import(""),
  //   meta: { requiresAuth: true, role: "student" },
  // },
  // {
  //   path: "/supervisor",
  //   name: "SupervisorDashboard",
  //   component: () => import(""),
  //   meta: { requiresAuth: true, role: "supervisor" },
  // },
  // {
  //   path: "/admin",
  //   name: "AdminDashboard",
  //   component: () => import(""),
  //   meta: { requiresAuth: true, role: "admin" },
  // },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Route Guards
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();

//   if (to.meta.requiresAuth && !auth.isAuthenticated) {
//     return next("/login");
//   }

//   if (to.meta.role && auth.user?.role !== to.meta.role) {
//     return next("/");
//   }

//   next();
// });

export default router;

