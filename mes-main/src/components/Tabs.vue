<template>
  <div style="padding: 20px">
    <!-- <div>{{ tab.list }}</div> -->
    <el-tag
      size="large"
      style="margin-left: 10px"
      v-for="(item, index) in tab.list"
      :key="index"
      closable
      @close="handleclose(item)"
      @click="handleOpenTab(item)"
      :type="tab.active == item ? 'success' : 'info'"
      >{{ item.title }}</el-tag
    >
  </div>
</template>

<script setup lang="ts">
import {
  type ITabItem,
  useTabStore,
} from '../stores/tabStore';

let tab = useTabStore()
let handleclose = (item: ITabItem) => {
  tab.close(item)
}
let handleOpenTab = (item: ITabItem) => {
  console.log('tab open!')
  tab.open(item)
}
</script>

<style scoped></style>
