import request from '@/utils/request'
/**
 * 管理员查询充值记录列表api
 * @param {Object} info 分页查询需要的相关字段
 */
export function selRechargeRecord(info){
  return request({
    url: '/wallet/admin/rechargeRecord',
    method: 'get',
    params: info
  })
}

/**
 * 管理员查询提现记录列表api
 * @param {Object} info
 */
export function selectWithdrawal(info){
  return request({
    url: '/wallet/admin/selectWithdrawal',
    method: 'get',
    params: info
  })
}
/**
 * 提现审核api
 * @param {Object} orderId 提现记录单号
 * @param {Object} state 审核状态(1通过 2驳回)
 */
export function withdrawalAudit(orderId,state){
  return request({
    url:'/wallet/admin/audit',
    method:'get',
    params:{
      orderId,
      state
    }
  })
}
/**
 * 用户提现api
 * @param {Object} money 提现金额
 */
export function withdrawal(payMoney){
  return request({
    url:'/wallet/user/withdrawal',
    method:'get',
    params:{payMoney}
  })
}
/**
 * 钱包充值api
 * @param {Object} money
 */
export function recharge(money){
  return request({
    url:'/alipay/goAlipay',
    method:'get',
    params:{money}
  })
}
/**
 * 用户查询充值记录api
 * @param {Object} info
 *    pageNum 当前页
 *    pageSize 页面记录数
 */
export function userSelRechargeRecord(info){
  return request({
    url:'/wallet/user/rechargeRecord',
    method:'get',
    params:info
  })
}

/**
 * 用户查询提现记录api
 * @param {Object} info
 *    pageNum 当前页
 *    pageSize 页面记录数
 */
export function userSelWithdrawRecord(info){
  return request({
    url:'/wallet/user/selectWithdrawal',
    method:'get',
    params:info
  })
}