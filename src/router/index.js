import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Exhibition from '../views/Exhibition.vue';
import Organization from '../views/Organization.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/exhibition',
    name: 'Exhibition',
    component: Exhibition,
  },
  {
    path: '/organization',
    name: 'Organization',
    component: Organization,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
