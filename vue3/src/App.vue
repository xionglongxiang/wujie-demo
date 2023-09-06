<template>
  <div id="nav">
    <router-link to="/home">首页</router-link> |
    <router-link to="/dialog">弹窗</router-link> |
    <router-link to="/location">路由</router-link> |
    <router-link to="/contact">通信</router-link> |
    <router-link to="/state">状态</router-link>
  </div>
  <router-view />
</template>

<script setup>
import { watch } from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

let route = useRoute();
const router = useRouter();

watch(
  () => route.path,
  (newValue, oldValue) => {
    console.log("[vue3:route.path change: ", newValue, oldValue, route);
    console.log("[---vue3---");
    // window.$wujie?.bus.$emit(
    //   "sub-route-change",
    //   "v-user",
    //   route.path,
    //   route.meta.title
    // );
  }
);

window.$wujie?.bus.$on("vue3-router-change", (path) => router.push(path));
</script>
