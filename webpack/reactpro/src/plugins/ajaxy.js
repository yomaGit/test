let Ajaxy = {};
Ajaxy.install = function (Vue, options) {
  Vue.prototype.$Ajaxy = (type,url,data,suc,err,pro) => {
    let vue=new Vue;
    let strj=true;
    if(pro) strj=false;
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open(type,url,true);
    if(strj) xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlHttpReq.onreadystatechange=()=>{
      if(xmlHttpReq.readyState == 4){
        if(xmlHttpReq.status == 200){
          let da=xmlHttpReq.response;
          da=JSON.parse(da);

          if(da!=undefined&&da!=null&&da.code!=undefined&&da.code!=null&&da.code==1021){
            if(vue.$baseurl.loginstate){
              location.href=vue.$baseurl.prousedurl+'merchant/login';
            }else{//- 本地的情况下不登录，直接返回数据
              suc(da);
            }
          }else{
            suc(da);
          }
        }else{
          err();
        }
      }
    };

    let dataStr = '';
    if(strj){
      for (let i in data) {
        if (dataStr) {
          dataStr += '&';
        }
        dataStr += i + '=' + encodeURIComponent(data[i]);//- encodeURIComponent参数重新编码
      }
    }else{
      dataStr=data;
    }

    xmlHttpReq.send(dataStr);
  }
}
module.exports = Ajaxy;
