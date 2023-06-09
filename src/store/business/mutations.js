import {
  UPDATE_ARTICLE_CATEGORY_LIST,
  GET_ARTICLE_BY_ARTICLE_ID,
  UPDATE_ARTICLE
} from './constants'

const mutations = {
  [UPDATE_ARTICLE_CATEGORY_LIST]: (state, data) => {
    state.articleCategoryList = data
  },
  [GET_ARTICLE_BY_ARTICLE_ID]: (state, data) => {
    state.article = data.article
  },
  [UPDATE_ARTICLE]: (state, data) => {
    state.article = data
  }
}

export default mutations