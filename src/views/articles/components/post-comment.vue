<template>
  <div class="post-comment">
    <van-field
      :value="value"
      @input="$emit('input',$event)"
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
    @click="$emit('click-post')"
    >发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'postComment',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
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
