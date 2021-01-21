import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
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
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
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
  },
  // 统计模块
  {
    path: '/form',
    component: Layout,
    redirect: '/form/courseShow',
    name: '数据大屏',
    meta: {
      title: '数据大屏',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'form',
        component: () => import('@/views/photography/form/form'),
        name: '数据大屏',
        meta: { title: '数据大屏', icon: 'list' }
      },
      {
        path: 'courseShowPage',
        component: () => import('@/views/photography/form/hot'),
        name: '列表',
        meta: { title: '列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: '123',
        meta: { title: '123', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
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
