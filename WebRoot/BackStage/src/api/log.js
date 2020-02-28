import request from '@/utils/request'
/**
 * 分页多条件查询登录日志
 * @param {Object} info
 */
export function fingLoginLogByPage(info){
  return request({
    url:'/loginLog/list',
    method:'get',
    params:info
  })
}

/**
 * 根据id批量删除登录日志
 * @param {Object} ids
 */
export function delLoginLog(ids){
  return request({
    url:'/loginLog/delete',
    method:'get',
    params:{ids}
  })
}

/**
 * 分页多条件查询系统日志
 * @param {Object} info
 */
export function fingSystemLogByPage(info){
  return request({
    url:'/log/list',
    method:'get',
    params:info
  })
}

/**
 * 根据id批量删除系统日志
 * @param {Object} ids
 */
export function delSystemLog(ids){
  return request({
    url:'/log/delete',
    method:'get',
    params:{ids}
  })
}

/**
 * 分页查询在线用户
 * @param {Object} info
 */
export function fingOnlineUser(username){
  return request({
    url:'/session/list',
    method:'get',
    params:{username}
  })
}

/**
 * 根据用户id强制用户下线
 * @param {Object} id
 */
export function forcedOffline(id){
  return request({
    url:'/session/delete',
    method:'get',
    params:{id}
  })
}
