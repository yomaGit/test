import Vue from 'vue'
import Router from 'vue-router'

// 路由的正常引入
// import HelloWorld from '@/components/HelloWorld'
// import test0 from '@/components/test0'
// import index from '@/components/index'
// import notfound from '@/components/notfound'

Vue.use(Router)

//路由懒加载，加了webpackChunkName:后可以把相同name的组合到一起加载
const HelloWorld = () => import(/* webpackChunkName: "group-foo" */ '@/components/HelloWorld')
const test0 = () => import(/* webpackChunkName: "group-test0" */ '@/components/test0')
const index = () => import(/* webpackChunkName: "group-index" */ '@/components/index')
const notfound = () => import('@/components/notfound')

export default new Router({
  // mode:'history',//- todo build的时候要解开注释，需要后台相关配置
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      props:{
        show:true
      },
      beforeEnter:(to, from, next)=>{
        //- 全局前置守卫
        console.log("helloworld beforeEnter 全局前置守卫");
        next(true);
      },
      afterEach:(to, from)=>{
        //- 全局后置守卫
        console.log("helloworld afterEach 全局后置守卫");
      },
    },
    {
      path: '/test0',
      name: 'test0',
      component: test0
    },
    {//- 页面未找到的情况404
      path: '*',
      name: 'notfound',
      component: notfound
    },
  ],
})
