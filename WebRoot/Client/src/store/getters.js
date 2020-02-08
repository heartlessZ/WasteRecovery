const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  isLogin:state => state.user.isLogin,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters