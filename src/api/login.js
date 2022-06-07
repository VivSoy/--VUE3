// 登录相关的API

import request from '@/untils/request'

// 登录接口
// axios内部，会把参数对象转成json字符串格式发到后台
// axios内部，会自动携带请求参数headers：Content-Type：'application/json'
export const LoginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
