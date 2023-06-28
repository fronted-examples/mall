<template>
  <section class="recommend">
    <div class="index-nav"
         :class="[headerVisible ? '' : 'index-nav-top']">
      <nav class="nav-list flex-row">
        <div class="nav-item"
             :class="[currentRoutePath === nav.path ? 'is-active' : '']"
             v-for="(nav, index) of navList"
             :key="index" @click="toNav(nav)">
          <!-- <svg-icon :icon-class="nav.icon" /> -->
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
import { recommendChildren } from '@/router'

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
      return recommendChildren.map((child) => {
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
.recommend {
  margin-top: 20px;
  .index-nav {
    min-width: 1200px;
    position: sticky; /* 父级元素或祖先元素的overflow除overflow:visible以外其他属性，都会使sticky失效 */
    top: 60px;
    margin-right: 20px;
    border-radius: 4px;
    background-color: #f2f3f5;
    overflow-x: hidden;
    z-index: 1000;
    transition: top .2s;
  }
  .index-nav-top {
    top: 0;
  }
  .nav-list {
    min-width: 180px;
    box-sizing: border-box;
    padding: 8px;
    font-size: 16px;
    color: #515767;
    .nav-item {
      width: 60px;
      padding: 10px 17px;
      white-space: nowrap;
      border-radius: 25px;
      text-align: center;
      margin: 0 10px;
      cursor: pointer;
      &.is-active {
        color: #1e80ff;
        background-color: #fff;
      }

      &:hover {
        color: #1e80ff;
        background-color: #fff;
      }
      .svg-icon {
        margin-right: 10px;
      }
    }
  }
  .content {
    min-width: 1200px;
  }
}
</style>