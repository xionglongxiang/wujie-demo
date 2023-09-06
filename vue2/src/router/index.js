import Home from "../views/Home.vue";

const routes = [
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
    name: "dialog",
    component: () =>
      import(/* webpackChunkName: "Page1" */ "../views/Dialog.vue"),
    meta: {
      title: "弹窗",
    },
  },
  {
    path: "/communication",
    name: "communication",
    component: () =>
      import(/* webpackChunkName: "Page2" */ "../views/Communication.vue"),
    meta: {
      title: "通信",
    },
  },
  {
    path: "/location",
    name: "location",
    component: () =>
      import(/* webpackChunkName: "Page3" */ "../views/Location.vue"),
    meta: {
      title: "路由",
    },
  },
];

export default routes;
