// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from './Admin.vue'
import router from '../router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  components: { Admin },
  template: '<Admin/>'
})
