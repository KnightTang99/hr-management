import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // actions 里面的函数不管是不是异步都会返回promise
  filterRoutes(context, menus) {
    const routes = []
    routes.push(...asyncRoutes.filter(item => menus.includes(item.name)))
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
