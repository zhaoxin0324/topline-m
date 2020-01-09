<template>
  <div>
    <van-nav-bar title="登录"></van-nav-bar>
    <!--
      表单验证
      1、使用 ValidationObserver 组件把需要验证的整个表单包起来
      2、使用 ValidationProvider 组件把具体的表单元素包起来，例如 input
         name   配置字段的提示名称
         rules  配置校验规则
         v-slot="{ errors }" 获取校验失败的错误提示消息
    -->
    <ValidationObserver ref="myForm">
      <ValidationProvider name='手机号' rules="required|mobile" immediate>
        <van-field v-model="login.mobile" clearable label="手机号" placeholder="请输入手机号">
          <van-icon class-prefix="icon" name="shouji" slot="left-icon" />
        </van-field>
      </ValidationProvider>
      <ValidationProvider name='验证码' rules="required|code" immediate>
        <van-field v-model="login.code"  label="验证码" placeholder="请输入验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendMessage"
            v-if="!this.showcountDown"
          >发送验证码</van-button>
          <!-- 引图标 -->
          <van-icon class-prefix="icon" name="suo" slot="left-icon" />
          <!-- 引倒计时组件 -->
          <van-count-down
            :time="60*1000"
            format="ss s"
            slot="button"
            v-if="this.showcountDown"
            @finish="showcountDown=false"
          />
        </van-field>
        </ValidationProvider>
    </ValidationObserver>
    <div class="sub_button">
      <van-button type="info" class="mes_btn" @click="userLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getmsCode } from '@/api/user.js'
import { validate } from 'vee-validate'
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
      // 表单验证
      let success = await this.$refs.myForm.validate()
      if (!success) {
        // 手动表单验证失败
        // 获取失败的错误提示  通过ref获取表单  表单的error属性中含有信息
        // 直接获取 表没有错误信息 必须给每一个 ValidationProvider 配置 immediate 初始验证
        let err = this.$refs.myForm.errors
        // console.log('失败', err)
        for (let key in err) {
          if (err[key][0]) {
            this.$toast(err[key][0])
            return
          }
        }
      }
      // 验证成功
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
        this.$toast.fail('手机号或验证码不正确')
      }
    },
    // 发送验证码
    async sendMessage () {
      // 验证指定数据字段
      try {
        // 获取手机号
        let { mobile } = this.login
        // 发送验证码之前进行验证 验证手机号是否有效
        let result = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        console.log(result)

        if (!result.valid) {
          this.$toast(result.errors[0])
          return
        }
        // 显示倒计时
        this.showcountDown = !this.showcountDown
        await getmsCode(mobile)
      } catch (error) {
        this.showcountDown = false
        this.$toast('请勿频繁操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sub_button {
  padding: 27px 16px;
  .mes_btn {
    width: 100%;
  }
}
</style>
