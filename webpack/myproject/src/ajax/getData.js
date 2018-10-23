import axios from '../plugins/async'

/*
* 默认为正式环境地址
* 测试环境另行配置
* */
let url='http://ydjcs.hydee.cn:80/ydj-platform'
if(process.env.NODE_ENV=='development'){

  url='http://ydjcs.hydee.cn:80/ydj-platform'

}

/*
* 获取省市下级地址的具体值
* @param {parentid 父级id}
*/
export const getAttrList =(parentid='')=>{
  let data={
    parentid
  }
  return axios(url+'/area/queryarea',data);
}

