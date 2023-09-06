import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import Home from '../views/Home.vue';

const basename = process.env.NODE_ENV === "production" ? "/demo-vue3/" : "";

export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/dialog",
    name: "Dialog",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dialog.vue"),
    meta: {
      title: "弹窗",
    },
  },
  {
    path: "/location",
    name: "Location",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Location.vue"),
    meta: {
      title: "路由",
    },
  },
  {
    path: "/state",
    name: "State",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/State.vue"),
    meta: {
      title: "状态",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Communication.vue"),
    meta: {
      title: "通信",
    },
  },
];

const router = createRouter({
  history: createWebHistory(basename),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("==vue3:router:to", to.path, from.path);

  window.$wujie?.bus.$emit("sub-route-change", "v-user", to.path);
  next();
});

export default router;
