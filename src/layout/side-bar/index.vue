<template>
  <section class="side-bar">
    <span class="nav-item"
          v-for="(item, index) of navs"
          :key="index"
          @click="toTarget(item, index)">
      {{ item.label }}
      <span class="border-line"
            :class="[currentIndex === index ? 'is-active' : '']"></span>
    </span>
  </section>
</template>
<script>
export default {
  name: 'SideBar',
  data () {
    return {
      navs: [{
        label: '关于',
        name: 'About'
      }, {
        label: '主页',
        name: 'Home'
      }, {
        label: '邮报',
        name: 'Posts'
      }],
      currentIndex: -1
    }
  },
  methods: {
    toTarget (item, index) {
      this.currentIndex = index
      this.$router.push({
        name: item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  display: flex;
  .nav-item {
    min-width: 120px;
    box-sizing: border-box;
    padding: 5px 10px;
    color: #909399;
    text-align: center;
    position: relative;
    &:hover {
      color: #303133;
      cursor: pointer;
    }
    .border-line {
      display: inline-block;
      width: 0;
      height: 1px;
      background: transparent;
      transition: width 0.3s ease;
      position: absolute;
      top: 100%;
      left: -50%;
      transform: translateX(50%);
      &.is-active {
        width: 100%;
        background-color: #303133;
      }
    }
  }
}
</style>