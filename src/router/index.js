// import { createRouter, createWebHistory } from 'vue-router';
// import LoginPage from '@/components/auth/LoginForm.vue';
// import RegisterPage from '@/pages/RegisterPage.vue';
// import ProfilePage from '@/pages/ProfilePage.vue';

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/profile', component: ProfilePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

