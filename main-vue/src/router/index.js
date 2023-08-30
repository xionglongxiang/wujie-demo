import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Multiple from '../views/Multiple.vue';
import React17Sub from '../views/React17-sub.vue';
import React17 from '../views/React17.vue';
import ViteSub from '../views/Vite-sub.vue';
import Vite from '../views/Vite.vue';
import Vue2Sub from '../views/Vue2-sub.vue';
import Vue2 from '../views/Vue2.vue';
import Vue3Sub from '../views/Vue3-sub.vue';
import Vue3 from '../views/Vue3.vue';

const basename = process.env.NODE_ENV === "production" ? "/demo-main-vue/" : "";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/react17",
    name: "react17",
    component: React17,
  },
  {
    path: "/react17-sub/:path",
    name: "react17-sub",
    component: React17Sub,
  },
  {
    path: "/vue2",
    name: "vue2",
    component: Vue2,
  },
  {
    path: "/vue2-sub/:path",
    name: "vue2-sub",
    component: Vue2Sub,
  },
  {
    path: "/vite",
    name: "vite",
    component: Vite,
  },
  {
    path: "/vite-sub/:path",
    name: "vite-sub",
    component: ViteSub,
  },
  {
    path: "/vue3",
    name: "vue3",
    component: Vue3,
  },
  {
    path: "/vue3-sub/:path",
    name: "vue3-sub",
    component: Vue3Sub,
  },
  {
    path: "/all",
    name: "all",
    component: Multiple,
  },
  {
    path: "/",
    redirect: "/home",
  },
];

const router = new VueRouter({
  mode: "history",
  base: basename,
  routes,
});

export default router;
