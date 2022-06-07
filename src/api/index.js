import request from '@/untils/request'
import { getStorage } from '@/untils/storage.js'
// import { setToken } from '@/untils/token.js'

// 既引入也同时向外按需导出所有引入过来的方法
export * from '@/api/articleDetail.js'
export * from '@/api/home.js'
export * from '@/api/login.js'
export * from '@/api/search.js'
export * from '@/api/user.js'

// 接口方法, 只负责调用一个接口, 返回一个Promise对象

// 刷新用户token
export const refreshToken = () => {
  return request({
    method: 'PUT',
    url: '/v1_0/authorizations',
    headers: {
      // 请求拦截器统一携带的是token，而这次请求需要的是refresh_token
      // 所以在axios请求拦截器里判断，就是为了这种情况准备的
      Authorization: 'Bearer ' + getStorage('refresh_token')
    }
  })
}
