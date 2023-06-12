<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view :key="new Date().getTime()" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App",
  data () {
    return {
      tdk: {
        title: '',
        keywords: '',
        description: ''
      },
      isRouterAlive: true
    }
  },
  computed: {
    ...mapGetters('business', ['article', 'cacheMetaInfo'])
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
    this.initPath(this.$route)

    this.initLog()
  },
  watch: {
    /**
     * 因为通过浏览器前进、后退键走的是客户端渲染，不会触发服务端的state变化
     * 路由监听必然是早于asyncData获取数据和更新数据的。这时候页面已经渲染完成，但缓存的文章页meta却由于网路异步的原因，
     * 导致在路由监听环节还是原来的值。因此这里必须监听缓存的文章meta
     * @param {string} newVal
     */
    cacheMetaInfo: {
      handler (newVal) {
        this.initTdk(this.$route)
      },
      immediate: true
    },
    $route (to, from) {
      this.initTdk(to)
      this.initPath(to)
    }
  },
  methods: {
    ...mapActions({
      updateCurrentRoutePath: 'app/updateCurrentRoutePath',
      updateParentRoutePath: 'app/updateParentRoutePath',
      updateMetaInfo: 'business/updateMetaInfo'
    }),
    initTdk (route) {
      console.log('this.cacheMetaInfo: ', this.cacheMetaInfo)
      this.tdk.title = this.cacheMetaInfo ? this.cacheMetaInfo.title : route.meta.title
      this.tdk.keywords = this.cacheMetaInfo ? this.cacheMetaInfo.keywords : route.meta.keywords
      this.tdk.description = this.cacheMetaInfo ? this.cacheMetaInfo.description : route.meta.description
    },
    initPath (route) {
      console.log('route: ', route)
      this.updateCurrentRoutePath(route.path)
      this.updateParentRoutePath(route.meta.parentRoute)
    },
    initLog () {
      console.log('%c 购物天堂! ', 'color:#1e80ff;font-size:20px;background:#fff;padding:8px;')
    }
  }
};
</script>

