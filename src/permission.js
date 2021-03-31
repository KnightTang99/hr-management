import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404'] // 白名单，类似路由里面的meta属性
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  Nprogress.start()
  if (store.getters.token) {
    // 这里不能用computed方式拿到getters
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userInfo.username) {
        // 不能直接判断空对象userInfo
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加路由以后还需要重新跳转一下，因为next()没有参数的话是直接放行，这时候路由表里面还没有你刚添加的路由，next()有值的话就会中断当前路由，重新进入路由导航
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  Nprogress.done() // 如果没有这个，进度条就不会关闭，因为当从dashBoard到login会自动又跳回dashBoard，没有出现路由跳转，就不会走后置守卫
})
router.afterEach(() => {
  Nprogress.done()
})
