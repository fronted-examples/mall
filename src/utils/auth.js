const Cookies = process.env.VUE_ENV === 'client' ? require('js-cookie') : undefined

export function getToken (TokenKey) {
  return Cookies ? Cookies.get(TokenKey) : ''
}

export function setToken (TokenKey, token) {
  return Cookies && Cookies.set(TokenKey, token)
}

export function removeToken (TokenKey) {
  return Cookies && Cookies.remove(TokenKey)
}

// 解析cookie中的参数
export function cookieParse (cookie) {
  if (!cookie) { return {} }
  const cookies = {}
  cookie.split(';').forEach(item => {
    const parts = item.split('=')
    cookies[parts[0].trim()] = parts[1].trim()
  })
  return cookies
}

