// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import baseurl from './plugins/baseurl';//默认地址
Vue.use(baseurl);

import Toast from './plugins/toast';//toast提示弹框
Vue.use(Toast);

import Ajaxy from './plugins/ajaxy';//ajax方法
Vue.use(Ajaxy);

import imgupload from './plugins/imgupload';//图片上传
Vue.use(imgupload);

import 'element-ui/lib/theme-chalk/index.css'
import { Button,Select } from 'element-ui'//- element-ui的组件单独引入
Vue.use(Button);
Vue.use(Select);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
