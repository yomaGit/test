let baseurl= {};
baseurl.install = function (React, options) {
  let hr=location.href;
  let v=new React();
  let bu={//- 正式库
    imgupload:"http://ydjia.hydee.cn:8090/hwimg/store/img",//- 图片上传地址
    hreforigin:location.origin+'/ydj-merchant-center/',//- 测试接口的origin
    // prousedurl:location.origin+'/ydj-merchant-manager/',//- 旧后台的前面地址
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
  }

  if(hr.indexOf("ydjia.hydee.cn")<=-1){//- 测试库
    bu.imgupload="http://ydjcs.hydee.cn/hwimg/store/img";

  }

  if(hr.indexOf("localhost")>-1||hr.indexOf("192.168.")>-1){//- 本地测试接口地址等
    bu.hreforigin="http://ydjcs.hydee.cn/ydj-merchant-center/";
    bu.prousedurl="http://ydjcs.hydee.cn/ydj-merchant-manager/";
    bu.loginstate=false;//- 本地调试ajax登录关闭
    bu.mercode='123456';

  }

  React.prototype.$baseurl = bu;
}
module.exports = baseurl;
