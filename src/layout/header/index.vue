<template>
  <el-header class="nav-header flex-row main-between"
             :class="[headerVisible ? 'visible' : '']">
    <section
             class="container flex-row main-between">
      <section
               class="left-box flex-row secondary-center">
        <div
             class="app-logo flex-row secondary-center">
          <img :src="appLogo" alt="appLog" />
          <span>购物天堂</span>
        </div>
        <span v-for="(item, index) of navList"
              :key="index"
              class="nav-item flex-inline main-center secondary-center"
              :class="[parentRoutePath === item.path ? 'is-active' : '']"
              @click="toNav(item, index)">
          {{ item.meta.title }}
        </span>
      </section>

      <section
               class="right-box flex-row secondary-center">
        <svg-icon icon-class="notice" />
        <el-button class="login-btn"
                   v-if="!accessToken"
                   type="primary" plain
                   size="medium"
                   @click="toLogin">登录 |
          注册</el-button>

        <el-popover :appendToBody="false"
                    placement="bottom" width="242"
                    trigger="click"
                    v-if="accessToken"
                    v-model="popoverVisible">
          <section class="user-info">
            <div
                 class="header flex-row secondary-center">
              <img class="avatar" slot="reference"
                   :src="avatarUrl"
                   alt="昵称" />
              <span class="nickname">昵称</span>
            </div>

            <ul
                class="content list flex-row main-between">
              <li v-for="(menu, index) of menuList"
                  :key="index"
                  @click="toMenu(menu, index)">
                <svg-icon
                          :icon-class="menu.icon" />
                <span class="item"
                      v-html="menu.label"></span>
              </li>
            </ul>

            <ul
                class="footer list flex-row main-between">
              <li>
                <span class="item">我的设置</span>
              </li>
              <li @click="logout">
                <span class="item">退出登录</span>
              </li>
            </ul>
          </section>
          <img class="avatar" slot="reference"
               :src="avatarUrl"
               alt="头像" />
        </el-popover>
      </section>
    </section>

    <el-dialog :visible.sync="loginVisible"
               title="登录享受更多权益"
               modal-append-to-body append-to-body
               :close-on-click-modal="false">
      <el-form class="login-form">
        <el-form-item>
          <el-input v-model="username"
                    placeholder="请输入邮箱/用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="password"
                    placeholder="请输入密码" />
        </el-form-item>
        <el-form class="flex-row main-between">
          <el-input class="validate-input"
                    v-model="validateCode"
                    placeholder="验证码" />
          <img class="validate-img"
               :src="validateCodeImg"
               alt="验证码"
               @click="getValidateCode" />
        </el-form>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login"
                   :loading="loading">登录</el-button>
      </span>
    </el-dialog>
  </el-header>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

const LOGO = require('~/static/favicon.ico')

export default {
  name: 'NavHeader',
  props: {
    headerVisible: {
      type: Boolean,
      default: true
    },
    userInfo: {
      type: Object,
      default: () => ({})
    },
    navList: {
      type: Array,
      required: true
    },
    menuList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loginVisible: false,
      popoverVisible: false,
      username: '',
      password: '',
      validateCode: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('user', ['validateCodeImg', 'accessToken']),
    parentRoutePath () {
      if (process.env.VUE_ENV === 'client') {
        if (this.$sessionStorage.getItem('parentRoutePath')) {
          return this.$sessionStorage.getItem('parentRoutePath')
        }

        return this.$store.state.app.parentRoutePath
      }
    },
    appLogo () {
      return LOGO
    },
    avatarUrl () {
      if (this.userInfo && this.userInfo.avatarUrl) {
        return this.userInfo.avatarUrl
      }

      return `${process.env.IMAGE_PREFIX}/user-management/image/default_avatar.svg`
    }
  },
  mounted () {
    console.log('parentRoutePath: ', this.parentRoutePath)
  },
  methods: {
    ...mapActions({
      userLogin: 'user/login',
      userLogout: 'user/logout',
      getRandomCode: 'user/getRandomCode'
    }),
    toNav (item, index) {
      this.$emit('navClick', item, index)
    },
    toMenu (item, index) {
      this.$emit('menuClick', item, index)
    },
    toLogin () {
      this.loginVisible = true
      this.getValidateCode()
    },
    login () {
      this.loading = true
      const params = {
        username: this.username,
        password: this.password,
        validateCode: this.validateCode
      }
      this.userLogin(params).then(() => {
        this.loginVisible = false
      }).finally(() => {
        this.loading = false
      })
    },
    logout () {
      this.userLogout().then(() => {
        this.popoverVisible = false
      })
    },
    getValidateCode () {
      this.getRandomCode()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  z-index: 250;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.2s;
  transform: translate3d(0, -100%, 0);

  &.visible {
    transform: translateZ(0);
  }
}
.container {
  max-width: 1440px;
  margin: auto;
  position: relative;
  width: 100%;
  height: 100%;
  .app-logo {
    width: 132px;
    height: 100%;
    margin-right: 20px;
    img {
      width: 35px;
      height: 35px;

      &::after {
        content: '购物天堂';
      }
    }

    span {
      font-size: 20px;
      font-family: 隶书;
      font-weight: 600;
      color: #121212;
      margin-left: 12px;
    }
  }
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
      &::after {
        content: '';
        display: inline-block;
        width: 0;
        height: 1px;
        background: transparent;
        transition: width 0.63s ease;
        position: absolute;
        top: 100%;
        left: -50%;
        transform: translateX(50%);
      }
      &.is-active {
        color: #1e80ff;
        &::after {
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

    .avatar {
      margin-left: 10px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
    }

    .visible {
      display: block;
    }

    .hidden {
      display: none;
    }

    .user-info {
      .header {
        .nickname {
          margin-left: 10px;
          font-size: 16px;
        }
      }
      .content {
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(228, 230, 235, 0.5);
        flex-wrap: wrap;
        li {
          width: 104px;
          height: 40px;
          line-height: 40px;
          text-align: center;

          cursor: pointer;
          &:hover {
            background: #f7f8fa;
            border-radius: 4px;
          }
          .svg-icon {
            font-size: 20px;
          }
          .item {
            margin-left: 10px;
          }
        }
      }

      .footer {
        font-size: 12px;
        color: #8a919f;
        margin-top: 5px;
        li {
          cursor: pointer;
          &:hover {
            color: #1e80ff;
          }
        }
      }
    }
  }
}

.el-dialog__wrapper {
  ::v-deep .el-dialog__body {
    padding-bottom: 20px;
  }

  ::v-deep .el-dialog {
    width: 384px;
  }

  .el-dialog {
    .el-button {
      width: 100%;
    }

    .validate-input {
      width: 120px;
    }

    .validate-img {
      width: 200px;
      height: 40px;
      object-fit: cover;
    }
  }
}
</style>