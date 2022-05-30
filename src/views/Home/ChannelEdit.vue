<template>
  <div class="channel-container">
    <!-- 新图层标题 -->
    <van-nav-bar title="频道管理" />
    <div class="pop-body">
      <div class="my-channel-box">
        <div class="channel-title">
          <div>
            <span class="title-bold">已添加频道：</span>
            <span class="title-gray">{{ isEdit ? '点击删除频道' : '点击进入频道' }}</span>
          </div>
          <span class="btn-edit" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</span>
        </div>
        <van-row>
          <van-col span="6" v-for="item in myChannel" :key="item.art_id" @click="removeFn(item)">
            <div class="channel-item">
              {{ item.name }}
              <!-- 删除的徽标 -->
              <!-- 给推荐频道不加上删除徽标 -->
              <van-badge color="transparent" class="cross-badge" v-show="isEdit && item.name !== '推荐'">
                <template #content>
                  <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem" />
                </template>
              </van-badge>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 分割区域 -->
      <div class="sp-line"></div>
      <div class="more-channel-box">
        <div class="channel-title">
          <div>
            <span class="title-bold">可添加频道：</span>
            <span class="title-gray">点击进入频道</span>
          </div>
        </div>
        <van-row>
          <van-col span="6" v-for="obj in unChannel" :key="obj.id" @click="addChannelFn(obj)">
            <div class="channel-item">{{ obj.name }}</div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
// 导入所有频道的API
import { allChannelListAPI } from '@/api/index.js'
export default {
  props: {
    myChannel: {
      type: Array
    },
    edit: Boolean
  },
  data() {
    return {
      allChannel: [],
      isEdit: false
    }
  },
  // 所有频道减去我的频道就为可添加的频道
  computed: {
    unChannel() {
      const newArr = this.allChannel.filter(obj => {
        const index = this.myChannel.findIndex(obj2 => {
          return obj2.id === obj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
  },
  async created() {
    const res = await allChannelListAPI()
    this.allChannel = res.data.data.channels
  },
  methods: {
    removeFn(item) {
      if (this.isEdit === true && item.name !== '推荐') {
        this.$emit('removeChannel', item)
      } else {
        this.$emit('enterChannel', item)
        this.$emit('close')
      }
    },
    addChannelFn(obj) {
      if (this.isEdit === true) {
        this.$emit('addChannel', obj)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 新图层样式 */
.channel-container {
  display: flex;
  flex-direction: column;
  /* 图层主体 */
  .pop-body {
    flex: 1;
    padding: 0.21333rem;
    background-color: #fff;
    /* 频道标题区域 */
    .channel-title {
      display: flex;
      justify-content: space-between;
      font-size: 0.37333rem;
      line-height: 0.74667rem;
      padding: 0 0.16rem;
      .title-bold {
        font-weight: 700;
      }
      .title-gray {
        color: grey;
        font-size: 0.32rem;
      }
      .btn-edit {
        border: 0.02667rem solid #a3a2a2;
        padding: 0 0.26667rem;
        line-height: 0.53333rem;
        height: 0.53333rem;
        border-radius: 0.16rem;
        font-size: 00.32rem;
      }
    }
    .channel-item {
      position: relative;
      font-size: 0.32rem;
      text-align: center;
      background-color: #fafafa;
      margin: 0.16rem;
      line-height: 0.96rem;
      /* 徽标的位置调整 */
      .cross-badge {
        position: absolute;
        right: 0.08rem;
        top: 0.16rem;
      }
    }
    /* 分隔区域 */
    .sp-line {
      margin: 0.26667rem 0 0.53333rem 0;
    }
  }
  :deep(.van-nav-bar__title) {
    font-size: 0.42667rem;
    color: #fff;
  }
}
</style>
