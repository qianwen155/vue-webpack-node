// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import '@/assets/index.stylus'
import VueLazyload from 'vue-lazyload'
// import lxCore from '@/stg/lxCore'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueLazyload, {
  loading: 'http://ow9eqrxh4.bkt.clouddn.com/vehicle/album/loading_v1.gif'
})
// Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
