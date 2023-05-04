<template>
  <el-header class="nav-header">
    <section class="left-box">
      <span class="nav-item"
            :class="[currentIndex === index ? 'is-active' : '']"
            v-for="(item, index) of navs"
            :key="index"
            @click="toTarget(item, index)">
        {{ item.label }}
        <span class="border-line"
              :class="[currentIndex === index ? 'is-active' : '']"></span>
      </span>
    </section>

    <section class="right-box"></section>
  </el-header>
</template>

<script>
export default {
  name: 'NavHeader',
  data () {
    return {
      navs: [{
        label: '首页',
        name: 'home'
      }, {
        label: '沸点',
        name: 'boiling'
      }, {
        label: '课程',
        name: 'subjects'
      }, {
        label: '活动',
        name: 'activity'
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
.nav-header {
  display: flex;
  align-items: center;
  max-width: 1440px;
  margin: auto;
  .nav-item {
    min-width: 80px;
    box-sizing: border-box;
    padding: 5px 10px;
    color: #909399;
    text-align: center;
    font-size: 14px;
    position: relative;
    &:hover {
      color: #1e80ff;
      cursor: pointer;
    }
    &.is-active {
      color: #1e80ff;
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
        background-color: #1e80ff;
      }
    }
  }
}
</style>