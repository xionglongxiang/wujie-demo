<template>
  <div id="nav">
    <router-link to="/home">首页</router-link> |
    <router-link to="/dialog">弹窗</router-link> |
    <router-link to="/location">路由</router-link> |
    <router-link to="/contact">通信</router-link>
    <!-- |
    <router-link to="/state">状态</router-link> -->
  </div>
  <router-view />
</template>

<script lang="ts" setup>
import { watch } from 'vue';

import { useRoute } from 'vue-router';

let route = useRoute();
declare const window: any;

watch(
  () => route.path,
  () => {
    console.log("%cVite route change: ", route.path);
    console.log();

    // window.$wujie?.bus.$emit(
    //   "sub-route-change",
    //   "vite",
    //   route.path,
    //   route.meta.title
    // );
  }
);
</script>
