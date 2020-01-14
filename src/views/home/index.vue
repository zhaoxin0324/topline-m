<template>
  <div class="home-container">
    <!-- 导航栏 搜索按钮-->
    <van-nav-bar  fixed >
      <van-button
      class="search-button"
      slot="title"
      type="info"
      round
      size="mini"
      @click="$router.push('/search')">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon slot="nav-right" name="wap-nav" class="wap-nav" @click="isChannelsEditShow = true"></van-icon>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- TODO: 文章列表 -->
        <!-- <div>{{ item.name }}</div> -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelsEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '90%' }"
    >
      <channel-edit
      :channels="channels"
      @chose="choseChannel"
      @close="isChannelsEditShow=false"
      ></channel-edit>
    </van-popup>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      channels: [], // 频道数据
      isChannelsEditShow: false // 弹层是否显示
    }
  },
  computed: {},
  watch: {},
  created () {
    this.userChannels()
  },
  mounted () {},
  methods: {
    // 改变频道
    choseChannel (index) {
      this.active = index
      this.isChannelsEditShow = false
    },
    // 获取频道列表
    async userChannels () {
      let useChannels = []
      const localChannels = getItem('user-channel')
      if (localChannels) {
        useChannels = localChannels
      } else {
        let { data } = await getChannels()
        // console.log(data)
        useChannels = data.data.channels
      }
      this.channels = useChannels
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: 0.8;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
.search-button{
  width: 100%;
  background-color: #5babfb;
  height: 30px
}
</style>
