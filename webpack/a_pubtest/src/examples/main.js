// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import { toast } from '../../dist/pubtest_wp'
Vue.use(toast);

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['./components/index.vue'], resolve)
    },
    {
      path: '/toast',
      name: 'toast',
      component: (resolve) => require(['./components/toast.vue'], resolve)
    }
  ]
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
