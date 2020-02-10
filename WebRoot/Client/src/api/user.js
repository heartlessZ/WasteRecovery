import request from '@/utils/request'

// 登录api
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 用户注册api
export function register(userInfo){
  return request({
    url: '/user/regist',
    method: 'post',
    data: userInfo
  })
}
// 获取用户信息api
export function getInfo() {
  return request({
    url: '/user/theUser',
    method: 'get',
  })
}
//退出登录api
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
