<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    size="small"
    class="comment-btn">发布</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
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
