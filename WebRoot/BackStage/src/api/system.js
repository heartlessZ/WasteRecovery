import request from '@/utils/request'

// 登录api
export function getMenuListByUserId(userid) {
    return request({
        url: '/menu/getUserMenu?userId='+userid,
        method: 'get'
    })
}