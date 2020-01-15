// 评论接口模块
import request from '@/utils/request.js'

// 获取文章列表
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
