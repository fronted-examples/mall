import Storage from '@/utils/storage'
/**
 *
 * @param {*} store
 * @param {Object} options { key: Array, storage: String }
 */
function createPersistedState (store, options) {
  options = options || {}
  if (!options.keys) {
    throw new Error('keys is required')
  }

  if (Object.prototype.toString.call(options.keys) !== '[object Array]') {
    throw new Error('keys must be Array')
  }

  if (!options.keys.length) {
    throw new Error('keys can not be empty')
  }

  const sessionStorage = new Storage(options.storage)

  if (process.env.VUE_ENV === 'client') {

    const sessionCache = {}
    options.keys.forEach(key => {
      const cachedState = sessionStorage.getItem(key)
      sessionCache[key] = cachedState
    })

    store.replaceState(Object.assign({}, store.state, sessionCache))
  }

  store.subscribe((mutation, state) => {
    options.keys.forEach((key) => {
      sessionStorage.setItem({
        name: key,
        value: state[key]
      })
    })
  })
}

export default createPersistedState