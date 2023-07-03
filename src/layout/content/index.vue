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
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 0;
  overflow: visible;
}
</style>