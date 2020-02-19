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
 * @param {Object} id 提现记录的id
 * @param {Object} state 审核状态(1通过 2驳回)
 */
export function withdrawalAudit(id,state){
  return request({
    url:'/wallet/admin/audit',
    method:'get',
    params:{
      id,
      state
    }
  })
}
/**
 * 用户提现api
 * @param {Object} money 提现金额
 */
export function withdrawal(money){
  return request({
    url:'/wallet/user/withdrawal',
    method:'post',
    data:{money}
  })
}