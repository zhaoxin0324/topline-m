import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
import decodeJwt from 'jwt-decode'
const USER_KEY = 'user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
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
    }
  },
  actions: {
  },
  modules: {
  }
})
