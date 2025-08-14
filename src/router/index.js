import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '@/pages/LandingPage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ProfilePage from '@/pages/ProfileSetup.vue';


const routes = [
  { path: '/', component: LandingPage },
  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

