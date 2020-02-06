<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.replace('/my')"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 标签列表 -->
    <van-tabs v-model="active">
      <van-tab title="我的收藏" to="/my-article/collect">
        <collect-article />
      </van-tab>
      <van-tab title="我的历史" to="/my-article/history">
        <history-article />
      </van-tab>
      <van-tab title="我的作品" to="/my-article">
        <user-article />
      </van-tab>
    </van-tabs>
    <!-- /标签列表 -->
  </div>
</template>

<script>
import UserArticle from './components/article'
import CollectArticle from './components/collect'
import HistoryArticle from './components/history'

export default {
  name: 'UserArticles',
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.getActive()
  },
  mounted () {},
  methods: {
    getActive () {
      if (this.$route.path === '/my-article/collect') {
        this.active = 0
      } else if (this.$route.path === '/my-article/history') {
        this.active = 1
      } else {
        this.active = 2
      }
    },
    // 路由守卫 当路由跳转时执行
    beforeRouteLeave (to, from, next) {
      if (to.name === 'article') {
        this.$store.commit('addCachePage', 'UserArticles')
      } else {
        this.$store.commit('removeCachePage', 'UserArticles')
      }
      next()
    }
  }
}
</script>

<style scoped lang="less">
.user-articles {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
