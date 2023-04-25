<template>
  <el-header class="nav-header">
    <side-bar />
  </el-header>
</template>
<script>
import SideBar from '@/layout/side-bar/index'
export default {
  name: 'NavHeader',
  components: {
    SideBar
  }
}
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>