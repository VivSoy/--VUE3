<template>
  <van-config-provider :theme-vars="themeVars">
    <van-nav-bar title="黑马头条" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="formLogin.mobile" required name="mobile" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请填写完整的手机号', pattern: /^1[3456789]\d{9}$/ }]" />
        <van-field v-model="formLogin.code" required type="password" name="code" label="密码" placeholder="请输入6位密码" :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block :loading="isLoading" loading-text="登录中" :disabled="isLoading" type="primary" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </van-config-provider>
</template>

<script>
// 引入loginAPI
import { LoginAPI } from '@/api/index.js'
import { Notify } from 'vant'
// 导入token操作模块
import { setToken } from '@/untils/token.js'
import { setStorage } from '@/untils/storage.js'
export default {
  naem: 'MyLoginReg',
  data() {
    return {
      formLogin: {
        mobile: '15522506035',
        code: '246810' // 默认只能用246810后台规定了
      },
      isLoading: false // 在请求过程中禁用按钮，防止多次点击
    }
  },
  methods: {
    // onSubmit(value) {
    //   console.log(value)
    // }
    async onSubmit() {
      this.isLoading = true
      try {
        const res = await LoginAPI(this.formLogin)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.data.token)
        setStorage('refresh_token', res.data.data.refresh_token)
        this.$router.replace('/layout') // 登录成功后跳转到布局页面
      } catch (err) {
        console.error(err)
        Notify({ type: 'danger', message: '手机账号或密码错误' })
      }
      this.isLoading = false
    }
  },
  setup() {
    // 全局配置样式
    const themeVars = {
      navBarBackgroundColor: '#007bff',
      navBarTitleTextColor: '#ffffff'
    }
    return {
      themeVars
    }
  }
}
</script>

<style lang="less" scoped>
// .van-nav-bar {
//   background-color: #007bff;
//   :deep(.van-nav-bar__title) {
//     color: #ffffff;
//   }
// }
</style>
