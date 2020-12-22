import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Message } from 'element-ui'
import './plugins/element.js'
import { vueBaberrage } from 'vue-baberrage'


Vue.use(vueBaberrage)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
// 挂载到$message上
Vue.prototype.$message = Message;
// 使每次请求都会带一个 /api 前缀
// axios.defaults.baseURL = '/topic'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
