<template>
  <!-- 下拉刷新 -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <!-- 上滑加载 -->
    <van-list v-model:loading="loading" :finished="finished" offset="50" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
      <!-- 文章列表 -->
      <ArticleItem v-for="item in list" :key="item.art_id" :article="item" @dislike="dislikeFn" @report="reportFn" @click="$router.push(`/detail?art_id=${item.art_id}`)"></ArticleItem>
    </van-list>
  </van-pull-refresh>
</template>

<script>
/* 引入文章结构组件 */
import ArticleItem from '@/components/ArticleItem.vue'
/* 导入获取文章列表的API */ /* 不感兴趣文章API */
import { articleListAPI, dislikeArticle, reportArticle } from '@/api/index.js'
import { Notify } from 'vant'
export default {
  name: 'AllArticle',
  props: {
    // list: {
    //   type: Array
    // } // 父组件向子组件传递的文章列表数组
    channelId: Number // 频道id
  },
  data() {
    return {
      list: [], // 文章列表数组
      loading: false, // 底部加载状态
      finished: false, // 底部加载完成状态
      refreshing: false, // 刷新状态
      timestamp: new Date().getTime() // 用于分页
    }
  },
  async created() {
    this.getArticleList()
  },
  components: {
    ArticleItem
  },
  methods: {
    onLoad() {
      if (this.list.length === 0) {
        this.loading = false
      }
      this.getArticleList()
    },
    onRefresh() {
      this.list = []
      this.timestamp = new Date().getTime()
      this.getArticleList()
    },
    // 将获取文章列表封装函数
    async getArticleList() {
      const res = await articleListAPI({ channel_id: this.channelId, timestamp: this.timestamp })
      // pre_timestamp (下一段开头文章的时间戳)
      // 第一次 系统时间(timestamp)  -->  后台 返回0-9条数据  携带第10条数据的pre_timestamp返回
      // 第二次的系统时间就传（上一段的pre_timestamp）获取下一段数据
      this.list = [...this.list, ...res.data.data.results]
      // 获取pre_timestamp并存入timestamp
      this.timestamp = res.data.data.pre_timestamp
      this.loading = false
      if (res.data.data.pre_timestamp === null) {
        // 表示请求到最后的数据了
        this.finished = true
      }
      this.refreshing = false
    },
    // 反馈不感兴趣文章
    async dislikeFn(id) {
      try {
        await dislikeArticle(id)
      } catch (err) {}
    },
    // 举报文章
    async reportFn(target, type) {
      try {
        await reportArticle({ target, type })
        Notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        Notify({ type: 'warning', message: '反馈失败，请联系管理员' })
      }
    }
  }
}
</script>

<style></style>
