import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

const v = new Vue();

import basemsg from './plugins/basemsg';//- 默认参数
Vue.use(basemsg);

import Qs from 'qs';//- 处理URL查询字符串
Vue.prototype.$qs=Qs;

import axios from 'axios'//- axios异步
// axios.interceptors.response.use(function (response) {
//   return response.data;
// }, function (error) {
//   return error;
// });
axios.defaults.baseURL = v.$baseurl.hreforigin;
Vue.prototype.$axios = axios;

import catchrecord from './plugins/catchrecord';//- 错误收集
Vue.use(catchrecord);

import Ajaxy from './plugins/ajaxy';//- ajax方法
Vue.use(Ajaxy);

import imgupload from './plugins/imgupload';//- 图片上传
Vue.use(imgupload);

import imghover from './plugins/imgHover';//- 图片查看大图
Vue.use(imghover);

import imgclick from './plugins/imgClick';//- 点击查看图片
Vue.use(imgclick);

//- element-ui相关

Vue.config.productionTip = false

// //- 自定义指令
// Vue.directive('focus', { //- element-ui的v-focus自动获取焦点
//   update: function (el, {value}) {
//     if (value) el.getElementsByTagName("input")[0].focus();
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
})
