import Cookies from 'js-cookie'

const TokenKey = 'hrProject_Token' // token 的命名

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
