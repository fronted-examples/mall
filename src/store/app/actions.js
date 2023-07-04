import {
  UPDATE_CURRENT_ROUTE_PATH,
  UPDATE_PARENT_ROUTE_PATH
} from './constants'

const actions = {
  [UPDATE_PARENT_ROUTE_PATH]: (context, data) => {
    context.commit(UPDATE_PARENT_ROUTE_PATH, data)
  },
  [UPDATE_CURRENT_ROUTE_PATH]: (context, data) => {
    context.commit(UPDATE_CURRENT_ROUTE_PATH, data)
  }
}

export default actions