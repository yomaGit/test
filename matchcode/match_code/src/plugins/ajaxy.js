var Ajaxy = {};
Ajaxy.install = function (Vue, options) {
  Vue.prototype.$Ajaxy = (type,url,data,suc,err,pro) => {
    let strj=true;
    if(pro) strj=false;
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open(type,url,true);
    if(strj) xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlHttpReq.onreadystatechange=()=>{
      if(xmlHttpReq.readyState == 4){
        if(xmlHttpReq.status == 200){
          let da=xmlHttpReq.response;
          suc(da);
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
        dataStr += i + '=' + data[i];
      }
    }else{
      dataStr=data;
    }

    xmlHttpReq.send(dataStr);
  }
}
module.exports = Ajaxy;
