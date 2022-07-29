import { createRouter, createWebHashHistory } from 'vue-router'

import { getToken } from '@/untils/token.js'

// 导入登录页面
// import LoginReg from '@/views/Login/LoginReg.vue'
// 导入布局页面
// import Layout from '@/views/Layout/Layout.vue'
// import Home from '@/views/Home/Home.vue'
// import User from '@/views/Users/User.vue'
// import Search from '@/views/Search/Search.vue'
// import SearchResult from '@/views/Search/SearchResult.vue'
// import ArticleDetail from '@/views/ArticleDetail/ArticleDetail.vue'
// import UserEditor from '@/views/Users/UserEdit.vue'
// import Chat from '@/views/Chat/Chat.vue'

// 路由懒加载：为了让第一个页面，加载的app.js小一点，打开网页变快
// 思路：把组件对应的js分成若干个js文件，路由切换到哪个页面，才去加载对应的js文件
const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/LoginReg.vue'),
    name: 'login',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/layout',
    redirect: '/layout/home',
    component: () => import('@/views/Layout/Layout.vue'),
    name: 'layout',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/Home.vue'),
        name: 'home',
        meta: {
          scrollT: 0, // 保存首页离开时滚动条的位置
          keepAlive: true
        }
      },
      {
        path: 'user',
        component: () => import('@/views/Users/User.vue'),
        name: 'user',
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search/Search.vue'),
    name: 'search',
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/search_result/:keywords',
    component: () => import('@/views/Search/SearchResult.vue'),
    name: 'searchResult',
    meta: {
      keepAlive: false
    }
  },
  {
    // 文章详情页
    path: '/detail',
    component: () => import('@/views/ArticleDetail/ArticleDetail.vue'),
    name: 'detail',
    meta: {
      keepAlive: false
    }
  },
  {
    // 用户资料编辑
    path: '/user_editor',
    component: () => import('@/views/Users/UserEdit.vue'),
    name: 'userEditor',
    meta: {
      keepAlive: false
    }
  },
  // 小思同学聊天
  {
    path: '/chat',
    component: () => import('@/views/Chat/Chat.vue'),
    name: 'chat',
    meta: {
      keepAlive: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, form, next) => {
  // 如果已经登录了，就不需要跳转到登录页面
  if (getToken()?.length > 0 && to.path === '/login') {
    // 不放行
    next(false)
  } else {
    next()
  }
})

export default router
