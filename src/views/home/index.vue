<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels"
      :key="item.id"
      :title="item.name">
          <!-- TODO: 文章列表 -->
          <!-- <div>{{ item.name }}</div> -->
          <ArticleList :channel='item'></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      channels: [] // 频道数据
    }
  },
  computed: {},
  watch: {},
  created () {
    this.userChannels()
  },
  mounted () {},
  methods: {
    // 获取频道列表
    async userChannels () {
      let { data } = await getChannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  }
}
</script>
