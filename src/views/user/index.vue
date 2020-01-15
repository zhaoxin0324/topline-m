<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条号" left-arrow @click-left="$router.push('/my')" />
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image class="col1" fit="cover" round :src="user.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{ user.art_count }}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{ user.follow_count }}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{ user.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{ user.like_count }}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <!--
              TODO: 如果页面用户是当前登录用户，则显示编辑资料；否则显示私信和关注
            -->
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="default" size="small">编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{ user.certi }}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{ user.intro}}</span>
        </div>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.id" :title="item.title" />
      </van-list>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/article'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {
      user: {},
      list: [],
      loading: false,
      finished: false,
      params: {
        page: 1,
        per_page: 20
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    // 文章列表
    async onLoad () {
      // 1.请求数据
      let { data } = await getArticlesByUser(this.$route.params.userId, this.params)

      // 2. 把数据添加到列表中
      this.list.push(...data.data.results)
      // console.log(this.list)
      // 3. 加载状态结束
      this.loading = false
      // 4. 判断数据是否全部加载完毕
      if (data.data.results.length) {
        this.params.page++
      } else {
        this.finished = true // 没有数据 停止加载
      }
    },
    // 获取指定用户信息
    async loadUser () {
      let { data } = await getUserById(this.$route.params.userId)
      console.log(data)
      this.user = data.data
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
