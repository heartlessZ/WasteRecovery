import request from '@/utils/request'
/**
 * 分页查询订单api
 * @param {Object} pageNum 页数
 * @param {Object} pageSize 每页数据条数
 * @param {Object} state 订单状态(1已接单，2已完成，3取消)
 */
export function getOrderByPage(pageNum,pageSize,state){
  return request({
    url:'/clien/order/list',
    method:'get',
    params:{
      pageNum,
      pageSize,
      state
    }
  })
}
// 注意get请求用params,post请求用data
/**
 * 分页查询废品信息api
 * @param {Object} pageNum
 * @param {Object} pageSize
 */
export function getWasteInfoByPage(pageNum,pageSize,status){
  return request({
    url:'/clien/wasteInformation/list',
    method:'get',
    params:{
      pageNum,
      pageSize,
      status// 表示废品信息
    }
  })
}

/**
 * 根据订单id删除订单
 * @param {Object} id 订单id
 */
export function deleteOrder(id){
  return request({
    url: '/clien/order/delete',
    method: 'get',
    params: {id}
  })
}

/**
 * 根据订单id取消除订单
 * @param {Object} id 订单id
 */
export function cancelOrder(id){
  return request({
    url: '/clien/order/cancel',
    method: 'get',
    params: {id}
  })
}
/**
 * 删除废品信息的api
 * @param {Object} id 废品信息id
 */
export function deleteWasteInfo(id) {
  return request({
    url:'/clien/wasteInformation/delete',
    method:'get',
    params:{id}
  })
}
