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