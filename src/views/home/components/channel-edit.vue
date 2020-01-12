<template>
  <div class="channel_edit">
    <van-cell-group>
      <van-cell title="我的频道">
        <van-button type="primary" size="small" @click="isEditShow=!isEditShow">{{ isEditShow? '完成':'编辑'}}</van-button>
      </van-cell>
    </van-cell-group>
    <!-- 我的频道 -->
    <van-grid :gutter="10">
      <van-grid-item v-for="(item,index) in channels" :key="item.id" :text="item.name" class="gridList" @click="onUserChannelClick(index)">
          <!-- 右上角图标 -->
        <van-icon slot="icon" name="close" class="closeIcon"
        v-show="isEditShow && index!==0"
        >
        </van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="频道推荐"></van-cell>
    </van-cell-group>
    <!-- 推荐频道 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in remainingChannels"
        :key="item.id"
        :text="item.name"
        @click="myChannelAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
import { setItem } from '@/utils/storage.js'
export default {
  props: {
    channels: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false
    }
  },
  created () {
    this.onLoadChannels()
  },
  watch: {
    channels () {
      setItem('user-channel', this.channels)
    }
  },
  methods: {
    // 切换频道
    onUserChannelClick (index) {
      if (this.isEditShow) {
        this.channels.splice(index, 1)
      } else {
        this.$emit('chose', index) // 传递id
      }
    //   this.$emit('close') // 关闭弹层
    },
    // 点击频道添加到我的频道
    myChannelAdd (item) {
      this.channels.push(item)
    },
    // 所有频道
    async onLoadChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  computed: {
    // 筛选出剩余的频道
    remainingChannels () {
      const channels = []
      this.allChannels.forEach(item => {
        // 当前的遍历项是否属于我的频道，如果不是，那就收集到 channels
        // userChannels 是否包含 item
        // find 会遍历数组，它会对每个元素执行 c.id === item.id 条件判定
        // 如果 true，则返回该元素，如果直到遍历结束都没有符合条件的元素，则返回 undefined
        if (!this.channels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel_edit {
  padding-top: 40px;
}
.gridList {
  position: relative;
  .closeIcon{
      position: absolute;
      right: -45px;
      top: -20px;
      font-size: 14px;
  }
}
</style>
