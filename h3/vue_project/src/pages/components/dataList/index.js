import dataList from './dataList'
let dl={}
dl.install=(Vue,options)=>{

  Vue.component('dataList',dataList)
}
export default dl;
