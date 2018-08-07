// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.config.keyCodes = {
  // v: 86,
  // f1: 112,
  // // camelCase 不可用
  // mediaPlayPause: 179,
  // // 取而代之的是 kebab-case 且用双引号括起来
  // "media-play-pause": 179,
  shift_8: [16,56], // *号
  w_W: 87,
  enter:13,
  fanxiegang:191,
  space:32,
  esc:27,
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
