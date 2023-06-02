<template>
  <section class="home">
    <nav v-for="(nav, index) of navList"
         :key="index">
      <div>{{ nav.name }}</div>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'Home',
  props: {
    tdk: Object
  },
  data () {
    return {
      navList: [{
        name: '关注',
        icon: '',
        path: ''
      }, {
        name: '综合',
        icon: '',
        path: ''
      }, {
        name: '前端',
        icon: '',
        path: ''
      }, {
        name: '后端',
        icon: '',
        path: ''
      }, {
        name: 'Android',
        icon: '',
        path: ''
      }, {
        name: 'iOS',
        icon: '',
        path: ''
      }]
    }
  },
  beforeCreate () {
    // console.log('meta: ', this)
  }
}
</script>