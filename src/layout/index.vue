<template>
  <el-container direction="vertical">
    <nav-header :navList="navList"
                :menuList="menuList"
                :accessToken="accessToken"
                :userInfo="userInfo" :href="href"
                @navClick="handleNavClick"
                @menuClick="handleMenuClick" />
    <main-content :tdk="tdk" />
  </el-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import { constantRoutes } from '@/router'
import { filterAsyncRoutes } from '@/utils/router'

import NavHeader from './header'
import MainContent from './content'
export default {
  name: 'Layout',
  components: {
    NavHeader,
    MainContent
  },
  data () {
    return {
      menuList: [{
        label: '写&nbsp;&nbsp;&nbsp;文章',
        routeName: 'editor',
        icon: 'article'
      }, {
        label: '我的主页',
        routeName: 'personal',
        icon: 'main-page'
      }, {
        label: '我的书架',
        routeName: 'bookshelf',
        icon: 'bookshelf'
      }],
      tdk: {
        title: '',
        keywords: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['accessToken', 'userInfo']),
    ...mapGetters('app', ['href']),
    navList () {
      return filterAsyncRoutes(constantRoutes)
    }
  },
  watch: {
    $route (to, from) {
      this.updateHref(to.path)
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      vm.tdk.title = to.meta.title
      vm.tdk.keywords = to.meta.keywords
      vm.tdk.description = to.meta.description
    })
  },
  methods: {
    ...mapActions({
      updateHref: 'app/updateHref'
    }),
    handleNavClick (item) {
      this.$router.push({
        path: item.path
      })
    },
    handleMenuClick (item) {
      this.$router.push({
        name: item.routeName,
        query: {
          id: 1
        }
      }).then(() => {
        // this.popoverVisible = false
      }).catch((err) => {
        // console.log('write err: ' + err)
      })
    }
  }
}
</script>