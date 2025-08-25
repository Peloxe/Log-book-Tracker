// import { createRouter, createWebHistory } from 'vue-router';



import LandingPage from '@/pages/LandingPage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import VerificationForm from '@/components/VerificationForm.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ProfilePage from '@/pages/ProfileSetup.vue';



// const routes = [
//   { path: '/', component: LandingPage },
//   { path: '/verify', component: VerificationForm },
//   { path: '/login', component: LoginPage },
//   { path: '/profile', component: ProfilePage },
//   {
//   path: '/signup/:role(student|supervisor|admin)',
//   name: 'RoleForm',
//   component: SignupPage,
//   props: true
// },

//   {
//     path: "/profile",
//     name: "ProfilePage",
//     component: ProfilePage,
//     meta: { requiresAuth: true },
//   },
//   // {
//   //   path: "/student",
//   //   name: "StudentDashboard",
//   //   component: () => import(""),
//   //   meta: { requiresAuth: true, role: "student" },
//   // },
//   // {
//   //   path: "/supervisor",
//   //   name: "SupervisorDashboard",
//   //   component: () => import(""),
//   //   meta: { requiresAuth: true, role: "supervisor" },
//   // },
//   // {
//   //   path: "/admin",
//   //   name: "AdminDashboard",
//   //   component: () => import(""),
//   //   meta: { requiresAuth: true, role: "admin" },
//   // },
// ];


// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

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

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AddLog from "../views/AddLog.vue";
import ProfileCard from "../components/ProfileCard.vue";

const routes = [
  { path: '/', component: LandingPage },
  { path: '/verify', component: VerificationForm },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
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
