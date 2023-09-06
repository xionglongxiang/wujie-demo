import Home from '../views/Home.vue';

const _import = (name: string) => () => import(`../views/${name}.vue`);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/dialog",
    name: "Dialog",
    meta: {
      title: "弹窗",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: _import("Dialog"),
  },
  {
    path: "/location",
    name: "Location",
    meta: {
      title: "路由",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: _import("Location"),
  },
  {
    path: "/state",
    name: "State",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: _import("State"),
  },
  {
    path: "/contact",
    name: "Contact",
    meta: {
      title: "通信",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: _import("Communication"),
  },
];

export default routes;
