<template>
  <el-container direction="vertical">
    <nav-header />
    <main-content />
  </el-container>
</template>
<script>
import NavHeader from './header'
import MainContent from './content'
export default {
  name: 'Layout',
  components: {
    NavHeader,
    MainContent
  }
}
</script>