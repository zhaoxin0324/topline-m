import request from '@/utils/request.js'

export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 发送验证码

export const getmsCode = data => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${data}` // 参数为电话号
  })
}
// 获取当前登录用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取指定用户信息
export const getUserById = userId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`
  })
}
