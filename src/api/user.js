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
