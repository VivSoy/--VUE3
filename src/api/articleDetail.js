// 文章细节相关的API

import request from '@/untils/request'

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
