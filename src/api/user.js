// 用户相关的API

import request from '@/untils/request'

// 获取用户信息
export const userInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑用户照片资料
export const changePhoto = photo => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo // photo是formData对象，浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}

// 编辑用户个人资料
export const changeUserProfile = ({ name, birthday }) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      birthday
    }
  })
}
