// 专门用于操作token

// 封装东西：目的：代码分层，更清晰方便，便于修改
const key = 'loginToken'
// 向外导出方法

// 设置token
export const setToken = token => {
  localStorage.setItem(key, token)
}

// 获取token
export const getToken = () => localStorage.getItem(key)

// 删除token
export const removeToken = () => {
  localStorage.removeItem(key)
}
