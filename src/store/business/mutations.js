import {
  UPDATE_ARTICLE_CATEGORY_LIST
} from './constants'

const mutations = {
  [UPDATE_ARTICLE_CATEGORY_LIST]: (state, data) => {
    state.articleCategoryList = data
  }
}

export default mutations