<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    toPost () {
      location.href = '/posts'
    }
  }
};
</script>

