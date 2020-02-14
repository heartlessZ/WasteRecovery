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
export function register(userInfo) {
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
    method: 'get'
  })
}
// 发布订单api
export function releaseOrder(orderInfo) {
  return request({
    url: '/clien/wasteInformation/add',
    method: 'post',
    data: orderInfo
  })
}

// 查询父分类集合api
export function queryRootCategory(classificationName) {
  let url = '/classification/classificationList'
  if (classificationName != undefined) {
    url += "?classificationName=" + classificationName
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 根据父分类id查询子分类集合api
export function queryChildrenCategory(classificationId) {
  let url = '/classification/classificationSonList'
  if (classificationId != undefined) {
    url += "?classificationId=" + classificationId
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 发送验证码api
export function sendSms(phone) {
  let url = '/tencen/sendSms?phone=' + phone
  return request({
    url: url,
    method: 'get'
  })
}

// 验证是否本机操作
export function verificationPhone(verifiInfo) {
  let url = '/user/verificationPhone'
  return request({
    url: url,
    method: 'post',
    data: verifiInfo
  })
}

// 修改新手机号
export function editPhone(phone) {
  let url = '/user/editPhone?phone=' + phone
  return request({
    url: url,
    method: 'post',
    data: phone
  })
}