<template>
  <section class="home flex-row">
    <nav class="nav-list">
      <div class="nav-item"
           :class="[currentRoutePath === nav.path ? 'is-active' : '']"
           v-for="(nav, index) of navList"
           :key="index" @click="toNav(nav)">
        <svg-icon :icon-class="nav.icon" />
        <span>{{ nav.label }}</span>
      </div>
    </nav>

    <section class="content">
      <router-view />
    </section>
  </section>
</template>

<script>
import { sessionMemory } from '@/utils/storage'
import { mapGetters } from 'vuex'
import { homeChildren } from '@/router'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    currentRoutePath () {
      if (sessionMemory.getItem('currentRoutePath')) {
        return sessionMemory.getItem('currentRoutePath')
      }

      return this.$store.state.app.currentRoutePath
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
  .nav-list {
    width: 180px;
    height: fit-content;
    max-height: calc(100vh - 101px);
    font-size: 16px;
    color: #515767;
    background-color: #fff;
    border-radius: 4px;
    overflow-x: hidden;
    padding: 8px;
    margin-right: 20px;

    position: sticky;
    top: 80px;
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
}
</style>