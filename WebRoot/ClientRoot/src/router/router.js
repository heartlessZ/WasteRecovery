/**
 * 路由的模块化
 */

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

//先下载安装vue-router组件
//1.创建组件 
//import Home from '../components/Home.vue'
const Home = {
  template: '<div>home</div>'
}
//2.配置路由
const routes = [{
		path: '/home',
		component: Home
	},
	{
		path: '*',
		redirect: '/home'
	} //配置默认跳转页面
]

//3.实例化VueRouter
const router = new VueRouter({
	mode: 'history', //将hash模式修改成history模式
	routes //(缩写)相当于 routes:routes
});
export default router
//5.将<router-view></router-view>放在App.vue里