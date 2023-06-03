<template>
  <section class="write">
    <div class="header flex-row main-between">
      <el-input class="title" clearable
                placeholder="文章标题"
                v-model="title" />

      <div class="write-operate flex-row">
        <el-button @click="save">保 存 草
          稿</el-button>
        <el-popover placement="top-start"
                    width="200" trigger="hover"
                    :content="switchTitle"
                    class="switch-btn">
          <svg-icon slot="reference"
                    icon-class="switch"
                    @click="toggleEditor" />
        </el-popover>
        <el-button type="primary"
                   @click="publish">发
          布</el-button>
      </div>
    </div>

    <section class="content">
      <markdown-editor v-if="!richVisible"
                       v-model="markdownVal" />

      <TinymceEditor v-if="richVisible"
                     :uploadImage="uploadImage"
                     v-model="richText" />
    </section>
  </section>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import TinymceEditor from '@/components/TinymceEditor'

export default {
  name: 'Editor',
  components: {
    MarkdownEditor,
    TinymceEditor
  },
  data () {
    return {
      title: '',
      switchTitle: '切换为富文本编辑器',
      markdownVal: '',
      richText: '',
      richVisible: false
    }
  },
  watch: {
    richVisible (newVal) {
      this.switchTitle = newVal ? '切换为Markdown编辑器' : '切换为富文本编辑器'
    },
    markdownVal (newVal) {
      console.log('markdownVal: ', newVal)
    },
    richText (newVal) {
      console.log('richText: ', newVal)
    }
  },
  created () {
    this.richVisible = this.$route.query.richVisible
  },
  methods: {
    toggleEditor () {
      this.richVisible = !this.richVisible
      this.$router.replace({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          richVisible: this.richVisible
        }
      })
    },
    save () { },
    publish () { },
    uploadImage (file, success, fail) {
      console.log(file)

      success(1)
    }
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

    .switch-btn {
      width: 80px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon {
        font-size: 16px;
      }
    }
  }

  .content {
    height: calc(100vh - 60px);
  }
}
</style>