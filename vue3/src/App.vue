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

<script>
export default {
  watch: {
    // 在 vue3-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
    $route(n, o) {
      if (this.$route.matched.length == 0) {
        return;
      }

      console.log("%croute change", "color: red;", this.$route.matched);

      console.log("---vue3---", o, "-->", n);

      console.log("this.$route.path", this.$route.path, this.$route);

      window.$wujie?.bus.$emit("sub-route-change", "v-user", this.$route.path);
    },
  },
  mounted() {
    window.$wujie?.bus.$on("vue3-router-change", (path) =>
      this.$router.push(path)
    );
  },
};
</script>
