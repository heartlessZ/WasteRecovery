import request from '@/utils/request'

/**
 * 分页查询订单列表的api
 * @param {Object} info 查询用到的一些信息
 *     pageNum 当前页码
 *     pageSize 当前页面数据量
 *     address 卖家地址
 *     classificationId 废品类别id
 *     orderId 订单号
 *     state 订单状态
 *     username 卖家用户名
 */
export function selOrderListByPage(info) {
  // 删除对象中的空属性
  return request({
    url: '/order/orderList',
    method: 'get',
    params: info
  })
}
/**
 * 根据订单id删除订单的api
 * @param {Object} id 订单id
 */
export function delOrderById(id) {
  return request({
    url: '/order/delete',
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 根据订单号取消订单的api
 * @param {Object} id 订单id
 */
export function cancelOrderById(id) {
  return request({
    url: '/order/cancel',
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 查询所有的废品类别
 */
export function selAllClassification() {
  return request({
    url: '/classification/classificationSonList',
    method: 'get'
  })
}
