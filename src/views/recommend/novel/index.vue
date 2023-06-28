<template>
  <section class="novel">
    <book-item v-for="(item, index) of 14" :key="index" @toBook="toBook" />
  </section>
</template>

<script>
import { getArticleListByCategoryId } from '@/apis'
import { reachBottom } from '@/utils/dom.js'
import { uniqueArray } from '@/utils/utils.js'
import { BookItem } from '@/components/Book'

export default {
  name: 'Novel',
  components: {
    BookItem
  },
  data () {
    return {
      categoryId: 1,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      image_prefix: process.env.IMAGE_PREFIX,
      articleList: []
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    window.onscroll = () => {
      reachBottom(() => {
        this.pageInfo.pageIndex++

        if (this.pageInfo.total > this.articleList.length) {
          this.initData()
        }
      })
    }
  },
  beforeDestroy () {
    window.onscroll = null
  },
  methods: {
    initData () {
      this.getArticleListByCategoryId().then(({ articleList, pageInfo }) => {
        this.articleList = uniqueArray([...this.articleList, ...articleList], 'articleId')

        this.pageInfo.pageIndex = pageInfo.pageIndex
        this.pageInfo.pageSize = pageInfo.pageSize
        this.pageInfo.total = pageInfo.total
      })
    },
    toBook (article) {
      let routeUrl = this.$router.resolve({
        path: `/mall/book/1`
      })

      window.open(routeUrl.href, '_blank')
    },
    getArticleListByCategoryId () {
      const params = {
        categoryId: this.categoryId,
        pageIndex: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }

      return new Promise((resolve, reject) => {
        getArticleListByCategoryId(params).then(({ code, data }) => {
          if (code === 200) {
            resolve(data)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.novel {
  width: 100%;
  border-radius: 4px;
  padding: 12px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
</style>