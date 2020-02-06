import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
import decodeJwt from 'jwt-decode'
const USER_KEY = 'user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    cachePages: ['TabBar']
  },
  mutations: {
    setToken (state, data) {
      // 为了避免页面刷新数据丢失，我们这里使用本地存储进行 **持久化**
      // window.console.log(state.user)
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      setItem(USER_KEY, state.user)
    },
    // 添加缓存页面
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
