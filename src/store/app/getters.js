import { sessionMemory } from '@/utils/storage'

const getters = {
  posts: (state) => state.posts,
  href: (state) => {
    if (process.env.VUE_ENV === 'client') {
      if (state.href) {
        return state.href
      }

      return state.href = sessionMemory.getItem('href')
    }
  }
}

export default getters