import {
  UPDATE_ARTICLE_CATEGORY_LIST
} from './constants'

import { getArticleListByKeyword, getArticleCategoryList } from '@/apis'

const actions = {
  [UPDATE_ARTICLE_CATEGORY_LIST]: (context) => {
    getArticleCategoryList().then(({ code, data }) => {
      if (code === 200) {
        const { articleCategoryList } = data

        context.commit(UPDATE_ARTICLE_CATEGORY_LIST, articleCategoryList)
      }
    })
  }
}

export default actions