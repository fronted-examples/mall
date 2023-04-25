<template>
  <div>
    主页
  </div>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: '首页'
  },
  data() {
    return {
      
    }
  },
  beforeCreate () {
    console.log('gbl: ', global.window.location.origin)
  }
}
</script>