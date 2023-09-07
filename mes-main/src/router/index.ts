import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import { useTabStore } from '@/stores/tabStore';

import Home from '../views/Home.vue';
import Multiple from '../views/Multiple.vue';
import React17Sub from '../views/React17-sub.vue';
import React17 from '../views/React17.vue';
import Vue3Sub from '../views/v-user.vue';
import Vue2Sub from '../views/v2-system.vue';
import ViteSub from '../views/Vite-sub.vue';
import Vite from '../views/Vite.vue';
import Vue2 from '../views/Vue2.vue';
import Vue3 from '../views/Vue3.vue';

declare let window: any

const routes = [
  {
    path: '/react17',
    name: 'react17',
    component: React17,
    meta: {
      app: 'main-app',
      title: 'react17-首页'
    }
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      app: 'main-app',
      title: '主应用首页'
    },
    component: Home
  },
  {
    path: '/react17-sub/:path',
    name: 'react17-sub',
    component: React17Sub,
    meta: {
      app: 'react17',
      title: 'react-17 页面'
    }
  },
  {
    path: '/v2-system-main',
    name: 'v2-system-main',
    component: Vue2,
    meta: {
      app: 'main-app',
      title: 'vue2-首页'
    }
  },
  {
    path: '/v2-system/:path',
    name: 'v2-system',
    component: Vue2Sub,
    meta: {
      app: 'v2-system',
      title: 'vue2-页面'
    }
  },
  {
    path: '/vite',
    name: 'vite',
    component: Vite,
    meta: {
      app: 'main-app',
      title: 'vite 首页'
    }
  },
  {
    path: '/vite-sub/:path',
    name: 'vite-sub',
    component: ViteSub,
    meta: {
      app: 'vite',
      title: 'vite 页面'
    }
  },
  {
    path: '/v-user-main',
    name: 'v-user-main',
    component: Vue3,
    meta: {
      app: 'main-app',
      title: '首页'
    }
  },
  {
    path: '/v-user/:path',
    name: 'v-user',
    component: Vue3Sub,
    meta: {
      app: 'v-user',
      title: 'vue3 页面'
    }
  },
  {
    path: '/all',
    name: 'all',
    component: Multiple,
    meta: {
      app: 'main-app',
      title: '全部'
    }
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router: any = createRouter({
  //设置为history模式
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let tryTimes = 3

  function openTab() {
    const toApp = to.fullPath.split('/')[1]
    const toPage = `/${to.fullPath.split('/')[2] || ''}`

    if (
      tryTimes > 0 &&
      window.__WUJIE_ROUTER__.some((item: any) => {
        return item.meta.app === to.meta.app
      })
    ) {
      tryTimes = 0
      const selected = window.__WUJIE_ROUTER__.find(
        (item: any) => item.meta.app === toApp && item.path === toPage
      )

      console.log('selected', selected)

      if (!selected) return

      const title: any = selected.meta.appName + selected.meta.title

      tab.open({
        app: toApp,
        page: toPage,
        title
      })
    } else {
      if (tryTimes === 0) return
      tryTimes--
      console.log('%ctry open tab', 'color: grey;')

      setTimeout(
        () => {
          openTab()
        },
        3500 - tryTimes * 1000
      )
    }
  }
  const tab = useTabStore()
  console.log('main:router/index.js:to.matched: ', to.matched)

  if (to.matched && to.matched[0]?.meta?.app === 'main-app') {
    tab.open({
      app: 'main-app',
      page: to.matched[0].path,
      title: `主项目${to.matched[0]?.meta?.title ? '-' + to.matched[0]?.meta?.title : ''}`
    })
  } else {
    openTab()
  }

  next()
})

export default router
