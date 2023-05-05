<template>
  <el-header
             class="nav-header flex-row main-between">
    <section
             class="container flex-row main-between">
      <section
               class="left-box flex-row secondary-center">
        <span class="nav-item flex-inline main-center secondary-center"
              :class="[currentIndex === index ? 'is-active' : '']"
              v-for="(item, index) of navs"
              :key="index"
              @click="toTarget(item, index)">
          {{ item.label }}
          <span class="border-line"
                :class="[currentIndex === index ? 'is-active' : '']"></span>
        </span>
      </section>

      <section
               class="right-box flex-row secondary-center">
        <svg-icon icon-class="notice" />
        <el-button class="login-btn"
                   type="primary" plain
                   size="medium" @click="login">登录
          |
          注册</el-button>
      </section>
    </section>

    <el-dialog :visible.sync="loginVisible"
               title="登录享受更多权益" append-to-body
               :close-on-click-modal="false">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false">取
          消</el-button>
        <el-button type="primary"
                   @click="loginVisible = false">确
          定</el-button>
      </span>
    </el-dialog>
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
      currentIndex: -1,
      loginVisible: false
    }
  },
  methods: {
    toTarget (item, index) {
      this.currentIndex = index
      this.$router.push({
        name: item.name
      })
    },
    login () {
      this.loginVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-header {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  z-index: 250;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s;
}
.container {
  max-width: 1440px;
  margin: auto;
  position: relative;
  width: 100%;
  height: 100%;
  .left-box {
    height: 100%;
    .nav-item {
      min-width: 80px;
      height: 100%;
      box-sizing: border-box;
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
        transition: width 0.63s ease;
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
  .right-box {
    height: 100%;
    .svg-icon {
      font-size: 24px;
      cursor: pointer;
    }
    .login-btn {
      margin-left: 10px;
    }
  }
}
</style>