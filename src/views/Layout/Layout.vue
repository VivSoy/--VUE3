<template>
  <div>
    <!-- 二级路由页面 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path"></component>
    </router-view>

    <!-- 底部导航bar -->
    <van-tabbar v-model="active" placeholder route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'MyLayout',
  data() {
    return {
      active: ''
    }
  }
}
</script>

<style></style>
