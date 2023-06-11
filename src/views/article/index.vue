<template>
  <section class="article">
    <template v-if="article">
      <markdown-preview
                        :content="article.content" />
    </template>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      tdk: {
        title: '',
        keywords: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters('business', ['article'])
  },
  asyncData ({ store, route }) {
    const articleId = route.params.articleId

    return store.dispatch('business/getArticleByArticleId', articleId)
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    this.clearMetaInfo()
    next()
  },
  methods: {
    ...mapActions({
      clearMetaInfo: 'business/clearMetaInfo'
    })
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