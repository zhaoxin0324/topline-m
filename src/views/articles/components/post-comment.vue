<template>
  <div class="post-comment">
    <van-field
      v-model="inputComment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    size="small"
    class="comment-btn"
    @click="onAddComment">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      inputComment: '' // 绑定输入框输入的数据
    }
  },
  methods: {
    async onAddComment () {
      // 处理输入内容
      if (!this.inputComment.trim()) {
        return
      }
      await addComment({
        target: this.articleId,
        content: this.inputComment.trim()
      })
    }
  }
}
</script>

<style scoped lang="less">
.post-comment{
    display: flex;
    .comment-btn{
        margin-top:80px;
    }
}
</style>
