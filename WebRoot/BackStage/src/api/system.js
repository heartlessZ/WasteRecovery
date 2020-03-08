import request from '@/utils/request'

// 登录api
export function getMenuListByUserId(userid) {
    return request({
        url: '/menu/getUserMenu',
        method: 'get'
    })
}

export function settledInList(info) {
    return request({
        url: '/settledIn/list',
        method: 'post',
        params: info
      })
  }