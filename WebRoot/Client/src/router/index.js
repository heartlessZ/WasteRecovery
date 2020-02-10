import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from'@/components/Login'
import Register from'@/components/Register.vue'
import OverView from '@/components/Home/OverView'
Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      // 通过 to.hash 的值來找到对应的元素
      selector: to.hash
    }
  }
}

const PersonalCenter = resolve => require(['@/components/Home/PersonalCenter'], resolve)
const JoinUs = resolve => require(['@/components/Home/PersonalCenter/JoinUs'], resolve)
const UserInfo = resolve => require(['@/components/Home/PersonalCenter/UserInfo'], resolve)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'overview',
          component: OverView
        },
        {
          path: 'personal-center',
          component: PersonalCenter,
          children: [
            {
              path: 'join-us',
              component:JoinUs
            },{
              path: 'user-info',
              component:UserInfo
            }
          ]
        },
        {
          path: '',
          component: OverView
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path: '',
      redirect: '/home'
    }
  ],
  scrollBehavior,
  mode:'history' //html5模式（没有#号）
})
