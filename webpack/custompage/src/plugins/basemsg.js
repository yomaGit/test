let baseurl= {};
baseurl.install = function (Vue, options) {
  let hr=location.href;
  let v=new Vue();
  let bu={//- 正式库
    imgupload:"http://ydjia.hydee.cn:8090/hwimg/files/upload",//- 图片上传地址
    hreforigin:location.origin+'/ydj-merchant-center/',//- 测试接口的origin
    prousedurl:location.origin+'/ydj-merchant-manager/',//- 旧后台的前面地址
    catchrecordurl:location.origin+'/mall/errormsg/collect',//- 错误收集地址
    loginstate:true,//- ajax登录默认开启
    mercode:'',//- 商家编码
    getTimeAllString:function(type,time){//- 时间戳转时间，格式2022/22/22 22:22:22
      let date=new Date(time);
      let month=getDou((parseInt(date.getMonth())+1).toString());
      let day=getDou(date.getDate().toString());
      let hour=getDou(date.getHours().toString());
      let min=getDou(date.getMinutes().toString());
      let sec=getDou(date.getSeconds().toString());
      function getDou(str){
        if(str.length==1) str="0"+str;
        return str;
      }
      if(type=='day'){
        return date.getFullYear()+"/"+month+"/"+day;
      }else if(type=='min'){
        return date.getFullYear()+"/"+month+"/"+day+" "+hour+":"+min;
      }else if(type=='sec'){
        return date.getFullYear()+"/"+month+"/"+day+" "+hour+":"+min+":"+sec;
      }else{
        return date.getFullYear()+"/"+month+"/"+day+" "+hour+":"+min+":"+sec;
      }
    },
    getlength(str) {//- 获取字符串个数，汉子*2 英文*1
      var realLength = 0, len = str.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      return realLength;
    },
    matchkeywords(str,val){
      let r='correct';
      let tarr=[];
      if(str=='name'){
        tarr=['胶囊','颗粒','咀嚼片'];
      }else if(str=='fac'){
        tarr=['制药','药业','股份','有限','公司','有限公司','股份有限公司','制药有限公司','药业有限公司','医疗器材','保健品','保健品有限公司','商贸有限公司','生物有限公司','工程有限公司'];
      }

      let length=val.length;
      if(length>0){
        if(length<2){
          v.$message({
            message:'名称或生产企业输入内容不少于2个字',
            type:'warning'
          })
          r='error';
        }else{
          for(let i=0;i<tarr.length;i++){
            if(val==tarr[i]) r='error';
          }
          if(r=='error'){
            v.$message({
              message:'请填写详细商品名称或生产企业',
              type:'warning'
            })
          }
        }
      }

      return r;
    },
  }

  let cookie=document.cookie;
  let arrcookie = cookie.split(";");
  for ( let i = 0; i < arrcookie.length; i++) {
    let arr = arrcookie[i].split("=");
    if (arr[0] == 'mercode'||arr[0]==' mercode'){
      bu.mercode=arr[1];
    }
  }

  if(hr.indexOf("ydjia.hydee.cn")<=-1){//- 测试库或开发库（非正式库）
    bu.imgupload="http://ydjcs.hydee.cn:8090/hwimg/files/upload";

  }

  if(hr.indexOf("localhost")>-1){//- 本地测试接口地址等
    bu.hreforigin="http://ydjcs.hydee.cn/ydj-merchant-center/";
    bu.prousedurl="http://ydjcs.hydee.cn/ydj-merchant-manager/";
    bu.loginstate=false;//- 本地调试ajax登录关闭
    bu.mercode='123456';

  }

  Vue.prototype.$baseurl = bu;
}
export default baseurl;
