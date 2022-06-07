<template>
  <div class="search-container">
    <!-- 搜索头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search v-model="value" shape="round" background="#007bff" placeholder="请输入搜索关键词" v-fofo @update:model-value="inputFn" @search="enterFn" />
    </div>
    <!-- 搜索列表 -->
    <div class="search-list" v-if="value.length !== 0">
      <div class="search-list-item" v-html="lightFn(item, value)" v-for="(item, index) in suggestList" :key="index" @click="toResult(item)"></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" @click="clearHis" />
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="historyList">
        <div class="histort-item" v-for="(str, index) in history" :key="index" @click="clickFn(str)">{{ str }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入搜索联想的api
import { suggestionList } from '@/api/index.js'
// 导入关键字高亮组件
import { lightFn } from '@/untils/lightFn'
import { getStorage, setStorage } from '@/untils/storage.js'
export default {
  name: 'MySearch',
  data() {
    return {
      value: '',
      timer: null, // 防抖的定时器
      suggestList: [], // 搜索联想的数据
      history: JSON.parse(getStorage('his')) || [] // 搜索历史
    }
  },
  methods: {
    // 实时监听输入框内容改变 防抖
    async inputFn() {
      // 防抖：延时执行逻辑代码，事件再次触发时，清除上一个定时器
      clearTimeout(this.timer)
      if (this.value.length === 0) {
        this.suggestList = []
      }
      this.timer = setTimeout(async () => {
        if (this.value.length === 0) return
        const res = await suggestionList({
          q: this.value
        })
        console.log(res)
        this.suggestList = res.data.data.options
      }, 500)
    },
    lightFn,
    // 按回车时跳转
    enterFn() {
      // 跳转之前把搜索关键字保存到本地
      if (this.value.length > 0) {
        this.history.push(this.value)
        this.moveFn(this.value)
      }
    },
    /* 点击联想列表时跳转 */
    toResult(item) {
      // 跳转之前把搜索关键字保存到本地
      if (item.length > 0) {
        this.history.push(item)
        this.moveFn(item)
      }
    },
    // 点击搜索历史跳转
    clickFn(str) {
      this.moveFn(str)
    },
    // 封装跳转搜索结果方法
    moveFn(theKW) {
      // 因为watch监听器也是异步执行，为保证在页面跳转之前将数据存储到本地，将跳转页面变为异步
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${theKW}`
        })
      }, 0)
    },
    // 清空搜索历史
    clearHis() {
      this.history = []
    }
  },
  // watch监听器
  watch: {
    history: {
      deep: true, // 因为history是数组 所以需要深度监听
      handler() {
        // 立即覆盖式保存到本地
        const theSet = new Set(this.history)
        const arr = Array.from(theSet) // Array.form 将伪数组或对象转化为数组
        setStorage('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 0.3733rem;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
    :deep(.van-field__left-icon) {
      color: #000;
    }
  }
}
.search-list {
  .search-list-item {
    font-size: 16px;
    padding: 0 0.4rem;
    line-height: 50px;
    border-bottom: 1px solid #f8f8f8;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-history {
  padding: 0 10px;
  .histort-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
