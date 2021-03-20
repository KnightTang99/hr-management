import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404'] // 白名单，类似路由里面的meta属性
// 路由前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  if (store.getters.token) {
    // 这里不能用computed方式拿到getters
    if (to.path === '/login') {
      next('/')
    } else {
      next()
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
