<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="$store.state.userPhoto" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ userInfo.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link @click="this.$router.push('/user_editor')" />
      <van-cell icon="chat-o" title="小思同学" is-link to="/chat" />
      <van-cell icon="warning-o" title="退出登录" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
// 获取用户资料
import { userInfoAPI } from '@/api/index.js'
// 引入提示框插件
import { Dialog } from 'vant'
// 移除token
import { removeToken } from '@/untils/token.js'
// 导入vuex中的map
import { mapMutations } from 'vuex'
export default {
  name: 'MyUser',
  data() {
    return {
      // 存储用户信息
      userInfo: {}
    }
  },
  async created() {
    const res = await userInfoAPI()
    this.userInfo = res.data.data

    // 使用vuex里的state两种方法
    // 第一种
    // this.$store.commit('SET_USERPHOTO',this.userInfo.photo)
    // 第二种
    // 首先从vuex导入mapMutations，在方法中映射...mapMutations(['SET_USERPHOTO'])，就可以使用SET_USERPHOTO这个方法
    this.SET_USERPHOTO(this.userInfo.photo)
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO']),
    logout() {
      Dialog.confirm({
        title: '提示',
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // 清空token，跳转到登录页
          removeToken('loginToken')
          this.$router.replace('/login')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 0.5333rem;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 1.6rem;
        height: 1.6rem;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 0.2667rem;
      }
      .username {
        font-size: 0.3733rem;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 0.3733rem;
    padding: 0.8rem 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
