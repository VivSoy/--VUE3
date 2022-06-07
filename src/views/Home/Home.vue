<template>
  <div class="home-container">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar placeholder fixed z-index="999">
        <!-- 自定义左侧区域内容 -->
        <template #left>
          <img :src="imgObj" class="logo" />
        </template>
        <template #right>
          <!-- postcss只能翻译style里css的样式代码，标签内行内样式无法转换px转换rem，手动计算 -->
          <van-icon name="search" size="0.48rem" color="#ffffff" @click="$router.push('/search')" />
        </template>
      </van-nav-bar>
      <!-- tab导航 -->
      <van-tabs v-model:active="channelId" animated sticky offset-top="1.226667rem">
        <van-tab v-for="item in channeList" :key="item.id" :title="item.name" :name="item.id"
          ><!-- name属性绑定频道id -->
          <!-- 文章列表 -->
          <ArticleList :channelId="channelId"></ArticleList>
          <!-- 父组件向子组件传递数据 -->
        </van-tab>
      </van-tabs>
      <!-- 频道加号 -->
      <van-icon name="plus" class="moreChannels" size="0.37333334rem" @click="showPopup" />
      <van-popup v-model:show="show" class="popup" :style="{ height: '100%', width: '100%' }" closeable close-icon-position="top-right" @close="show = false">
        <ChannelEdit :myChannel="channeList" @removeChannel="removeChannelFn" @addChannel="addChannelFn" @enterChannel="enterChannelFn"></ChannelEdit>
      </van-popup>
    </van-config-provider>
  </div>
</template>

<script>
// 导入图片  因为脚手架底层运作会把图片当做模块处理
import logoPng from '@/assets/toutiao_logo.png'
// 导入请求频道列表模块
import { getUserChanneListAPI, updateChannel } from '@/api/index.js'
/* 导入文章列表组件 */
import ArticleList from '@/views/Home/ArticleList.vue'
// 导入频道编辑组件
import ChannelEdit from '@/views/Home/ChannelEdit.vue'
export default {
  name: 'MyHome',
  data() {
    return {
      imgObj: logoPng,
      channelId: 0, // tab栏默认展示标签索引的内容 默认频道ID为0
      channeList: [],
      show: false // 添加频道图层默认不展示
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    // 显示弹窗
    showPopup() {
      this.show = true
    },
    // 更新频道
    async updateChannelFn() {
      const newArr = this.channeList.map(obj => {
        // 对频道列表进行遍历，将个对象拷贝到newObj上，返回一个新数组
        const newObj = { ...obj }
        return newObj
      })
      // 此时newArr就是对channelist 深拷贝后的新数组
      // 剔除推荐频道
      const index = newArr.findIndex(obj => obj.name === '推荐')
      // 删除了推荐频道对象
      newArr.splice(index, 1)
      // 因为后台接口需要id和seq两个参数,没有seq，因此需要对参数进行转换
      newArr.forEach((obj, index) => {
        // 删除原先的name值
        delete obj.name
        // 创建新的键值对
        obj.seq = index + 1
      })
      // 调用接口
      await updateChannel({
        channels: newArr
      })
    },
    // 移除频道
    removeChannelFn(item) {
      // 获取要删除频道的索引
      const index = this.channeList.findIndex(obj => obj.id === item.id)
      // 从该索引删除一个数组再返回
      this.channeList.splice(index, 1)
      this.updateChannelFn()
    },
    // 添加频道
    async addChannelFn(obj) {
      this.channeList.push(obj)
      this.updateChannelFn()
    },
    // 进入选定的频道
    enterChannelFn(item) {
      this.channelId = item.id
    }
  },
  setup() {
    // 全局配置样式
    const themeVars = {
      /* 自定义navbar的背景颜色 */
      navBarBackgroundColor: '#007bff',
      /* 自定义tab标签页颜色 */
      tabsBottomBarColor: '#007bff'
    }
    return {
      themeVars
    }
  },
  async created() {
    const res = await getUserChanneListAPI()
    // 将频道列表转存在data中
    this.channeList = res.data.data.channels

    // this.channelIdChanged()
  },
  activated() {
    console.log(this.$route)
  }
  // methods: {
  //   // tab栏切换时触发
  //   async channelIdChanged() {
  //     // 获取文章列表
  //     const res2 = await articleListAPI({ channel_id: this.channelId, timestamp: new Date().getTime() })
  //     this.allArticleList = res2.data.data.results
  //   }
  // }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
/* 设置van-tabs__wrap的样式 */
:deep(.van-tabs__wrap) {
  background-color: #fff;
  padding-right: 30px;
}
/* 频道加号样式 */
.moreChannels {
  position: fixed;
  top: 60px;
  right: 8px;
  z-index: 999;
}
:deep(.popup) {
  .van-popup__close-icon {
    color: #fff;
    font-size: 0.3733rem;
  }
}
</style>
