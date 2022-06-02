// 封装axios
import Axios from 'axios'
import router from '@/router/index.js'
import { Notify } from 'vant'
import { getToken } from '@/untils/token.js'

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
  function (error) {
    // 当状态码为401时表示登录身份过期，跳转登录
    if (error.response.status === 401) {
      // 不能使用this.$router
      router.replace('/login')
      Notify({ type: 'warning', message: '身份已过期' })
    }
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
