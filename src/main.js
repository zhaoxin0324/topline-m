import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/validation.js' // 表单验证组件
import 'amfe-flexible' // 动态设置 REM 基准值
import './utils/register-vant.js' // 加载注册 Vant 组件模块
import './styles/index.less' // 挂载全局样式
import './utils/datatime' // 日期处理模块
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
