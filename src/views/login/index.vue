<template>
  <div>
    <van-nav-bar title="登录"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="login.mobile" clearable label="手机号" placeholder="请输入手机号">
        <van-icon class-prefix="icon" name="shouji" slot="left-icon"/>
      </van-field>
      <van-field v-model="login.code" type="password" label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        <van-icon class-prefix="icon" name="suo" slot="left-icon"/>
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
import { login } from '@/api/user.js'
export default {
  data () {
    return {
      login: {
        mobile: null,
        code: null
      }

    }
  },
  methods: {

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
