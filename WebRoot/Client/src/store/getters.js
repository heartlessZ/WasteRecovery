const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  isLogin:state => state.user.isLogin,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userId,
  regionId: state => state.user.regionId,
  rootCategories: state => state.user.rootCategories,
  childrenCategories: state => state.user.childrenCategories,
  config:state=>state.user.config
}
export default getters
