<template>
  <div class="detail-container">
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ this.content.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="this.content.aut_name" :label="formaDate(this.content.pubdate)">
        <template #icon>
          <img :src="this.content.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button type="primary" size="mini" v-if="this.content.is_followed" @click="followed(false)">已关注</van-button>
            <van-button icon="plus" type="primary" size="mini" plain v-else @click="followed(true)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="this.content.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
        <van-button icon="good-job" type="danger" size="small" v-if="this.content.attitude === 1" @click="likeFn(false)">已点赞</van-button>
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="likeFn(true)">点赞</van-button>
      </div>
    </div>

    <!-- 底部评论区域 -->
    <CommentList></CommentList>
  </div>
</template>

<script>
// 调用文章详情内容的api
import { getArticleDetail, followedUserAPI, unFollowedUserAPI, articleLikeAPI, articleUnlikeAPI } from '@/api/index.js'
// 导入时间处理插件
import { timeAgo } from '@/untils/date.js'
/* 导入底部评论区域 */
import CommentList from '@/views/ArticleDetail/CommentList.vue'
export default {
  data() {
    return {
      content: {} // 获取到的文章所有详情
    }
  },
  async created() {
    const res = await getArticleDetail({
      article_id: this.$route.query.art_id
    })
    // 将获取到的详情数据传入data中
    this.content = res.data.data
  },
  methods: {
    formaDate: timeAgo,
    // 控制用户关注与取关操作
    async followed(bool) {
      // 关注用户
      if (bool === true) {
        this.content.is_followed = true
        await followedUserAPI({
          target: this.content.aut_id
        })
        // 取关用户
      } else {
        this.content.is_followed = false
        await unFollowedUserAPI({
          target: this.content.aut_id
        })
      }
    },
    // 控制文章的点赞操作
    async likeFn(bool) {
      // 对文章进行点赞
      if (bool === true) {
        this.content.attitude = 1
        await articleLikeAPI({
          target: this.content.art_id
        })
        // 对文章取消点赞
      } else {
        this.content.attitude = -1
        await articleUnlikeAPI({
          target: this.content.art_id
        })
      }
    }
  },
  components: {
    CommentList
  }
}
</script>

<style lang="less" scoped>
.detail-container {
  .van-nav-bar {
    background-color: #007bff;
    :deep(.van-icon) {
      color: white;
    }
    :deep(.van-nav-bar__title) {
      color: white;
    }
  }
}
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  :deep(img) {
    width: 100%;
  }
  :deep(pre) {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
