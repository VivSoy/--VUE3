<template>
  <div class="comment-container">
    <!-- 评论列表 -->
    <div class="cmt-list">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50">
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="item in commentsList" :key="item.total_count">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" class="avatar" />
              <span class="uname">{{ item.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon name="like" size="16" color="red" v-if="item.is_liking === true" @click="likeFn(false, item)" />
              <van-icon name="like-o" size="16" color="gray" v-else @click="likeFn(true, item)" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body" v-html="item.content"></div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ timeAgo(item.pubdate) }}</div>
        </div>
      </van-list>
    </div>

    <!-- 评论区域外层加一个容器，根据评论区域1或2的展示变换盒子样式 -->
    <div class="cmt-list" :class="isShowCmtInput ? 'art-cmt-container-2' : 'art-cmt-container-1'">
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowCmtInput === false">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="isShowCmtInput = true">发表评论</div>
        <div class="icon-box">
          <van-badge :content="this.comment" max="99">
            <van-icon name="comment-o" size="0.53333334rem" @click="moveFn" />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea placeholder="友善评论、理性发言、阳光心灵" ref="autoFocus" @blur="blurFn" v-model="commentValue"></textarea>
        <van-button type="default" :disabled="this.commentValue.length === 0" @click="send(this.$route.query.art_id, commentValue)">发布</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入获取评论、点赞或取消点赞、发布评论的API
import { GetCommentsAPI, likingComments, dislikeComments, sendComments } from '@/api/index.js'
// 导入时间处理组件
import { timeAgo } from '@/untils/date.js'
import { ref, onMounted } from 'vue'
export default {
  name: 'CommentsList',
  props: {},
  data() {
    return {
      commentsList: [],
      // 控制评论编辑区域是否显示
      isShowCmtInput: false,
      // 获取评论数量
      comment: '',
      // 发布评论内容
      commentValue: '',
      // 下滑加载情况
      loading: false,
      finished: false,
      // 当页评论的最后一个id，作为请求下一页的偏移量
      offset: null
    }
  },
  setup() {
    const autoFocus = ref(null)
    onMounted(() => {
      autoFocus.value && autoFocus.value.focus()
    })
    return {
      autoFocus
    }
  },
  async created() {
    // 获取所有评论
    const res = await GetCommentsAPI({
      art_id: this.$route.query.art_id,
      offset: this.offset
    })
    this.commentsList = res.data.data.results
    this.comment = res.data.data.total_count || '' // 如果无评论不显示，防止出现0徽标
    this.offset = res.data.data.last_id
  },
  methods: {
    timeAgo,
    // 判断是否点赞评论
    async likeFn(bool, item) {
      if (bool === true) {
        item.is_liking = true
        await likingComments({
          target: item.com_id
        })
      } else {
        item.is_liking = false
        await dislikeComments({
          target: item.com_id
        })
      }
    },
    // 点击评论图标，屏幕自动滑到第一条评论
    moveFn() {
      // 原生标签.scrollIntView(),让原生的标签滚动到屏幕最上面
      // 有的电脑不支持，没有滑动效果
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 点击发布时同时也失去焦点，点击事件就未执行，采用延时，使失去焦点异步执行
    blurFn() {
      setTimeout(() => {
        this.isShowCmtInput = false
      }, 0)
    },
    // 发送评论
    async send(target, content) {
      const res = await sendComments({
        target,
        content
      })
      // 数组unshift将元素添加到数组首位
      this.commentsList.unshift(res.data.data.new_obj)
      this.commentValue = ''
      this.comment++
    },
    // 下滑加载更多评论
    async onLoad() {
      const res = await GetCommentsAPI({
        art_id: this.$route.query.art_id,
        offset: this.offset
      })
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
      this.commentsList = [...this.commentsList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
