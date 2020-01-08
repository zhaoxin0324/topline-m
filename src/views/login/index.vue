<template>
  <div>
    <van-nav-bar title="登录"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="login.mobile" clearable label="手机号" placeholder="请输入手机号">
        <van-icon class-prefix="icon" name="shouji" slot="left-icon"/>
      </van-field>
      <van-field v-model="login.code" type="password" label="验证码" placeholder="请输入验证码"
      >
        <van-button
        slot="button"
        size="small"
        type="primary"
        @click="sendMessage"
        v-if="!this.showcountDown">发送验证码</van-button>
        <!-- 引图标 -->
        <van-icon class-prefix="icon" name="suo" slot="left-icon"/>
        <!-- 引倒计时组件 -->
        <van-count-down
        :time="60*1000"
        format="ss s"
        slot="button"
        v-if="this.showcountDown"
        @finish="showcountDown=false"/>
      </van-field>
    </van-cell-group>
    <div class="sub_button">
      <van-button
      type="info"
      class="mes_btn"
      @click="userLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getmsCode } from '@/api/user.js'
export default {
  data () {
    return {
      login: {
        mobile: null,
        code: null
      },
      showcountDown: false

    }
  },
  methods: {
    // 登录
    async userLogin () {
      // 开启登录loading
      this.$toast.loading({
        duration: 0, // 持续展示toast
        message: '登陆中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await login(this.login)
        // 成功加载成功toast
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    },
    // 发送验证码
    async sendMessage () {
      try {
        // 获取手机号
        let { mobile } = this.login
        // 显示倒计时
        this.showcountDown = !this.showcountDown
        await getmsCode(mobile)
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="less" scoped>
  .sub_button{
    padding: 27px 16px;
    .mes_btn{
      width: 100%;
    }
  }
</style>
