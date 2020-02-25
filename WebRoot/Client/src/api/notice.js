import request from '@/utils/request'

/**
 * 用户分页查询公告api
 * @param {Object} info
 *    pageNum     当前页
 *    pageSize    页面数据条数
 */
export function userFindNoticeByPage(info){
  return request({
    url:'/notice/userNoticeList',
    method:'get',
    params:info
  })
}

/**
 * 商家查询新公告数目api
 */
export function userFindNewNoticeNum(){
  return request({
    url:'/notice/getUserNewNoticeNum',
    method:'get'
  })
}

/**
 * 设置公告为已读api
 * @param {Object} id 公告id
 */
export function setIsRead(id){
  return request({
    url:'/notice/setIsRead',
    method:'get',
    params:{id}
  })
}
