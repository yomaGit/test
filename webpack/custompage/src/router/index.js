import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const notfound = () => import(/* webpackChunkName: "notfound" */ '@/components/notfound')

const cuspage = () => import(/* webpackChunkName: "cuspage" */ '@/components/cuspage/cuspage')


const router=new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: cuspage,
      meta:{
        title:'自定义页面',
      }
    },
    {
      path: '/cuspage',//- 自定义页面
      name: 'cuspage',
      component: cuspage,
      meta:{
        title:'自定义页面',
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

router.afterEach((to, from) => {//- 存cookie
  // let name='merchantReturnUrl';
  // let value=location.href;
  // let seconds = 86400;
  // let date = new Date();
  // date.setTime(date.getTime()+(seconds*1000));
  // document.cookie=name+"="+encodeURIComponent(value)+";expires="+date.toGMTString()+";path=/";

  let title=to.meta.title;
  document.title=title;

  // router.app.$store.dispatch('changecbg_async')//- 全局cbg背景标签隐藏
})

export default router
