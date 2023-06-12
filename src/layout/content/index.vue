<template>
  <el-main class="main-content">
    <router-view :headerVisible="headerVisible" />
  </el-main>
</template>

<script>
export default {
  name: 'MainContent',
  props: {
    headerVisible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding-top: 0;
  overflow: visible;
}
</style>