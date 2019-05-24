// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import baseurl from './plugins/baseurl';//默认地址
Vue.use(baseurl);

import {v4} from 'uuid';//- 处理URL查询字符串
Vue.prototype.$v4=v4;

// import Qs from 'qs';//- 处理URL查询字符串
// Vue.prototype.$qs=Qs;

// import Toast from './plugins/toast';//toast提示弹框
// Vue.use(Toast);

import Ajaxy from './plugins/ajaxy';//ajax方法
Vue.use(Ajaxy);

import imgupload from './plugins/imgupload';//图片上传
Vue.use(imgupload);

// import 'element-ui/lib/theme-chalk/index.css'
// import { Button,Select } from 'element-ui'//- element-ui的组件单独引入
// Vue.use(Button);
// Vue.use(Select);

import axios from 'axios'
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return error;
});
Vue.prototype.$axios=axios;

//- ant-design start

// import 'ant-design-vue/dist/antd.css'
// import Antd from 'ant-design-vue'
// Vue.use(Antd)

// import {
//   Button
// } from 'ant-design-vue'
// Vue.use(Button)

//- ant-design end

// import Toast from 'lib/dist/Toast.js'
// Vue.use(Toast);
import { toast } from 'pubtest_wp'
Vue.use(toast);

Vue.config.productionTip = false

// 监听屏幕尺寸出现变化
window.onresize=function () {
  console.log(`%c屏幕尺寸出现了变化`,'color:red;');
}

import rewriteError from './plugins/rewriteError'
rewriteError();

import {postError} from './ajax/getData'
Vue.mixin({
  methods: {
    promiseMethod(methodName,suc,fai,method){
      let _this=this;
      return new Promise((resolve)=>{
        resolve(methodName());
      }).then((d)=>{
        suc(d);
      },()=>{
        fai();
      }).catch((e)=>{
        e.errorOther={
          page:_this.$route.fullPath,
          method
        }
        postError(e)
      })
    },

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
