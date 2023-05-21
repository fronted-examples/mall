<template>
  <section class="write">
    <div class="header flex-row main-between">
      <el-input class="title" clearable
                placeholder="文章标题"
                v-model="title" />

      <div class="write-operate flex-row">
        <el-button @click="save">保 存 草
          稿</el-button>
        <el-button type="primary"
                   @click="publish">发
          布</el-button>
      </div>
    </div>
    <markdown-editor class="content"
                     v-model="markdownVal" />
  </section>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'Write',
  components: {
    MarkdownEditor
  },
  data () {
    return {
      title: '',
      markdownVal: ''
    }
  },
  watch: {
    markdownVal (newVal) {
      console.log('markdownVal: ', newVal)
    }
  },
  methods: {
    save () { },
    publish () { }
  }
}
</script>

<style lang="scss" scoped>
.write {
  height: 100vh;
  .header {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    height: 40px;

    .title {
      ::v-deep .el-input__inner {
        border: none;
        font-size: 24px;
      }
    }
  }

  .content {
    height: calc(100vh - 60px);
  }
}
</style>