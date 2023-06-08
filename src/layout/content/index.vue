<template>
  <el-main class="main-content">
    <router-view :href="href" />
  </el-main>
</template>

<script>
export default {
  name: 'MainContent',
  props: {
    href: {
      type: Object,
      default: () => ({})
    }
  }
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