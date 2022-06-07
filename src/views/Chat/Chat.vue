<template>
  <div class="chat-container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小思同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="item.name === 'xs'">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-if="item.name === 'me'">
          <div class="chat-pao">{{ item.msg }}</div>
          <van-image fit="cover" round :src="$store.state.userPhoto" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="word">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="submitFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入scokit的包
import { io } from 'socket.io-client'
// 获取token
import { getToken } from '@/untils/token.js'
export default {
  name: 'Talk',
  data() {
    return {
      word: '', // 输入框的内容
      // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
      list: [
        {
          name: 'xs',
          msg: 'hi，你好！我是小思'
        },
        {
          name: 'me',
          msg: '我是编程小王子'
        },
        {
          name: 'xs',
          msg: 'hi，你好！我是小思'
        },
        {
          name: 'me',
          msg: '我是编程小王子'
        }
      ],
      socket: null // 定义变量，存储 websocket 实例
    }
  },
  created() {
    // 创建客户端 websocket 的实例
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })
    // 建立连接的事件
    this.socket.on('connect', () => {
      console.log('与服务器建立了连接')
    })
    // 接受后端传回来的消息
    this.socket.on('message', obj => {
      this.list.push({
        name: 'xs',
        msg: obj.msg
      })
      // 最后一条消息滚动到屏幕范围
      // 数据变化 -> Dom更新是异步的，所以获取到的是上一条消息
      this.$nextTick(() => {
        const lastMseeage = document.querySelector('.chat-list>div:last-child')
        lastMseeage.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  methods: {
    // 发送消息
    submitFn() {
      if (this.word.trim().length === 0) return

      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()
      })

      // 将消息显示出来
      this.list.push({
        name: 'me',
        msg: this.word
      })

      // 情况输入框
      this.word = ''
      // 发送时最后一条消息滚动进屏幕
      this.$nextTick(() => {
        const lastMseeage = document.querySelector('.chat-list>div:last-child')
        lastMseeage.scrollIntoView({
          behavior: 'smooth'
        })
      })
    }
  },
  unmounted() {
    this.socket.close()
    this.socket = null
  }
}
</script>

<style lang="less" scoped>
.chat-container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .van-nav-bar {
    background-color: #007bff;
    :deep(.van-nav-bar__title) {
      color: white;
    }
    :deep(.van-icon) {
      color: white;
    }
  }
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
