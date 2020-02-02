<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()"></van-nav-bar>
    <!-- 单元格 用户信息-->
    <van-cell-group>
      <van-cell is-link title="头像" value="内容" @click="onSelectFile">
        <van-image
          class="avatar"
          round
          :src="user.photo"
        />
      </van-cell>
      <input type="file" hidden ref="file" @change="onFileChange" />
      <van-cell is-link title="昵称"
        :value="user.name"
        @click="isEditNameShow = true"/>
      <van-cell is-link title="介绍" value="内容" />
      <van-cell is-link title="性别"
      :value="user.gender === 0? '女': '男'"
      @click="isEditGenderShow= true"/>
      <van-cell is-link title="生日"
      :value="user.birthday"
      @click="isEditBirthdayShow= true" />
    </van-cell-group>
    <!-- 用户昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
    >
      <van-nav-bar
        title="修改昵称"
        left-text="取消"
        right-text="确定"
        @click-left="isEditNameShow = false"
        @click-right="onUpdateName"
      />
      <van-field
        :value="user.name"
        @input="inputName = $event"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
    <!-- 更改用户性别 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      :actions="actions"
      cancel-text="取消"
      @cancel="isEditGenderShow = false"
      @select="onGenderSelect"
    />
    <!-- 更改用户生日 -->
     <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <!--
        v-model="currentDate" 默认显示时间和同步用户选择的时间
        :min-date="minDate" 最小可选日期
        max-date  最大可选日期
       -->
      <van-datetime-picker
        :value="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthdayShow = false"
        @confirm="onUpdateBirthday"
      />
     </van-popup>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile } from '@/api/user'
import { ImagePreview } from 'vant'
import moment from 'moment'
export default {
  name: 'user-profile',
  data () {
    return {
      user: {},
      isEditNameShow: false, // 显示昵称弹层
      inputName: '', // 输入的昵称
      isEditGenderShow: false, // 用户性别弹层
      actions: [
        // name 会显示出来，value 是我们自己添加的
        { name: '男', value: 1 },
        { name: '女', value: 0 }
      ],
      isEditBirthdayShow: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    },
    currentDate () {
      return new Date(this.user.birthday)
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    // 更改用户信息 封装成一个方法 传入相应数据 更改相应信息
    // 传入两个参数 field, value
    async updateMessage (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
          [field]: value
        })
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    // 更改生日
    async onUpdateBirthday (value) {
      // 使用moment转换日期格式
      const date = moment(value).format('YYYY-MM-DD')
      // 请求提交
      await this.updateMessage('birthday', date)

      // 更新视图
      this.user.birthday = date
      // 关闭弹层

      this.isEditBirthdayShow = false
    },
    // 更改性别
    async onGenderSelect (data) {
      // 请求提交
      await this.updateMessage('gender', data.value)
      // 更新视图展示
      this.user.gender = data.value
      // 关闭上拉菜单
      this.isEditGenderShow = false
    },
    // 更新昵称
    async onUpdateName () {
      // 请求数据
      await this.updateMessage('name', this.inputName)

      // 更新视图
      this.user.name = this.inputName

      // 关闭弹层
      this.isEditNameShow = false
    },
    // 绑定van-cell关联input点击事件
    onSelectFile () {
      this.file.click()
    },
    // 获取用户信息
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取数据失败')
      }
    },
    onFileChange () {
      const fileData = URL.createObjectURL(this.file.files[0]) // 将图片地址转成临时地址  达到可预览效果
      ImagePreview({
        images: [fileData],
        startPosition: 1,
        onClose: this.savePhoto
      })
    },
    // 保存头像图片
    async savePhoto () {
      await this.$dialog.confirm({
        title: '头像选择',
        message: '确认使用该图片作为头像吗？'
      })
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 遇到文件上传 用表单 fromdata 传递参数
        const fd = new FormData()
        // 添加图片信息append
        fd.append('photo', this.file.files[0])
        // 调用接口
        await updateUserPhoto(fd)
        // 更新视图 将user对象的photo属性换成传入图片的预览地址  渲染到页面上
        this.user.photo = URL.createObjectURL(this.file.files[0])
        this.$toast.success('保存成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('保存失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.avatar {
  width: 30px;
  height: 30px;
}
/deep/ .van-nav-bar{
  background-color: #fff;
  .van-nav-bar__title{
    color: #323233
  }
}
</style>
