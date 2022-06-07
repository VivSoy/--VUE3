<template>
  <div class="artItem-container">
    <!-- 一条文章单元格 -->
    <van-cell @click="$emit('click')">
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单图 -->
          <!-- 利用v-if根据图片的数量来决定展示三图还是单图模式 -->
          <img class="thumb" :src="article.cover.images[0]" v-if="article.cover.type === 1" v-lazy="article.cover.images[0]" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type > 1">
          <img class="thumb" v-for="(Url, index) in article.cover.images" :key="index" :src="Url" v-lazy="Url" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ formatTime }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="showX" />
        </div>
      </template>
      <!-- 反馈面板 -->
    </van-cell>
    <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" teleport="body" :cancel-text="cancelText" @cancel="onCancel" @click-overlay="closeFn" />
    <!-- teleport重新挂载到body上，显示选项 -->
  </div>
</template>

<script>
// 导入时间处理插件
import { timeAgo } from '@/untils/date.js'
// 引用action
import { firstActions, secondActions } from '@/api/report.js'

export default {
  name: 'ArticleItems',
  props: {
    article: {
      type: Object
    },
    showX: {
      // 根据处在首页还是搜索也决定是否显示x按钮
      type: Boolean,
      default: true
    }
  },
  emits: ['click', 'dislike', 'report'],
  data() {
    return {
      formatTime: timeAgo(this.article.pubdate), // formatTime 就是函数
      actions: firstActions,
      show: false, // 反馈面板隐藏或显示
      cancelText: '取消'
    }
  },
  methods: {
    // 监测点击的反馈面板选项
    onSelect(actions) {
      if (actions.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.cancelText = '返回'
      } else if (actions.name === '不感兴趣') {
        this.$emit('dislike', this.article.art_id)
        this.show = false
      } else {
        // 二级反馈
        this.$emit('report', this.article.art_id, actions.value)
        this.actions = firstActions
        this.show = false
      }
    },
    // 监测点击的是取消还是返回按钮
    onCancel() {
      if (this.cancelText === '返回') {
        this.cancelText = '取消'
        this.actions = firstActions
        this.show = true
      }
    },
    // 关闭遮罩时触发
    closeFn() {
      this.actions = firstActions
      this.cancelText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
