<template>
  <el-header class="nav-header flex-row main-between"
             v-if="headerVisible">
    <section
             class="container flex-row main-between">
      <section
               class="left-box flex-row secondary-center">
        <span v-for="(item, index) of navList"
              :key="index"
              class="nav-item flex-inline main-center secondary-center"
              :class="[href === item.path ? 'is-active' : '']"
              @click="toNav(item, index)">
          {{ item.meta.title }}
        </span>
      </section>

      <section
               class="right-box flex-row secondary-center">
        <svg-icon icon-class="notice" />
        <el-button v-show="!accessToken"
                   class="login-btn"
                   type="primary" plain
                   size="medium"
                   @click="toLogin">登录 |
          注册</el-button>

        <el-popover :appendToBody="false"
                    placement="bottom" width="242"
                    trigger="click"
                    v-model="popoverVisible"
                    v-show="accessToken">
          <section class="user-info">
            <div
                 class="header flex-row secondary-center">
              <img class="avatar" slot="reference"
                   :src="avatarUrl" />
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
               :src="avatarUrl" />
        </el-popover>
      </section>
    </section>

    <el-dialog :visible.sync="loginVisible"
               title="登录享受更多权益"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               width="20%">
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
import { mapActions } from 'vuex'

export default {
  name: 'NavHeader',
  props: {
    accessToken: {
      type: String,
      required: true,
      default: ''
    },
    userInfo: {
      type: Object,
      required: true,
      default: () => ({})
    },
    href: {
      type: String,
      required: true,
      default: ''
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
      headerVisible: true,
      username: '',
      password: '',
      validateCode: '',
      loading: false
    }
  },
  computed: {
    avatarUrl () {
      if (this.userInfo && this.userInfo.avatarUrl) {
        return this.userInfo.avatarUrl
      }

      return `${process.env.IMAGE_PREFIX}/file/images/default_avatar.svg`
    },
    validateCodeImg () {
      return this.$store.state.user.validateCodeImg
    }
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
        this.loading = false
        this.loginVisible = false
      })
    },
    logout () {
      this.userLogout()
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