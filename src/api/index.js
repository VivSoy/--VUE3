import request from '@/untils/request'
// import { setToken } from '@/untils/token.js'

// 接口方法, 只负责调用一个接口, 返回一个Promise对象
// 获取所有频道
export const allChannelListAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

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

// 获取用户选择的频道
// 用户没有登录，默认返回后台设置的默认频道列表
export const getUserChanneListAPI = () =>
  request({
    url: '/v1_0/user/channels'
  })

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

// 重置更新用户的频道
export const updateChannel = ({ channels }) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })

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

// 获取文章详情的api
export const getArticleDetail = ({ article_id }) => {
  return request({
    url: `/v1_0/articles/${article_id}`
  })
}

// 关注用户
export const followedUserAPI = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注用户
export const unFollowedUserAPI = ({ target }) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 对文章进行点赞
export const articleLikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消文章点赞
export const articleUnlikeAPI = ({ target }) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

// 获取文章评论
export const GetCommentsAPI = ({ art_id, offset, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: art_id,
      offset,
      limit
    }
  })
}

// 对评论或评论回复点赞
export const likingComments = ({ target }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export const dislikeComments = ({ target }) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 发布评论
export const sendComments = ({ target, content }) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content
    }
  })
}
