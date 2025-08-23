import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/pages/Dashboard.vue';
import Profile from '@/pages/Profile.vue';
import LogTable from '@/components/LogTable.vue';
import LogReview from '@/pages/LogReview.vue';
import Assign from '@/pages/Assign.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard, // this will load when user visits "/"
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/logs/:studentId',
    name: 'LogTable',
    component: LogTable,
    props: true
  },
  {
    path: '/log-review/:studentId',
    name: 'LogReview',
    component: LogReview,
    props: true
  },
  {
    path: '/assign',
    name: 'Assign',
    component: Assign
  },
  {
    path: '/:pathMatch(.)', // catch-all route
    redirect: '/' // redirect unknown routes to dashboard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;