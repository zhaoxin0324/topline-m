import moment from 'moment'
import Vue from 'vue'

// 配置中文语言
moment.locale('zh-cn')

// 配置相对时间过滤器
// 过滤器第一个参数为 过滤器名字，第二个为回调函数
Vue.filter('relativeTime', value => {
  return moment(value).startOf('second').fromNow()
})

// 日期格式化
// format 为将要转成的格式
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
