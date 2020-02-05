import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
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
}, async function (error) {
  // 处理登录过期  401
  if (error.response && error.response.status === 401) {
    // 1.没有refresh_token 跳转登录页
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }
    // 如果有，请求更新token
    try {
      // 用axios发送请求 request请求拦截会把 Authorization的数据换掉
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 3.请求成功，把新的token更新到容器中 并保存到本地存储
      store.commit('setToken', {
        ...user,
        token: data.data.token // 更新user中的token
      })
      // 4. 把之前的request请求继续发送
      return request(error.config)
    } catch (err) {
      // 更新失败，跳转登录页重新登录
      redirectLogin()
    }
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.push({
    name: 'login',
    // query 参数会添加url地址后面
    query: {
      // router.currentRoute是当前路由对象
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
