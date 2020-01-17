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
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" value="内容" />
      <van-cell is-link title="性别" :value="user.gender === 0? '男': '女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from '@/api/user'
import { ImagePreview } from 'vant'
export default {
  name: 'user-profile',
  data () {
    return {
      user: {}
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
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
</style>
