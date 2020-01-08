<template>
  <div>
    <van-nav-bar title="登录"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="login.phoneNum" clearable label="手机号" placeholder="请输入手机号">
        <van-icon class-prefix="icon" name="shouji" slot="left-icon"/>
      </van-field>
      <van-field v-model="login.pickMessage" type="password" label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        <van-icon class-prefix="icon" name="suo" slot="left-icon"/>
      </van-field>
    </van-cell-group>
    <div class="sub_button">
      <van-button type="info" class="mes_btn">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        phoneNum: null,
        pickMessage: null
      }

    }
  },
  methods: {

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
