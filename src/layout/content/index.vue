<template>
  <el-main class="main-content">
    <router-view />
  </el-main>
</template>

<script>
export default {
  name: 'MainContent',
  props: {
    tdk: Object
  },
  metaInfo () {
    const title = this._props.tdk.title

    return {
      title: `${title} - 购物天堂`,
      meta: [
        { name: 'keywords', content: this._props.tdk.keywords },
        { name: 'description', content: this._props.tdk.description }
      ]
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