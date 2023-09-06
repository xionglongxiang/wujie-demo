import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

let subAppRoutes = [
  {
    path: "/",
    redirect: "/home",
    meta: { title: "首页", app: "react17", appName: "react17" },
  },
  {
    path: "/home",
    name: "Home",
    meta: { title: "首页", app: "react17", appName: "react17" },
  },
  {
    path: "/dialog",
    name: "Dialog",
    meta: { title: "弹窗", app: "react17", appName: "react17" },
  },
  {
    path: "/location",
    name: "Location",
    meta: { title: "路由", app: "react17", appName: "react17" },
  },
  {
    path: "/communication",
    name: "Communication",
    meta: { title: "通信", app: "react17", appName: "react17" },
  },
  {
    path: "/state",
    name: "State",
    meta: { title: "状态", app: "react17", appName: "react17" },
  },
];

window.$wujie.bus.$emit("collect-sub-app-routes", subAppRoutes);

ReactDOM.render(
  // 严格模式，antd的弹窗会warning
  <App />,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
