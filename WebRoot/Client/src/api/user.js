import request from '@/utils/request'

/**
 * 用户名登录
 */
export function login (userInfo) {
  console.log("login")
  return request({
    url: '/user/login',
    method: 'post',
    data: userInfo
  })
}

/**
 * 手机验证码登录
 * @param {Object} phone
 * @param {Object} code
 */
export function phoneVeriLogin (phone, code) {
  return request({
    url: '/user/loginByPhone',
    method: 'post',
    data: {
      phone,
      code
    }
  })
}
// 用户注册api
export function register (userInfo) {
  return request({
    url: '/user/regist',
    method: 'post',
    data: userInfo
  })
}
// 获取用户信息api
export function getInfo () {
  return request({
    url: '/user/theUser',
    method: 'get'
  })
}
// 修改用于信息api
export function updateUserInfo (userInfo) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: userInfo
  })
}

// 退出登录api
export function logout () {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
// 发布订单api
export function releaseOrder (orderInfo) {
  return request({
    url: '/clien/wasteInformation/add',
    method: 'post',
    data: orderInfo
  })
}

// 查询父分类集合api
export function queryRootCategory (classificationName) {
  let url = '/classification/classificationList'
  if (classificationName != undefined) {
    url += '?classificationName=' + classificationName
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 根据父分类id查询子分类集合api
export function queryChildrenCategory (classificationId) {
  let url = '/classification/classificationSonList'
  if (classificationId != undefined) {
    url += '?classificationId=' + classificationId
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 商家入驻api
export function settledInApply (identityInfo) {
  let url = '/clien/settledIn/add'
  return request({
    url: url,
    method: 'post',
    data: identityInfo
  })
}

// 查询当前用户入驻状态api
export function settledInInfo () {
  let url = '/clien/settledIn/get'
  return request({
    url: url,
    method: 'get'
  })
}

// 获取系统配置
export function getConfig () {
  let url = '/setting/getSetting'
  return request({
    url: url,
    method: 'get'
  })
}

// 添加反馈api
export function addContact (contactInfo) {
  let url = '/contact/add'
  return request({
    url: url,
    method: 'post',
    data: contactInfo
  })
}

// 发送验证码api
export function sendSms (phone) {
  let url = '/tencen/sendSms?phone=' + phone
  return request({
    url: url,
    method: 'get'
  })
}

// 验证是否本机操作
export function verificationPhone (verifiInfo) {
  let url = '/user/verificationPhone'
  return request({
    url: url,
    method: 'post',
    data: verifiInfo
  })
}

// 修改新手机号
export function editPhone (phone) {
  let url = '/user/editPhone?phone=' + phone
  return request({
    url: url,
    method: 'post',
    data: phone
  })
}

// 查询上门分类类型
export function visitClassfication (phone) {
  let url = '/visit/Classification'
  return request({
    url: url,
    method: 'get'
  })
}

// 创建上门分类订单
export function visitCreate (data) {
  let url = '/visit/creat'
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
