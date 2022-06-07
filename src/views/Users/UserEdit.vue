<template>
  <div class="userEdit-container">
    <!-- header区域 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.back()" />

    <!-- 资料编辑 -->
    <van-cell-group>
      <van-cell title="头像" is-link center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #default>
          <van-image round class="avatar" :src="$store.state.userPhoto" @click="imageClickFn" />
          <!-- 上传文件 -->
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>

      <van-cell title="名称" is-link :value="userProfile.name" @click="changeName" />
      <van-dialog v-model:show="showName" title="修改名称" show-cancel-button :before-close="onNameDialogBeforeClose">
        <van-field v-model="userName" input-align="center" placeholder="请输入用户名" v-fofo />
      </van-dialog>
      <van-cell title="性别" is-link :value="userProfile.gender ? '女' : '男'" />
      <van-cell title="生日" is-link :value="userProfile.birthday" @click="showBirthday" />
      <van-popup v-model:show="showBir" position="bottom">
        <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="changeBir" @cancel="this.showBir = false" />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
// 获取用户个人资料的api、更换头像、更换名字和生日
import { getUserProfile, changePhoto, changeUserProfile } from '@/api/index.js'
import { Notify } from 'vant'
// 导入时间格式化函数
import { formateDate } from '@/untils/date.js'
// 导入vuex中的map
import { mapMutations } from 'vuex'
export default {
  naem: 'MyUserEdit',
  data() {
    return {
      userProfile: {}, // 用户个人资料
      showName: false, // 控制修改名字提示框的出现
      userName: '', // 同步输入内容
      minDate: new Date(1900, 0, 1), // 设置最小时间
      maxDate: new Date(), // 设置最大时间
      currentDate: new Date(), // 当前选择的时间
      showBir: false // 时间选择组件默认隐藏
    }
  },
  async created() {
    const res = await getUserProfile()
    this.userProfile = res.data.data
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO']),
    // 点击图片，触发隐藏的input，提交文件
    imageClickFn() {
      this.$refs.iptFile.click() // 利用$refs与input绑定起来，可以运用input的事件
    },
    // 修改头像
    async onFileChange(e) {
      if (e.target.files.length === 0) return // 用户未选择图片
      const fd = new FormData() // 创建一个表单对象
      fd.append('photo', e.target.files[0])
      const res = await changePhoto(fd)
      this.userProfile.photo = res.data.data.photo // 更换头像
      this.SET_USERPHOTO(res.data.data.photo) // 更新成功后同步到vuex中
    },
    // 修改用户名
    changeName() {
      // 显示提示框
      this.showName = true
      this.userName = this.userProfile.name
    },
    async onNameDialogBeforeClose(action) {
      // 点击确认按钮
      if (action === 'confirm') {
        // 正则校验规则
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.userName)) {
          await changeUserProfile({
            name: this.userName
          })
          this.userProfile.name = this.userName
          return true
        } else {
          Notify({ type: 'warning', message: '用户名为1-7位中英文和数字组合' })
        }
      } else {
        // 关闭弹窗
        return true
      }
    },
    // 选择生日组件展示
    showBirthday() {
      this.showBir = true
    },
    // 修改生日
    async changeBir() {
      const dataStr = formateDate(this.currentDate)
      const res = await changeUserProfile({
        birthday: dataStr
      })
      console.log(res)
      this.userProfile.birthday = dataStr
    }
  }
}
</script>

<style lang="less" scoped>
.userEdit-container {
  .van-nav-bar {
    background-color: #007dff;
    :deep(.van-icon) {
      color: white;
    }
    :deep(.van-nav-bar__text) {
      color: white;
    }
    :deep(.van-nav-bar__title) {
      color: white;
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
