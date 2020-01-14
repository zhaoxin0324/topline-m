import request from '@/utils/request.js'

export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
