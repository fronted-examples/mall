<template>
  <section class="subjects">
    <h1>Post List</h1>
    <el-button
               @click="handleClick">测试接入element-ui</el-button>
  </section>
</template>

<script>
export default {
  methods: {
    handleClick (e) {
      console.log('打野')
    }
  }
}
</script>

<style lang="scss" scoped>
.ul {
  .li {
    font-size: 25px;
  }
}
</style>
