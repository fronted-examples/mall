<template>
  <section class="article">
    <markdown-preview v-if="article"
                      :content="article.content" />
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
    ...mapGetters('business', ['article'])
  },
  asyncData ({ store, route }) {
    const articleId = route.params.articleId

    return store.dispatch('business/getArticleByArticleId', articleId)
  },
  // created () {
  //   console.log('article: ', this.article)
  // }
}
</script>

<style lang="scss" scoped>
.article {
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
}
</style>