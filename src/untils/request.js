// 封装axios
import Axios from 'axios'
import router from '@/router/index.js'
import { Notify } from 'vant'
import { getToken, removeToken } from '@/untils/token.js'
// import { refreshToken } from '@/api/index.js'

const axios = Axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 根地址
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 统一携带token
    // 判断本地有token再携带，判断具体api/index.js 里如果没有携带Authorization，再添加上去
    // ？. 可选链操作符，如果前面对象里面没有length，整个表达式原地返回undefined
    if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    // 当状态码为401时表示登录身份过期，跳转登录
    console.dir(error)
    if (error.response.status === 401) {
      // 不能使用this.$router

      Notify({ type: 'warning', message: '身份已过期' })

      // 方式1：清除token，强制跳转到登录页，用户有感知
      removeToken() // 清空token，让路由守卫判断失效
      // router.replace('/login')
      // router.currentRoute 相当于 在vue文件内this.$route -> 当前路由对象信息
      // fullPath, 路由对象里完整路由路径#后面的一切
      router.replace(`/login?path=${router.currentRoute.fullPath}`)

      // 方式2：使用refresh_token换回新的token再继续使用，js代码实现，用户无感知
      // const res = await refreshToken()
      // // console.log(res)
      // // 1、将更新的token重新保存
      // setToken(res.data.data.token)
      // // 2、更新新的token在请求头里
      // error.config.headers.Authorization = `Bearer ${res.data.data.token}`
      // // 3、将未完成的请求再次发起
      // // error.config就是上一次请求的配置对象
      // return axios(error.config)
    }
    // else if ( error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put' ) {
    //   // 刷新的refresh_token也过期了
    //   localStorage.clear() // 清除localStorage中的所有数据
    //   router.replace('/login')
    //   Notify({ type: 'warning', message: '身份已过期' })
    // }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
