import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PersonalCenter from '@/components/Home/PersonalCenter'
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
          component: PersonalCenter
        },
        {
          path: '',
          component: OverView
        }
      ]
    },
    {
      path: '',
      redirect: '/home'
    }
  ],
  scrollBehavior,
  mode:'history' //html5模式（没有#号）
})
