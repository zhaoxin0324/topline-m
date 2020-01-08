import request from '@/utils/request.js'

export const login = data => {
  request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
