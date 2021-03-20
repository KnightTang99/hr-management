import Cookies from 'js-cookie'

const TokenKey = 'hrProject_Token' // token 的命名
const timeStamp = 'check_timeout'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeStamp, Date.now())
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeStamp)
}
