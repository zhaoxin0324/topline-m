<template>
  <div class="search-containter">
      <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow=false"
        @input="onSearchInput"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
    v-if='isResultShow'
    :q="searchText">11111111</search-result>
    <!-- 联想建议 -->
    <van-cell-group
    v-else-if="searchText"
    >
      <van-cell  v-for="(item,index) in suggestions"
      :key="index"
      icon="search"
      >
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" v-if="!isDeleteShow" @click="isDeleteShow=true"></van-icon>
        <template v-if="isDeleteShow">
          <span @click="searchHistories=[]">全部删除</span>
            &nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </template>
      </van-cell>
      <van-cell  v-for="(item,index) in searchHistories"
      :key="index"
      :title="item"
      @click="onHistoryClick(item,index)">
        <van-icon name="close" v-if="isDeleteShow"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search.js'
import { debounce } from 'lodash' // 函数防抖
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchResult',
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索内容
      isResultShow: false, // 是否展示搜索结果
      suggestions: [], // 联想建议
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isDeleteShow: false // 删除历史记录的显示状态
    }
  },
  watch: {
    searchHistories (val) {
      setItem('search-histories', val)
    }
  },
  methods: {
    // 点击历史数据  执行搜索或删除
    onHistoryClick (item, index) {
      // 如果是删除状态，执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        this.onSearch(item)
      }
    },
    // 高亮搜索文本
    highlight (str) {
      // 利用正则表达式替换
      const searchText = this.searchText
      const reg = RegExp(this.searchText, 'gi')
      // console.log(str.replace(reg, `<span style="color: #3296fa">${searchText}</span>`))
      return str.replace(reg, `<span style="color: #3296fa">${searchText}</span>`)
    },
    onSearch (q) {
      // 更新搜索数据
      this.searchText = q
      // 记录搜索历史数据
      const index = this.searchHistories.indexOf(q)
      if (index !== -1) {
        // 历史数据数组中含有此数据 将数据删除
        this.searchHistories.splice(index, 1)
      }
      // 重新添加到数组前
      this.searchHistories.unshift(q)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      console.log('oncancel')
    },
    onSearchInput: debounce(
      // 函数防抖 在一定时间内执行一次 最后执行， 时间内持续操作 会重新计算时间
      async function () {
        if (!this.searchText) {
          return
        }
        // 请求数据
        const { data } = await getSuggestions(this.searchText)
        // 将数据渲染
        this.suggestions = data.data.options
      }
      , 200)
  }
}
</script>

<style>
</style>
