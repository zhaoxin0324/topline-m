import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant.js'
import 'amfe-flexible' // 动态设置 REM 基准值
import './styles/index.less' // 挂载全局样式
import './utils/validation.js' // 表单验证组件
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
