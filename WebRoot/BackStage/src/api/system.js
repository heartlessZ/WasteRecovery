import request from '@/utils/request'

// 登录api
export function getMenuListByUserId() {
    return request({
        url: '/menu/getUserMenu?userId=2',
        method: 'get'
    })
}