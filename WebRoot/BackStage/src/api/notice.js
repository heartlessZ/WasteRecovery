import request from '@/utils/request'
/**
 * 管理员分页查询公共告api
 * @param {Object} info
 *    pageNum     当前页
 *    pageSize    页面数据条数
 *    state       公告状态（0未发布，1发布）
 *    title       公告标题
 *    username    发布人用户名
 *    startDate   开始时间
 *    endDate     结束时间
 *    noticeType  公共类型
 */
export function adminFindNoticeByPage(info){
  return request({
    url:'/notice/list',
    method:'get',
    params:info
  })
}
/**
 * 商家分页查询公告api
 * @param {Object} info
 *    pageNum     当前页
 *    pageSize    页面数据条数
 */
export function userFindNoticeByPage(info){
  return request({
    url:'/notice/businessNoticeList',
    method:'get',
    params:info
  })
}
/**
 * 管理员发布公告api
 * @param {Object} notice
 *    title       标题
 *    content     内容
 *    noticeType  公告类型
 */
export function addNotice(notice){
  return request({
    url:'/notice/add',
    method:'post',
    data:notice
  })
}
/**
 * 管理员修改公告api
 * @param {Object} notice
 *    id          公告id
 *    title       标题
 *    content     内容
 *    noticeType  公告类型
 */
export function modifyNotice(notice){
  return request({
    url:'/notice/update',
    method:'post',
    data:notice
  })
}
/**
 * 平台管理员删除公告api
 * @param {Object} id 公告id
 */
export function delNotice(id){
  return request({
    url:'/notice/delete',
    method:'get',
    params:{id}
  })
}

/**
 * 商家查询新公告数目api
 */
export function userFindNewNoticeNum(){
  return request({
    url:'/notice/getBusinessNewNoticeNum',
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
