var Ajaxy = {};
Ajaxy.install = function (Vue, options) {

  Vue.prototype.$Ajaxy = (type, url, data, suc, err, other) => {

    let v = new Vue();
    let args = {
      url: url,
      method: type,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }

    if (type == 'POST' || type == 'post') {
      let data_v;
      if (other == 'formdata' || other == 'file') {
        data_v = data;
      } else {
        data_v = v.$qs.stringify(data);
      }
      args.data = data_v;
    } else {
      args.params = data;
    }

    v.$axios(args).then(function (da) {

      if (da.status == 200) {
        let d = da.data;
        // console.log('axios接口返回值'+d);
        if (d != undefined && d != null && d.code != undefined && d.code != null && d.code == 1021) {
          console.log(v.$baseurl.loginstate);
          if (v.$baseurl.loginstate) {
            console.log("该登陆了");
            //todo 登陆控制

          } else {//- 本地的情况下不登录，直接返回数据
            suc(d);
          }
        } else {
          suc(d);
        }
      } else {
        err()

      }

    }).catch(function (e) {
      console.log(e);
      err()

    })

    // var v=new Vue();
    // v.$axios({
    //   url: url,
    //   method: type,
    //   params: data
    // }).then(function (d) {
    //   if (d.status == 200) {
    //     suc(d.data)
    //   }else{
    //     err()
    //   }
    // }).catch(function (e) {
    //   console.log(e);
    //   err()
    // })

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
