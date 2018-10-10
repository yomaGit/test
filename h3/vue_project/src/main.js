import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

const v = new Vue();

import {v4} from 'uuid';

Vue.prototype.$v4 = v4;

import basemsg from './plugins/basemsg';//- 默认参数
Vue.use(basemsg);

import Qs from 'qs';//- 处理URL查询字符串
Vue.prototype.$qs = Qs;

import axios from 'axios'//- axios异步

axios.defaults.baseURL = v.$baseurl.hreforigin;
Vue.prototype.$axios = axios;

import catchrecord from './plugins/catchrecord';//- 错误收集
Vue.use(catchrecord);

import Ajaxy from './plugins/ajaxy';//- ajax方法
Vue.use(Ajaxy);

import 'iview/dist/styles/iview.css';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Page,
  Modal,
  Message,
  Spin,
  Icon,
} from 'iview';

Vue.component('Button', Button);
Vue.component('ButtonGroup', ButtonGroup);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownItem', DropdownItem);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('Input', Input);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Checkbox', Checkbox);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('Page', Page);
Vue.component('Modal', Modal);
Vue.component('Message', Message);
Vue.component('Spin', Spin);
Vue.component('Icon', Icon);

Object.assign(Vue.prototype,{
  $Modal : Modal,
  $Message : Message,

})

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
})
