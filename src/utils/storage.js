// 封装本地存储的工具方法模块

export const getItem = name => {
  let data = window.localStorage.getItem(name)
  // 获取到数据转成对象
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 设置本地存储
export const setItem = (name, value) => {
  // 判断value数据格式 将value转成JSON字符串格式 或不转
  let data = typeof value === 'object'
    ? JSON.stringify(value)
    : value
  window.localStorage.setItem(name, data)
}
// 删除本地存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
