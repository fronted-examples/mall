<template>
  <section class="article">
    <!-- <Markdown :content="content" /> -->
    <markdown-preview :content="content" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Markdown from '@/components/Markdown'
import MarkdownPreview from '@/components/MarkdownPreview'

export default {
  name: 'Article',
  components: {
    Markdown,
    MarkdownPreview
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('business', ['article']),
    content () {
      if (this.article) {
        return this.article.content
      }

      return ''
    }
  },
  asyncData ({ store, route }) {
    const articleId = route.params.articleId

    return store.dispatch('business/getArticleByArticleId', articleId)
  },
  created () {
    console.log('article: ', this.article)
  }
}
</script>

<style lang="scss" scoped>
.article {
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
}
</style>