<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>
      <van-list v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
      </van-list>
    </div>
  </van-pull-refresh>
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
      timestamp: null,
      isLoading: false
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
      // console.log(this.list)

      // 3.加载状态结束
      this.loading = false

      // 4. 数据全部加载完成
      if (data.data.results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      // 1.请求数据
      let { data } = await getArticlesByChannel({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1 // 是否包含置顶
      })
      // 2.添加数据到数组中
      const { results } = data.data
      this.list.unshift(...results)
      // 3.结束加载状态
      this.isLoading = false
      // 4.提示信息
      this.$toast(`刷新了${results.length}条数据`)
    }
  }
}
</script>

<style>
</style>
