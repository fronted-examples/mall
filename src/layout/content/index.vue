<template>
  <el-main class="main-content">
    <router-view />
  </el-main>
</template>

<script>
export default {
  name: 'MainContent'
}
</script>

<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  width: 100%;
}
</style>