<template>
  <mavon-editor class="markdown" ref="md"
                :toolbars="toolbars"
                :editable="editable"
                :defaultOpen="defaultOpen"
                @imgAdd="addImage"
                @imgDel="delImage"
                @change="handleChange"
                @htmlCode="handleHtmlCode"
                @previewToggle="handlePreviewToggle"
                @readModel="handleReadModel"
                @helpToggle="handleHelpToggle"
                @save="handleSave" />
</template>

<script>
export default {
  name: 'MarkdownEditor',
  props: {
    toolbars: {
      type: Object,
      default: () => {
        return {
          /**
           * 默认工具栏按钮全部开启, 传入自定义对象
           * 例如: {
           *    bold: true, // 粗体
           *    italic: true,// 斜体
           *    header: true,// 标题
           * }
           * 此时, 仅仅显示此三个功能键
           */
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    editable: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    defaultOpen: {
      type: String,
      default: 'preview',
      validate: (value) => {
        return ['edit', 'preview'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    addImage (filename, image) {
      this.$emit('addImage', filename, image, this.afterAddImage)
    },
    delImage (filename) {
      this.$emit('delImage', filename)
    },
    handleChange (val, render) {
      this.$emit('input', val)
      this.$emit('change', val, render)
    },
    handleSave (val, render) {
      this.$emit('save', val, render)
    },
    handleHtmlCode (status, val) {
      this.$emit('htmlCode', status, val)
    },
    handlePreviewToggle (status, val) {
      this.$emit('previewToggle', status, val)
    },
    handleHelpToggle (status, val) {
      this.$emit('helpToggle', status, val)
    },
    handleReadModel (status, val) {
      this.$emit('readModel', status, val)
    },
    // 将md源码中图片src替换为上传后的文件服务器地址
    afterAddImage (filename, file) {
      this.$refs.md.$img2Url(filename, `${process.env.IMAGE_PREFIX}${file.fileUrl}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown {
  height: 100%;
}
</style>