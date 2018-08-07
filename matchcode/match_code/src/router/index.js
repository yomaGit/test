import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const match_code = () => import(/* webpackChunkName: "group-match_code" */ '@/components/match_code')
const notfound = () => import(/* webpackChunkName: "group-notfound" */ '@/components/notfound')

export default new Router({
  // mode:'history',//- todo build的时候要解开注释，需要后台相关配置
  routes: [
    {
      path: '/',
      name: 'default',
      component: match_code
    },
    {
      path: '/match_code',
      name: 'match_code',
      component: match_code
    },
    // {//- 页面未找到的情况404
    //   path: '*',
    //   name: 'notfound',
    //   component: notfound
    // },
  ],
})
