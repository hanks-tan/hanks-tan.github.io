import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
import 'bootstrap'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.BaseURL = '/api'

new Vue({
  template: '<App/>',
  components: { App }
}).$mount('#app')
