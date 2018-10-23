
var Ajaxy = {};
Ajaxy.install = function (Vue, options) {

  Vue.prototype.$Ajaxy = (type,url,data,suc,err) => {

    var v=new Vue();
    v.$axios({
      url: url,
      method: type,
      params: data
    }).then(function (d) {

      try{
        suc(d)
      }catch(e){
        console.log(`%c$Ajaxy里的catch`,'color:blue;');
      }

    }).catch(function () {
      console.log('%c$Ajaxy $axios error');
      err()
    })

    // Vue.prototype.$Ajaxy = (type,url,data,json,suc,err,pro) => {
    // let strj=true;
    // if(pro) strj=false;
    // let xmlHttpReq = new XMLHttpRequest();
    // xmlHttpReq.open(type,url,true);
    // if(strj) xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    // xmlHttpReq.onreadystatechange=()=>{
    //   if(xmlHttpReq.readyState == 4){
    //     if(xmlHttpReq.status == 200){
    //       let da=xmlHttpReq.response;
    //       if(json=="json"){
    //         da= (new Function("return " + da))();
    //       }
    //       suc(da);
    //     }else{
    //       err();
    //     }
    //   }
    // };
    //
    // let dataStr = '';
    // if(strj){
    //   for (let i in data) {
    //     if (dataStr) {
    //       dataStr += '&';
    //     }
    //     dataStr += i + '=' + data[i];
    //   }
    // }else{
    //   dataStr=data;
    // }
    //
    // xmlHttpReq.send(dataStr);
  }
}
module.exports = Ajaxy;
