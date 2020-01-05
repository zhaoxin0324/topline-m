import axios from 'axios'
import jsonBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
// 大数处理
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]
// 请求拦截器
request.interceptors.request.use(config => {
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
