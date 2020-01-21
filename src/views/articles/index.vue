<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{ article.aut_name }}</p>
            <p class="time">{{ article.pubdate | relativeTime }}</p>
          </div>
        </div>
        <van-button
          v-if="!$store.state.user || article.aut_id!==$store.state.user.id"
          class="follow-btn"
          :type="article.is_followed? 'default' : 'info'"
          size="small"
          round
          :loading='this.loading'
          loading-text="加载中..."
          @click="onFollow"
          >{{ article.is_followed ? '已关注':'+ 关注' }}
        </van-button>
      </div>
      <div class="markdown-body" v-html="article.content">
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->
    <!-- 文章评论 -->
    <article-comment
    ref="article-comment"
    :article-id='articleId'
    @getTotal='getTotalCount'>
    </article-comment>
    <!-- 文章评论 -->
    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="totalCount"
      />
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onAddLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
    <!-- 弹层 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '20%' }">
      <!-- v-model相当于
      :value="postMessage"
      @input="postMessage=事件参数"
      本质还是父子通信 -->
      <post-comment
      v-model="postMessage" @click-post="onPost"></post-comment>
    </van-popup>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import articleComment from './components/article-comment'
import postComment from './components/post-comment'
import { addFollow, deleteFollow } from '@/api/user'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'

export default {
  name: 'ArticlePage',
  components: {
    articleComment,
    postComment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 文章加载loading状态
      isPostShow: false,
      totalCount: 0,
      postMessage: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    // 发布评论
    async  onPost () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...', // 展示信息
        forbidClick: true // 是否禁止背景点击
      })
      try {
      // 处理输入内容
        const { data } = await addComment({
          target: this.articleId,
          content: this.postMessage
        })
        // console.log(data)
        // 清空文本框
        this.postMessage = ''
        // 关闭弹层
        this.isPostShow = false
        // 将数据添加到列表顶部 $refs 可以获取到子组件
        this.$refs['article-comment'].list.unshift(data.data.new_obj)
        this.totalCount++
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail('评论失败')
      }
    },
    // 获取总评论数
    getTotalCount (val) {
      this.totalCount = val
    },
    // 关注或取消关注
    async onFollow () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id)
          this.$toast.success('取消成功')
        } else {
          await addFollow(this.article.aut_id)
          this.$toast.success('关注成功')
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        // console.log('加载失败', error)
        this.$toast.fail('加载失败')
      }
    },
    // 点赞或取消点赞
    async onAddLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.attitude === 1) { // 调取消喜欢
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        // console.log(this.article)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    // 收藏或取消收藏
    async onCollect () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已收藏，则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }

  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
