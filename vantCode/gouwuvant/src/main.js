import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000/api/v1';
Vue.prototype.$http = axios
// import './mock'
// 添加前置拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  if (token !== null){
    config.headers.Authorization = 'Bearer'+token
  }
    return config;
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
