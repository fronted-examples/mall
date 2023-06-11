import {
  UPDATE_ARTICLE_CATEGORY_LIST,
  GET_ARTICLE_BY_ARTICLE_ID,
  UPDATE_ARTICLE,
  CLEAR_META_IFNO,
  UPDATE_META_INFO
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
  },
  [UPDATE_META_INFO]: (state, data) => {
    state.cacheMetaInfo = data
  },
  [CLEAR_META_IFNO]: (state, data) => {
    state.cacheMetaInfo = null
  }
}

export default mutations