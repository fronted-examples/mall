<template>
  <el-container direction="vertical">
    <nav-header />
    <main-content />
  </el-container>
</template>
<script>
import SideBar from '@/layout/side-bar/index'
import NavHeader from './header'
import MainContent from './content'
export default {
  name: 'Layout',
  components: {
    SideBar,
    NavHeader,
    MainContent
  }
}
</script>