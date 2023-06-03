<template>
  <el-container direction="vertical">
    <nav-header :navList="navList"
                :menuList="menuList"
                :accessToken="accessToken"
                :userInfo="userInfo" :href="href"
                @navClick="handleNavClick"
                @menuClick="handleMenuClick" />
    <main-content />
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
      }]
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