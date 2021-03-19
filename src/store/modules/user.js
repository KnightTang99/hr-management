import { login } from '@/api/user'

import { getToken, setToken, removeToken } from '@/utils/auth' // 导入本地持久化方法
const state = {
  token: getToken() // 初始化vuex从本地获取token
}
const mutations = {
  setToken(state, token) {
    state.token = token // 更新vuex内的token
    setToken(token) // 更新本地token
  },
  removeToken(state) {
    state.token = null // vuex 内的token置空
    removeToken() // 移除本地token
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data) // await 后面的函数是一个微任务，只有等await执行完毕才能执行下面的代码
    // 不进行判断是因为在request中已经判断过
    context.commit('setToken', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
