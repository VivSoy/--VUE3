<template>
  <!-- 二级路由页面 -->
  <router-view></router-view>

  <!-- 底部导航bar -->
  <van-tabbar v-model="active" placeholder route>
    <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: ''
    }
  }
}
</script>

<style></style>
