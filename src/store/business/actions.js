import {
  UPDATE_ARTICLE_CATEGORY_LIST,
  GET_ARTICLE_BY_ARTICLE_ID,
  UPDATE_ARTICLE
} from './constants'

import { getArticleListByKeyword, getArticleCategoryList, getArticleByArticleId } from '@/apis'

const actions = {
  [UPDATE_ARTICLE_CATEGORY_LIST]: (context) => {
    getArticleCategoryList().then(({ code, data }) => {
      if (code === 200) {
        const { articleCategoryList } = data

        context.commit(UPDATE_ARTICLE_CATEGORY_LIST, articleCategoryList)
      }
    })
  },
  [GET_ARTICLE_BY_ARTICLE_ID]: (context, articleId) => {
    const params = {
      articleId: articleId
    }
    getArticleByArticleId(params).then(({ code, data }) => {
      if (code === 200) {
        context.commit(GET_ARTICLE_BY_ARTICLE_ID, data)
      }
    })
  },
  [UPDATE_ARTICLE]: (context, data) => {
    context.commit(UPDATE_ARTICLE, data)
  }
}

export default actions