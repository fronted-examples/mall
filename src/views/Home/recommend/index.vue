<template>
  <section class="recommend">
    <ul class="article-list">
      <el-skeleton v-if="!articleList.length"
                   :rows="6" animated />

      <li class="article-item"
          v-for="article of articleList"
          :key="article.articleId"
          @click="toArticle(article)">
        <div class="item-header flex-row">
          <span
                class="username">{{ article.username }}</span>
          <span
                class="date">{{ article.createTime }}</span>
          <span
                class="category">{{ article.category }}</span>
        </div>
        <div class="item-content">
          <div class="content-main">
            <div class="title">
              {{ article.title }}</div>
            <div class="description">
              {{ article.description }}</div>
            <ul class="action-list flex-row">
              <li
                  class="action-item flex-row secondary-center">
                <svg-icon icon-class="eye-open" />
                <span>9</span>
              </li>
              <li
                  class="action-item flex-row secondary-center">
                <svg-icon icon-class="like" />
                <span>9</span>
              </li>
              <li
                  class="action-item flex-row secondary-center">
                <svg-icon icon-class="message" />
                <span>9</span>
              </li>
            </ul>
          </div>

          <img loading="lazy" class="thumb" alt="封面"
               :src="`${image_prefix}${article.cover}`" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { getArticleListByCategoryId } from '@/apis'
import { reachBottom } from '@/utils/dom.js'
import { uniqueArray } from '@/utils/utils.js'

export default {
  name: 'Recommend',
  data () {
    return {
      categoryId: null,
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
    toArticle (article) {
      let routeUrl = this.$router.resolve({
        path: `/mall/article/${article.articleId}`
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
.recommend {
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  padding: 12px 20px 0;
  box-sizing: border-box;

  .article-list {
    .article-item {
      cursor: pointer;
      background: #fff;
      padding: 12px 20px 0;

      &:hover {
        background-color: #f7f8fa;
      }

      .item-header {
        color: #8a919f;
        .username {
          color: #515767;
        }
        span {
          margin-right: 12px;
          max-width: 162px;
          font-size: 13px;
          line-height: 22px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          &::after {
            content: '|';
            margin-left: 12px;
            color: #e4e6eb;
          }
        }
      }

      .item-content {
        display: flex;
        margin-top: 10px;

        padding-bottom: 12px;
        border-bottom: 1px solid #e4e6eb;
        .content-main {
          flex: 1 1 auto;
          .title {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: #252933;
            width: 100%;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            margin-bottom: 8px;
          }

          .description {
            margin-bottom: 8px;

            color: #8a919f;
            font-size: 13px;
            line-height: 22px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .action-list {
            .action-item {
              position: relative;
              margin-right: 20px;
              font-size: 13px;
              line-height: 20px;
              color: #8a919f;
              flex-shrink: 0;

              &:hover {
                color: #1e80ff;
              }

              .svg-icon {
                width: 16px;
                height: 16px;
              }

              span {
                margin-left: 4px;
              }
            }
          }
        }

        .thumb {
          flex: 0 0 auto;
          width: 120px;
          height: 80px;
          margin-left: 24px;
          background-color: #fff;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>