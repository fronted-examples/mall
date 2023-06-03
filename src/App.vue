<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      tdk: {
        title: '',
        keywords: '',
        description: ''
      }
    }
  },
  metaInfo () {
    const title = this.tdk.title

    return {
      title: `${title} - 购物天堂`,
      meta: [
        { name: 'keywords', content: this.tdk.keywords },
        { name: 'description', content: this.tdk.description }
      ]
    }
  },
  created () {
    console.log(this.$route)
    this.initTdk(this.$route)
  },
  watch: {
    $route (to, from) {
      this.initTdk(to)
    }
  },
  methods: {
    initTdk (route) {
      this.tdk.title = route.meta.title
      this.tdk.keywords = route.meta.keywords
      this.tdk.description = route.meta.description
    }
  }
};
</script>

