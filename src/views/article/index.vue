<template>
  <section class="article">
    <markdown-reader :content="article.content" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Article',
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