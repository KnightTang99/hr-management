import { getUserAvatar, getUserInfo, login } from '@/api/user'

import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth' // 导入本地持久化方法
const state = {
  token: getToken(), // 初始化vuex从本地获取token
  userInfo: {} // 定义用户信息的空对象，不能设置为null，当拿userInfo里面的信息的时候会报错
}
const mutations = {
  setToken(state, token) {
    state.token = token // 更新vuex内的token
    setToken(token) // 更新本地token
  },
  removeToken(state) {
    state.token = null // vuex 内的token置空
    removeToken() // 移除本地token
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 定义登录的方法
  async login(context, data) {
    const res = await login(data) // await 后面的函数是一个微任务，只有等await执行完毕才能执行下面的代码
    // 不进行判断是因为在request中已经判断过
    context.commit('setToken', res)
    setTimeStamp()
  },
  // 获取用户信息的方法
  async getUserInfo(context) {
    const result = await getUserInfo()
    const detail = await getUserAvatar(result.userId)
    const baseResult = { ...result, ...detail }
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  // 退出登录
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
