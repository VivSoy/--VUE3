import { createRouter, createWebHashHistory } from 'vue-router'

// 导入登录页面
import LoginReg from '@/views/Login/LoginReg.vue'
// 导入布局页面
import Layout from '@/views/Layout/Layout.vue'
import Home from '@/views/Home/Home.vue'
import User from '@/views/Users/User.vue'
import Search from '@/views/Search/Search.vue'
import SearchResult from '@/views/Search/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail/ArticleDetail.vue'
import UserEditor from '@/views/Users/UserEdit.vue'
import Chat from '@/views/Chat/Chat.vue'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginReg
  },
  {
    path: '/layout',
    redirect: '/layout/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search_result/:keywords',
    component: SearchResult
  },
  {
    // 文章详情页
    path: '/detail',
    component: ArticleDetail
  },
  {
    // 用户资料编辑
    path: '/user_editor',
    component: UserEditor
  },
  // 小思同学聊天
  {
    path: '/chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
