<template>
  <components :is="html" class="markdown-body">
  </components>
</template>

 <script>
import MarkdownIt from 'markdown-it'
import hljs from 'markdown-it-highlightjs'
import latex from 'markdown-it-katex'
export default {
  name: 'Markdown',
  props: {
    content: String
  },
  data: () => ({
    md: null
  }),
  computed: {
    // 使用 computed 才能在动态绑定时动态更新
    html: function () {
      let res = this.md.render(this.content)
      // 使用正则表达式将站内链接替换为 router-link 标签
      res = res.replace(/<a href="(?!http:\/\/|https:\/\/)(.*?)" rel="external nofollow" >(.*?)<\/a>/g, '<router-link to="$1">$2</router-link>')
      // 使用正则表达式将站外链接在新窗口中打开
      res = res.replace(/<a href="(.*?)" rel="external nofollow" >(.*?)<\/a>/g, '<a href="$1" rel="external nofollow" target="_blank">$2</a>')
      return {
        template: '<div>' + res + '</div>'
      }
    }
  },
  created () {
    this.md = new MarkdownIt()
    this.md.use(hljs).use(latex)
  }
}
 </script>

<style lang="scss" scoped>
.markdown-body {
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 16px;
  overflow-x: hidden;
  color: #252933;
}
</style>