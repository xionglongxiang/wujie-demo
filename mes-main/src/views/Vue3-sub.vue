<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue width="100%" height="100%" name="vue3" :url="vue3Url"></WujieVue>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { useRoute } from 'vue-router';
import wujieVue from 'wujie-vue3';

import hostMap from '../hostMap';

let route = useRoute()

let vue3Url = hostMap('//localhost:7300/') + route.params.path

watch(
  () => route.params.path,
  function () {
    wujieVue.bus.$emit('vue3-router-change', `/${route.params.path}`)
  }
)
</script>

<style lang="scss" scoped></style>
