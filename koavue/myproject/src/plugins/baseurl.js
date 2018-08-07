var baseurl= {};
baseurl.install = function (Vue, options) {
  let hr=location.href;
  let bu={//- 正式库
    imgupload:"http://ydjia.hydee.cn:8090/hwimg/store/img",//- 图片上传地址

  }

  if(hr.indexOf("ydjia.hydee.cn")<=-1){
    bu={//- 测试库
      imgupload:"http://ydjcs.hydee.cn/hwimg/store/img",

    }
  }

  Vue.prototype.$baseurl = bu;
}
module.exports = baseurl;
