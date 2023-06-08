import Storage, { sessionMemory } from '@/utils/storage'

const getters = {
  posts: (state) => state.posts,
  href: (state) => state.href
  // href: (state) => {
  //   // console.log(new Storage('sessionStorage'))
  //   // if (process.env.VUE_ENV === 'client') {
  //   //   if (Object.keys(state.href).length) {
  //   //     return state.href
  //   //   }

  //   //   return state.href = sessionMemory.getItem('href')
  //   // }
  // }
}

export default getters