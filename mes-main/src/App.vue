<template>
  <div id="app">
    <div id="nav" :class="active ? 'active' : ''" @click="close">
      <router-link to="/home">介绍</router-link>

      <!-- react17相关路由 -->
      <router-link to="/react17">
        react17
        <span class="alive">保活</span>

        <el-icon :size="20" @click.prevent="handleFlag('react17')"><ArrowRightBold /></el-icon>
      </router-link>
      <div class="sub-menu" v-show="react17Flag">
        <router-link to="/react17-sub/home">home</router-link>
        <router-link to="/react17-sub/dialog">dialog</router-link>
        <router-link to="/react17-sub/location">location</router-link>
        <router-link to="/react17-sub/communication">communication</router-link>
        <router-link to="/react17-sub/state">state</router-link>
      </div>
      <!-- vue2相关路由 -->
      <router-link to="/v2-system-main">
        vue2
        <el-icon :size="20" @click.prevent="handleFlag('vue2')"><ArrowRightBold /></el-icon>
      </router-link>
      <div class="sub-menu" v-show="vue2Flag">
        <router-link to="/v2-system/home">home</router-link>
        <router-link to="/v2-system/dialog">dialog</router-link>
        <router-link to="/v2-system/location">location</router-link>
        <router-link to="/v2-system/communication">communication</router-link>
      </div>
      <!-- vue3相关路由 -->
      <router-link v-if="degrade" to="/v-user-main">
        vue3
        <span class="alive">保活</span>
        <el-icon :size="20" @click.prevent="handleFlag('vue3')"><ArrowRightBold /></el-icon>
      </router-link>
      <div class="sub-menu" v-show="vue3Flag">
        <router-link to="/v-user/home">home</router-link>
        <router-link to="/v-user/dialog">dialog</router-link>
        <router-link to="/v-user/location">location</router-link>
        <router-link to="/v-user/contact">contact</router-link>
        <router-link to="/v-user/state">state</router-link>
      </div>
      <router-link v-if="degrade" to="/vite"
        >vite
        <el-icon :size="20" @click.prevent="handleFlag('vite')"><ArrowRightBold /></el-icon>
      </router-link>
      <div class="sub-menu" v-show="viteFlag">
        <router-link to="/vite-sub/home">home</router-link>
        <router-link to="/vite-sub/dialog">dialog</router-link>
        <router-link to="/vite-sub/location">location</router-link>
        <router-link to="/vite-sub/contact">contact</router-link>
      </div>
      <router-link to="/all">all</router-link>
      <el-button
        class="menu-icon"
        type="primary"
        icon="unordered-list"
        size="large"
        @click.stop="active = !active"
      />
    </div>
    <div class="content" @click="active = false">
      <Tabs />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onUnmounted,
  ref,
} from 'vue';

import { useRoute } from 'vue-router';

import Tabs from './components/Tabs.vue';

let route = useRoute()
let active = ref(false)
let react17Flag = ref(route.name === 'react17-sub')
let vue2Flag = ref(route.name === 'vue2-sub')
let vue3Flag = ref(route.name === 'vue3-sub')
let viteFlag = ref(route.name === 'vite-sub')
let degrade = window.Proxy

let handleMessage = (event: any) => {
  if (event.origin === location.origin && event.source !== window) {
    console.log('父应用接收到消息：', event.data)
    alert('父应用接收到消息：' + event.data)
    // 将消息发送给子应用
    event.source.postMessage('Hello 子应用，我是父应用!', event.origin)
  }
}

window.addEventListener('message', handleMessage)

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})

function close() {
  if (active.value) active.value = false
}
function handleFlag(name: string) {
  switch (name) {
    case 'react17':
      react17Flag.value = !react17Flag.value
      break
    case 'vue2':
      vue2Flag.value = !vue2Flag.value
      break
    case 'vue3':
      vue3Flag.value = !vue3Flag.value
      break
    case 'vite':
      viteFlag.value = !viteFlag.value
      break
  }
}
</script>

<style lang="scss" scoped>
$nav-width: 210px;

html,
body {
  margin: 0;
  padding: 0;
  font-size: 20px;
  height: 100vh;
  --theme: rgb(241, 107, 95);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100vw;
}
#nav {
  background-color: white;
  flex-shrink: 0;
  font-size: 20px;
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  padding: 30px 0;
  width: $nav-width;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: 3px 0px 9px 2px #e6e6e6;
  transition: transform 0.1s linear;
  transform: translate(0, 0);
  overflow: auto;
}

#nav .menu-icon {
  display: none;
  border: none;
  background: rgb(241, 107, 95) !important;
}

.main-icon {
  padding: 0 10px;
  transition: transform 0.2s ease-in;
}

.main-icon.active {
  transform: rotate(180deg);
}

.sub-menu {
  font-size: 16px;
  padding: 0 10px;
}

@media screen and (max-width: 768px) {
  #nav {
    position: absolute;
    box-shadow: none;
    transform: translate(-100%, 0);
  }

  #nav.active {
    transform: translate(0, 0);
    box-shadow: 3px 0px 9px 2px #e6e6e6;
  }

  #nav .menu-icon {
    position: absolute;
    left: 100%;
    display: block;
  }
}

.wujie_iframe {
  width: 100%;
  height: 100%;
}

iframe {
  border: none;
}

h3 {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
}

.content {
  flex: 1;
  height: 100vh;
  overflow: hidden scroll;
  width: 1px;
}

#nav a {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s linear;
}

#nav a:hover {
  color: rgb(241, 107, 95);
}

.alive {
  display: inline-block;
  white-space: nowrap;
  background-color: rgb(241, 107, 95);
  border-radius: 8px;
  margin-left: 4px;
  font-size: 10px;
  vertical-align: top;
  padding: 1px 4px;
  color: white;
}

#nav a.router-link-active {
  color: rgb(241, 107, 95);
  background: rgba(0, 0, 0, 0.05);
}
</style>
