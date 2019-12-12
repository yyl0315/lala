import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9999/api/v1';
Vue.prototype.$http = axios
import './mock'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
