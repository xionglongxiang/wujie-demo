import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/tag/style/css';
import 'element-plus/es/components/dialog/style/css';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/popover/style/css';
import 'ant-design-vue/es/style/index.css';
import 'ant-design-vue/es/button/style/index.css';
import 'ant-design-vue/es/select/style/index.css';
import 'ant-design-vue/es/modal/style/index.css';
import 'ant-design-vue/es/popover/style/index.css';
import './index.css';

import { createApp } from 'vue';

import AButton from 'ant-design-vue/es/button';
import AModal from 'ant-design-vue/es/modal';
import APopover from 'ant-design-vue/es/popover';
import ASelect from 'ant-design-vue/es/select';
import Button from 'element-plus/es/components/button/index';
import Dialog from 'element-plus/es/components/dialog/index';
import Popover from 'element-plus/es/components/popover/index';
import Select from 'element-plus/es/components/select/index';
import Tag from 'element-plus/es/components/tag/index';

import App from './App.vue';
import router, { routes } from './router';

let subAppRoutes = routes.map((item) => {
  return {
    ...item,
    meta: {
      ...(item.meta || {}),
      app: "v-user",
      appName: "用户管理",
    },
  };
});
window.$wujie.bus.$emit("collect-sub-app-routes", subAppRoutes);

createApp(App)
  .use(Tag)
  .use(Button)
  .use(Dialog)
  .use(Select)
  .use(Popover)
  .use(AButton)
  .use(ASelect)
  .use(AModal)
  .use(APopover)
  .use(router)
  .mount("#app");
