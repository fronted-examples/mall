<template>
  <section class="home flex-row">
    <div class="index-nav"
         :class="[headerVisible ? '' : 'index-nav-top']">
      <nav class="nav-list">
        <div class="nav-item"
             :class="[currentRoutePath === nav.path ? 'is-active' : '']"
             v-for="(nav, index) of navList"
             :key="index" @click="toNav(nav)">
          <svg-icon :icon-class="nav.icon" />
          <span>{{ nav.label }}</span>
        </div>
      </nav>
    </div>

    <client-only>
      <section class="content">
        <router-view />
      </section>
    </client-only>
  </section>
</template>

<script>
import { homeChildren } from '@/router'

export default {
  name: 'Home',
  props: {
    headerVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    currentRoutePath () {
      if (process.env.VUE_ENV === 'client') {
        if (this.$sessionStorage.getItem('currentRoutePath')) {
          return this.$sessionStorage.getItem('currentRoutePath')
        }

        return this.$store.state.app.currentRoutePath
      }
    },
    navList () {
      return homeChildren.map((child) => {
        return {
          label: child.meta.title,
          name: child.name,
          path: child.path,
          icon: child.meta.icon
        }
      })
    }
  },
  mounted () {
    console.log('currentRoutePath: ', this.currentRoutePath)
  },
  methods: {
    toNav (nav) {
      this.$router.push({
        name: nav.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  margin-top: 20px;
  .index-nav {
    width: 180px;
    position: sticky; /* 父级元素或祖先元素的overflow除overflow:visible以外其他属性，都会使sticky失效 */
    top: 80px;
    margin-right: 20px;
    height: fit-content;
    border-radius: 4px;
    background-color: #fff;
    max-height: calc(100vh - 101px);
    overflow-x: hidden;
  }
  .index-nav-top {
    top: 20px;
    max-height: calc(100vh - 40px);
  }
  .nav-list {
    min-width: 180px;
    box-sizing: border-box;
    padding: 8px;
    font-size: 16px;
    color: #515767;
    .nav-item {
      height: 25px;
      line-height: 25px;
      padding: 10px 17px;
      cursor: pointer;
      &.is-active {
        color: #1e80ff;
        background-color: #f7f8fa;
      }

      &:hover {
        color: #1e80ff;
        background-color: #f7f8fa;
      }
      .svg-icon {
        margin-right: 10px;
      }
    }
  }
  .content {
    width: calc(100% - 200px);
  }
}
</style>