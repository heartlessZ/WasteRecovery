import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/theme/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// lang i18n
import i18n from "./i18n/i18n";

import axios from 'axios'
axios.defaults.baseURL = 'http://safeclean.tx-q.cn:4399';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
Vue.prototype.$addr = axios;
//vue-amap   --高德地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: 'f1a08f9e7196285a7d521e15c447443e',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation'],
  uiVersion: '1.0.11' // 版本号
})

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
