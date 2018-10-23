import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {v4} from 'uuid';
Vue.prototype.$v4 = v4;

import catchrecord from './plugins/catchrecord';//- 错误收集
Vue.use(catchrecord);

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
