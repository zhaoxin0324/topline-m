<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
    <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
  </van-list>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20
    }
  },
  methods: {
    async  onLoad () {
      // 1.请求数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.q // 搜索关键字
      })
      // 2.将数据渲染
      const { results } = data.data
      this.list.push(...results)
      console.log(this.list)
      // 3.加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
