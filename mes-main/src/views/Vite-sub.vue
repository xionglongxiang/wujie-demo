<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue width="100%" height="100%" name="vite" :url="viteUrl"></WujieVue>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useRoute } from 'vue-router';

import hostMap from '../hostMap';

let route = useRoute()
let viteUrl = computed(() => {
  return hostMap('//localhost:7500/') + route.params.path
})
</script>

<style lang="scss" scoped></style>
