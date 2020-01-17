<template>
  <div class="article-comments">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index">
        <!-- 头像图片 -->
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin: 0 10px 0 -15px;"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span style="color: #466b9d;" slot="title">{{ item.aut_name  }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ item.pubdate | relativeTime }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 评论参数
      offset: null, // 页码
      limit: 20,
      totalCount: 0
    }
  },
  methods: {
    async onLoad () {
      // 1.获取数据
      const { data } = await getComments({
        type: 'a',
        source: this.articleId, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit
      })
      console.log(data)
      // 2.将数据结构 渲染
      const { results } = data.data
      this.totalCount = data.data.total_count
      this.$emit('getTotal', this.totalCount)
      this.list.push(...results)
      console.log(this.list)
      // 3.关闭加载loading
      this.loading = false
      // 4.判断数据是否请求完毕
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
