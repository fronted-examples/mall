import { sessionMemory } from '@/utils/storage'

const getters = {
  posts: (state) => state.posts,
  currentRoutePath: (state) => state.currentRoutePath,
  parentRoutePath: (state) => state.parentRoutePath
}

export default getters