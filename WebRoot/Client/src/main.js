// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import './assets/theme/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

/* import axios from 'axios'
//意思是携带cookie信息,保持session的一致性
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true; */

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
