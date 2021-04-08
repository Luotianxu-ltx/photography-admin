import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: '首页',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '首页',
  //       meta: { title: '首页', icon: 'dashboard' }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/photographer/list',
    name: '摄影师管理',
    children: [
      {
        path: 'list',
        component: () => import('@/views/photography/photographer/list'),
        name: '摄影师列表',
        meta: { title: '摄影师列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/photographer',
    component: Layout,
    redirect: '/photographer/list',
    name: '摄影师管理',
    meta: {
      title: '摄影师管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/photography/photographer/list'),
        name: '摄影师列表',
        meta: { title: '摄影师列表', icon: 'list' }
      },
      {
        path: 'edit',
        component: () => import('@/views/photography/photographer/save'),
        name: '编辑',
        meta: { title: '编辑', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/photography/photographer/save'),
        name: '编辑',
        hidden: true,
        meta: { title: '编辑', icon: 'tree' }
      }
    ]
  },
  // 课程管理
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: {
      title: '课程管理',
      icon: 'form'
    },
    children: [
      {
        path: 'courseSubjectOneList',
        component: () => import('@/views/photography/courseSubject/courseSubjectOneList'),
        name: '课程分类管理',
        meta: { title: '课程分类管理', icon: 'tree' }
      },
      {
        path: 'courseSubjectTwoList/:id',
        component: () => import('@/views/photography/courseSubject/courseSubjectTwoList'),
        name: '课程二级分类管理',
        hidden: true,
        meta: { title: '课程二级分类管理', icon: 'tree' }
      },
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/photography/course/list'),
        meta: { title: '课程列表', icon: 'list' }
      },
      {
        path: 'comment',
        name: '课程评论管理',
        component: () => import('@/views/photography/course/courseComment'),
        meta: { title: '课程评论管理', icon: 'list' }
      },
      {
        path: 'info',
        name: '发布课程',
        component: () => import('@/views/photography/course/info'),
        meta: { title: '发布课程', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: '编辑课程基本信息',
        component: () => import('@/views/photography/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '编辑课程大纲',
        component: () => import('@/views/photography/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: '发布课程',
        component: () => import('@/views/photography/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },
  // 照片管理
  {
    path: '/picture',
    component: Layout,
    redirect: '/picture/list',
    name: '照片管理',
    meta: {
      title: '照片管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/photography/picture/list'),
        name: '照片管理',
        meta: { title: '照片管理', icon: 'list' }
      }
    ]
  },
  // 文章管理
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '文章管理',
    meta: {
      title: '文章管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/photography/article/list'),
        name: '文章管理',
        meta: { title: '文章管理', icon: 'list' }
      }
    ]
  },
  // 前端首页模块
  {
    path: '/index',
    component: Layout,
    redirect: '/index/banner',
    name: '首页管理',
    meta: {
      title: '首页管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'banner',
        component: () => import('@/views/photography/index/banner'),
        name: '轮播图管理',
        meta: { title: '轮播图管理', icon: 'list' }
      }
    ]
  },
  // 用户管理模块
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '会员管理',
    meta: {
      title: '会员管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/photography/user/list'),
        name: '会员列表',
        meta: { title: '会员列表', icon: 'list' }
      },
      {
        path: 'edit',
        component: () => import('@/views/photography/user/edit'),
        name: '编辑',
        meta: { title: '编辑', icon: 'list' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/photography/user/edit'),
        name: '编辑',
        hidden: true,
        meta: { title: '编辑', icon: 'list' }
      }
    ]
  },
  // 订单管理模块
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: '订单管理',
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/photography/order/list'),
        name: '订单列表',
        meta: { title: '订单列表', icon: 'list' }
      }
    ]
  },
  // 统计模块
  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/create',
    name: '统计分析',
    meta: {
      title: '统计分析',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/photography/sta/create'),
        name: '生成数据',
        meta: { title: '生成数据', icon: 'list' }
      },
      {
        path: 'show',
        component: () => import('@/views/photography/sta/show'),
        name: '图表显示',
        meta: { title: '图表显示', icon: 'list' }
      }
    ]
  },
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/photography/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/photography/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/photography/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/photography/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/photography/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }

    ]
  }
  // 统计模块
  // {
  //   path: '/form',
  //   component: Layout,
  //   redirect: '/form/courseShow',
  //   name: '数据大屏',
  //   meta: {
  //     title: '数据大屏',
  //     icon: 'el-icon-s-custom'
  //   },
  //   children: [
  //     {
  //       path: 'form',
  //       component: () => import('@/views/photography/form/form'),
  //       name: '数据大屏',
  //       meta: { title: '数据大屏', icon: 'list' }
  //     },
  //     {
  //       path: 'courseShowPage',
  //       component: () => import('@/views/photography/form/hot'),
  //       name: '列表',
  //       meta: { title: '列表', icon: 'list' }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
