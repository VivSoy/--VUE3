//  搜索相关的API

import request from '@/untils/request'

// 获取联想建议
export const suggestionList = ({ q }) => {
  return request({
    url: '/v1_0/suggestion',
    methods: 'GET',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const searchResult = ({ q, page }) => {
  return request({
    url: '/v1_0/search',
    methods: 'GET',
    params: {
      q,
      page
    }
  })
}
