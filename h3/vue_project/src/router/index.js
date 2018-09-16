import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const notfound = () => import(/* webpackChunkName: "notfound" */ '@/pages/notfound')

const retail_management = () => import(/* webpackChunkName: "business_event" */ '@/pages/business_event/retail_management/index')

const router=new Router({
  routes: [
    {
      path: '/retail_management',//- 零售管理
      name: 'retail_management',
      component: retail_management,
      meta:{
        title:'零售管理',
      }
    },

    {//- 页面未找到的情况404
      path: '*',
      name: 'notfound',
      component: notfound,
      meta:{
        title:'404',
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  store.commit("openprocessbar");
  next();
})

router.afterEach((to, from) => {//- 存cookie
  let name='merchantReturnUrl';
  let value=location.href;
  let seconds = 86400;
  let date = new Date();
  date.setTime(date.getTime()+(seconds*1000));
  document.cookie=name+"="+encodeURIComponent(value)+";expires="+date.toGMTString()+";path=/";

  let title=to.meta.title;
  document.title=title;

  store.commit("changecbg",false)//- 全局cbg背景标签隐藏
  store.commit("completeproceccbar")
})

export default router
