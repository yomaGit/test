let catchRecord = {};
catchRecord.install = function (Vue, options) {
  Vue.prototype.$catchRecord = (errmsg) => {

    let v = new Vue();

    let args = {
      url: v.$baseurl.catchrecordurl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    let usermsg = v.$baseurl.userinfo;
    let formdata = {
      mercode: v.$baseurl.mercode,
      errortime: new Date().getTime(),
      userid: usermsg.id,//- id
      href: location.href,//- 当前url
      userinfo: JSON.stringify(usermsg),//- 用户信息（user/userInfo）
      cookie: document.cookie,//- cookie
      errormsg: JSON.stringify(errmsg),
      browser: navigator.userAgent,//- 浏览器信息
      phone: navigator.appVersion,//- 手机版本，系统信息
      msgfrom: 2,
      other: ''
    }

    args.data = v.$qs.stringify(formdata);
    v.$axios(args).then(function () {
      console.log("record ok");
    }).catch(function (e) {
      console.log(e);
    })


  }
}
export default catchRecord;
