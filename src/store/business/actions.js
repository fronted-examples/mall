import { async } from 'q'
import {
  UPDATE_ARTICLE_CATEGORY_LIST,
  GET_ARTICLE_BY_ARTICLE_ID,
  UPDATE_ARTICLE
} from './constants'

import { getArticleListByKeyword, getArticleCategoryList, getArticleByArticleId } from '@/apis'

/**
 * 走服务端渲染，异步请求不能使用then,会导致页面已经渲染，网络数据还未获取到
 * 导致服务端没有渲染对应的dom
 * 应该使用await async使其成为同步
 */
const actions = {
  [UPDATE_ARTICLE_CATEGORY_LIST]: async (context) => {
    const { code, data } = await getArticleCategoryList()

    if (code === 200) {
      const { articleCategoryList } = data

      context.commit(UPDATE_ARTICLE_CATEGORY_LIST, articleCategoryList)
    }
  },
  [GET_ARTICLE_BY_ARTICLE_ID]: async (context, articleId) => {
    const params = {
      articleId: articleId
    }
    const { code, data } = await getArticleByArticleId(params)
    if (code === 200) {
      context.commit(GET_ARTICLE_BY_ARTICLE_ID, data)
    }
  },
  [UPDATE_ARTICLE]: (context, data) => {
    context.commit(UPDATE_ARTICLE, data)
  }
}

export default actions