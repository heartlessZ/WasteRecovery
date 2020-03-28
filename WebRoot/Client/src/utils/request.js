import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
//意思是携带cookie信息,保持session的一致性
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://hbws.jiuyect.com:4399';
// axios.defaults.baseURL = 'http://localhost:4299';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://safeclean.tx-q.cn:4399', // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
   /* console.log(res) */
    /* if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.code === 401||res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {  return response.data}*/
    return res
  },
  error => {
    // console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 3 * 1000
    // })
    // return Promise.reject(error)
    return error
  }
)

export default service
