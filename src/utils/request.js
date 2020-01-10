import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
// 大数处理
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]
// 请求拦截器  统一添加token
request.interceptors.request.use(config => {
  let { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})
export default request
