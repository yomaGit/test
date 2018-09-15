import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

const v = new Vue();

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

import {
  Button,
  Icon,
  Dropdown,
  Menu,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Checkbox,
  Pagination,

} from 'ant-design-vue';

Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)
Vue.component(Icon.name, Icon)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Dropdown.Button.name, Dropdown.Button)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.Divider.name, Menu.Divider)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Input.name, Input)
Vue.component(Input.Group.name, Input.Group)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Input.TextArea.name, Input.TextArea)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Select.OptGroup.name, Select.OptGroup)
Vue.component(TreeSelect.name, TreeSelect)
Vue.component(TreeSelect.TreeNode.name, TreeSelect.TreeNode)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Checkbox.Group.name, Checkbox.Group)
Vue.component(Pagination.name, Pagination)


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
})
