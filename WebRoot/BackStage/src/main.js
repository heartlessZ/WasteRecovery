import 'babel-polyfill'
import Vue from "vue";
import frame from "./frame.vue";
import router from "./router";
import store from "./store";
import axios from "./common/axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import Element from "element-ui";
import './assets/theme/index.css'
import ImpPanel from "./components/panel.vue";
import i18n from "./i18n/i18n";
Vue.prototype.$http = axios;
Vue.axios = axios;
Vue.http = axios;
Vue.use(axios);
Vue.use(Element);

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)
Vue.component(ImpPanel.name, ImpPanel);

Vue.use(VueProgressBar, {
  color: '#eeeeee',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  store,
  router,
  i18n,
  el: "#root",
  render: h => h(frame)
})
