import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 从cookie中取得token
  const hasToken = getToken()

  // 如果有token，也就是在登录的情况下
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 从store中取得用户的roles
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 如果有权限
      if (hasRoles) {
        next()
      } else {
        // 如果没有权限
        try {
          // 获取用户信息
          const { roles } = await store.dispatch('user/getInfo')

          // 生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 将可访问路由添加到路由上
          router.addRoutes(accessRoutes)

          // 进入路由
          next({ ...to, replace: true })
        } catch (error) {
          // 清空路由
          await store.dispatch('user/resetToken')
          Message.error(error || '系统错误')
          // 跳转到login页面
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token，也就是没有登录的情况下

    if (whiteList.indexOf(to.path) !== -1) {
      // 判断是否是白名单
      next()
    } else {
      // 跳转到login页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
