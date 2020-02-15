import request from '@/utils/request'

// 登录api
export function getMenuListByUserId() {
    return request({
        url: '/menu/getMenu?userId=2',
        method: 'get'
    })
}