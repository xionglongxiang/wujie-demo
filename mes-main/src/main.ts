import './assets/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import WujieVue from 'wujie-vue3';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import credentialsFetch from './fetch';
import hostMap from './hostMap';
import lifecycles from './lifecycle';
import router from './router';

const { setupApp, preloadApp, bus } = WujieVue

bus.$on('click', (msg: string) => window.alert(msg))

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on('sub-route-change', (name: string, path: string) => {
  const mainPath = `/${name}${path}`

  if (location.pathname === mainPath) {
    return
  }
  console.log('main:sub-route-change: ', location.pathname, mainPath)
  router.push({ path: mainPath })
})

const props = {
  jump: (name: string) => {
    router.push({ name })
  }
}
/**
 * 配置应用，主要是设置默认配置
 * preloadApp、startApp的配置会基于这个配置做覆盖
 */

setupApp({
  name: 'react17',
  url: hostMap('//localhost:7100/'),
  exec: true,
  alive: true,
  props,
  fetch: credentialsFetch,
  ...lifecycles
})

setupApp({
  name: 'v2-system',
  url: hostMap('//localhost:7200/'),
  exec: true,
  props,
  fetch: credentialsFetch,
  ...lifecycles
})

setupApp({
  name: 'v-user',
  url: hostMap('//localhost:7300/'),
  exec: true,
  alive: true,
  plugins: [
    {
      cssExcludes: ['https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css']
    }
  ],
  props,
  // 引入了的第三方样式不需要添加credentials
  fetch: (url, options) =>
    typeof url === 'string' && url.includes(hostMap('//localhost:7300/'))
      ? credentialsFetch(url, options)
      : window.fetch(url, options),
  ...lifecycles
})

setupApp({
  name: 'vite',
  url: hostMap('//localhost:7500/'),
  exec: true,
  props,
  fetch: credentialsFetch,
  ...lifecycles
})

if (window.localStorage.getItem('preload') !== 'false') {
  preloadApp({
    name: 'react17',
    url: ''
  })
  preloadApp({
    name: 'v2-system',
    url: ''
  })
  if (window.Proxy) {
    preloadApp({
      name: 'v-user',
      url: ''
    })
    preloadApp({
      name: 'vite',
      url: ''
    })
  }
}

declare let window: any

bus.$on('collect-sub-app-routes', (subAppRoutes: any) => {
  window.__WUJIE_ROUTER__ = [...(window.__WUJIE_ROUTER__ || []), ...(subAppRoutes || [])]
})

const app = createApp(App)

app.use(WujieVue)
app.use(ElementPlus)

app.use(createPinia())
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
