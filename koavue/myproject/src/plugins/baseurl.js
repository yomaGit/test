var baseurl= {};
baseurl.install = function (Vue, options) {
  let hr=location.href;
  let bu={//- 正式库
    imgupload:location.origin+":8090/hwimg/store/img",//- 图片上传地址
    loginstate:true,
    hreforigin:'http://ydjkf.hydee.cn/mall/',

  }

  if(hr.indexOf("ydjia.hydee.cn")<=-1){//- 不是正式库
    bu.imgupload="http://ydjcs.hydee.cn/hwimg/store/img"


    if(hr.indexOf("ydjcs.hydee.cn")<=-1&&hr.indexOf("ydjkf.hydee.cn")<=-1){//- 不是测试库，不是开发库
      bu.hreforigin='http://localhost:3000/';

    }

  }



  Vue.prototype.$baseurl = bu;
}
module.exports = baseurl;
