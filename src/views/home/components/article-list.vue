<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  props: {
    channel: {
      type: Object, // 传值类型
      required: true // 必须传
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 1.请求数据
      let { data } = await getArticlesByChannel({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1 // 是否包含置顶
      })
      // 2.把请求的数据添加到数组 渲染
      this.list.push(...data.data.results)
      console.log(this.list)

      // 3.加载状态结束
      this.loading = false

      // 4. 数据全部加载完成
      if (data.data.results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
