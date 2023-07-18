<template>
  <section class="chat flex-row">
    <tabbar :tabbar="tabbarList" @change="onChange" />

    <component :is="chatComponent"></component>
  </section>
</template>

<script>
import { Tabbar } from '@/components/Chat'
import ChatRoom from './components/Room.vue'
import ChatContacts from './components/Contacts.vue'

export default {
  name: 'Chat',
  components: {
    Tabbar,
    ChatRoom,
    ChatContacts
  },
  data () {
    return {
      tabbarList: [{
          label: '消息',
          icon: 'chat',
          activeIcon: 'chat-fill',
          path: 'ChatRoom'
      }, {
          label: '通讯录',
          icon: 'contacts',
          activeIcon: 'contacts-fill',
          path: 'ChatContacts'
      }],
      chatComponent: 'ChatRoom'
    }
  },
  created () {
  },
  methods: {
    onChange (tabbar) {
      this.chatComponent = tabbar.path
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  width: 1200px;
  min-height: 500px;
  margin: 20px auto 0;
  padding: 20px;
  background-color: #272a37;
  border-radius: 16px;
  color: #fff;
  position: sticky;
  top: 80px;
  .side {
    width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .room {
    margin-left: 20px;
    width: calc(1200px - 260px);
  }
}
</style>

<style>
.message-content .el-notification__content {
  margin: 0;
}
</style>