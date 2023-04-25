<template>
  <div>
    <h1>Post List</h1>
    <el-button @click="handleClick">测试接入element-ui</el-button>
    <ul class="ul">
      <li class="li" v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['posts'])
  },
  asyncData ({ store, route }) {
    return store.dispatch('getPosts')
  },
  // Vue SSR 特殊为服务端渲染提供的一个生命周期钩子函数(渲染之前调用)
  // serverPrefetch () {
  //   // 发起 action，返回 Promise
  //   // this.$store.dispatch('getPosts')
  //   console.log('serverPrefetch')
  //   return this.getPosts()
  // },
  methods: {
    ...mapActions(['getPosts']),
    handleClick  (e) {
      console.log('打野')
    }
  }
}
</script>

<style lang="scss" scoped>
.ul {
  .li {
  font-size: 50px;
}
}
</style>
