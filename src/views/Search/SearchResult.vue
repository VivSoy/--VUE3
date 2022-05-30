<template>
  <div class="searchResult-container">
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>

    <!-- 搜索结果内容 -->
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <ArticleItem v-for="item in articleList" :key="item.art_id" :article="item" @click="$router.push(`/detail?art_id=${item.art_id}`)" :showX="false"></ArticleItem>
    </van-list>
  </div>
</template>

<script>
// 引用文章组件
import ArticleItem from '@/components/ArticleItem.vue'
// 导入获取搜索结果的api
import { searchResult } from '@/api/index.js'
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      articleList: [], // 获取到的文章数据
      page: 1,
      loading: false, // 加载状态
      finished: false // 是否全部加载完成
    }
  },
  methods: {
    onLoad() {
      if (this.articleList.length > 0) {
        this.page++
        this.getSearchResult()
      }
    },
    // 封装获取搜索结果方法
    async getSearchResult() {
      const res = await searchResult({
        q: this.$route.params.keywords,
        page: this.page
      })
      if (res.data.data.results.length === 0) {
        // 没有更多数据
        this.finished = true
      }
      this.articleList = [...this.articleList, ...res.data.data.results] // 与前面获取的数据进行合并
      this.loading = false
    }
  },

  created() {
    // 获取到搜索结果
    this.getSearchResult()
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
  :deep(.van-nav-bar) {
    background-color: #007bff;
    .van-icon {
      color: white;
    }
  }
}
</style>
