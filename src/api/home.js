// 首页相关的API

import request from '@/untils/request'

// 获取文章列表数据

export const articleListAPI = ({ channel_id, timestamp }) =>
  request({
    url: '/v1_0/articles',
    params: {
      //       // 这里的参数，axios会帮你拼接在URL？后面（查询字符串）
      channel_id,
      timestamp
    }
  })

// 对文章不感兴趣
export const dislikeArticle = target =>
  request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })

// 举报文章

export const reportArticle = ({ target, type }) =>
  request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type
    }
  })

// 获取所有频道
export const allChannelListAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 获取用户选择的频道
// 用户没有登录，默认返回后台设置的默认频道列表
export const getUserChanneListAPI = () =>
  request({
    url: '/v1_0/user/channels'
  })

// 重置更新用户的频道
export const updateChannel = ({ channels }) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
