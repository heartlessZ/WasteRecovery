import request from '@/utils/request'
/**
 * 废品推送API
 * @param {Object} info
 *    distance  距离(单位m)
 *    pageNum
 *    pageSize
 */
export function needPush(info){
  return request({
    url:'/need/needPush',
    method:'get',
    params:info
  })
}
/**
 * 购买废品api
 * @param {Object} id 废品id
 */
export function buy(scInfoReId){
  return request({
    url:'/order/create',
    method:'post',
    params:{scInfoReId}
  })
}
