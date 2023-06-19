<template>
  <el-container direction="vertical">
    <div class="header-box">
      <nav-header :navList="navList"
                  :menuList="menuList"
                  :accessToken="accessToken"
                  :userInfo="userInfo"
                  :headerVisible="headerVisible"
                  @navClick="handleNavClick"
                  @menuClick="handleMenuClick" />
    </div>
    <main-content ref="content"
                  :headerVisible="headerVisible" />
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'

import { getWheelDirection } from '@/utils/wheel.js'

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
      headerVisible: true,
      direction: 'toTop'
    }
  },
  computed: {
    ...mapGetters('user', ['accessToken', 'userInfo']),
    navList () {
      return filterAsyncRoutes(constantRoutes)
    }
  },
  mounted () {
    // 给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll)

    window.onmousewheel = ($event) => {
      getWheelDirection($event, ({ wheelDelta, detail }) => {
        if (wheelDelta > 0) {
          this.direction = 'toTop'
        }

        if (wheelDelta < 0) {
          this.direction = 'toBottom'
        }
      })
    }
  },
  destroyed () {
    // 离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
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
      }).catch((err) => {
      })
    },
    handleScroll (e) { //改变元素#searchBar的top值
      // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      this.$nextTick(() => {
        let top = this.$refs.content.$el.getBoundingClientRect().top
        let offsetTop = this.$refs.content.$el.offsetTop

        // top + 500->会在到顶后继续滑动500像素才会隐藏顶部导航栏
        if ((offsetTop - (top + 500) > 0) && this.direction === 'toBottom') {
          this.headerVisible = false
        } else if (this.direction === 'toTop') {
          this.headerVisible = true
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  height: 60px;
}
</style>