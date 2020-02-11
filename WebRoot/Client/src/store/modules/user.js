import { login, logout, getInfo, releaseOrder, queryRootCategory, queryChildrenCategory} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: '1234',
    name: '',
    //头像
    avatar: '',
    isLogin: false,
    roles: [],
    userInfo: '',
    userId: '',
    regionId: '',
    rootCategories: [],
    childrenCategories: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }, 
    SET_ISLOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_USER: (state, userInfo)=> {
      state.userInfo = userInfo
    },
    SET_USERID: (state, userId)=> {
      state.userId = userId
    },
    SET_REGIONID: (state, regionId)=> {
      state.regionId = regionId
    },
    SET_ROOTCATEGORY: (state, category)=> {
      state.rootCategories = category
    },
    SET_CHILDRENCATEGORY: (state, category)=> {
      state.childrenCategories = category
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          /* const tokenStr = data.tokenHead+data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr) */
          if(response.status)
            commit('SET_ISLOGIN', true);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (response.status) {
            commit('SET_ISLOGIN', true)
            if (data.roleId && data.roleId.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            }
            commit('SET_NAME', data.username)
            //commit('SET_AVATAR', data.icon)
            //console.log(data[0].regionId)
            commit('SET_USER', data[0])
            commit('SET_USERID', data[0].id)
            commit('SET_REGIONID', data[0].regionId)
          }else{
            commit('SET_ISLOGIN', false)
            commit('SET_USERID', '')
            commit('SET_REGIONID', '')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          removeToken()
          commit('SET_ISLOGIN', false)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 发布订单
    ReleaseOrder({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        releaseOrder(orderInfo).then((res) => {
          
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询分类
    QueryRootCategory({ commit, state }, classificationName) {
      return new Promise((resolve, reject) => {
        queryRootCategory(classificationName).then((res) => {
          if(res.status){
            console.log(res)
            commit('SET_ROOTCATEGORY', res.records)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据父Id查询子分类
    QueryChildrenCategory({ commit, state }, classificationId) {
      return new Promise((resolve, reject) => {
        queryChildrenCategory(classificationId).then((res) => {
          if(res.status){
            console.log(res)
            commit('SET_CHILDRENCATEGORY', res.records)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
