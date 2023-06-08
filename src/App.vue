<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view :href="href" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters('app', ['href']),
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
    this.initTdk(this.$route)
  },
  watch: {
    $route (to, from) {
      this.initTdk(to)

      this.updateHref({
        currentRoutePath: to.path,
        parentRoutePath: to.meta.parentRoute
      })
    }
  },
  methods: {
    ...mapActions({
      updateHref: 'app/updateHref'
    }),
    initTdk (route) {
      this.tdk.title = route.meta.title
      this.tdk.keywords = route.meta.keywords
      this.tdk.description = route.meta.description
    }
  }
};
</script>

