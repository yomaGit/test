const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const http = require('http')
const request = require('request');
const vue = require('vue');
const axios = require('axios');
const qs = require('qs');

const cors = require('koa2-cors');

const fs = require('fs');

const teststatic = JSON.parse(fs.readFileSync('./static/teststatic.json'));

//- 创建数据库并连接
const mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wangpeng',
  database: 'test'
});
connection.connect();

const app = new Koa();
const router = new Router();

// 提供一个/getJson接口
router
  .post('/getJson', koaBody(), async (ctx, next) => {

    let params = ctx.request.body;
    console.log('getJson的传入参数为：' + JSON.stringify(params));

    ctx.body = JSON.parse(fs.readFileSync('./static/material.json'));

  })

  .post('/getzzb2c', koaBody(), async (ctx, next) => {

    let params = ctx.request.body;
    console.log('getzzb2c传入参数为：' + JSON.stringify(params));

    return new Promise(function (resolve, reject) {

      let formdata_get = {
        mercode: 123456
      }
      ajaxy('get', 'http://ydjcs.hydee.cn/mall/homepage/getHomePage1', formdata_get, function (d) {

        ctx.body = d;
        resolve(next());

      }, function () {

        console.log('接口：homepage/getHomePage err');

      })

    })

    //- 中转接口

    //- get
    // request('http://ydjcs.hydee.cn/mall/homepage/getHomePage?mercode=123456', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // Show the HTML for the baidu homepage.
    //     }
    // })

    // let formdata_get={
    //   mercode:123456
    // }
    // ajaxy('get','http://ydjcs.hydee.cn/mall/homepage/getHomePage',formdata_get,function(d){
    //   console.log('get ok:'+JSON.stringify(d));
    //
    //
    //
    // },function(){
    //   console.log('get fail');
    // })

//- post
//     request.post({url:'http://ydjcs.hydee.cn/mall/user/userInfo', form: {mercode:'123456'}}, function(err,httpResponse,body){
//       console.log(httpResponse.statusCode);
//     })

    // axios({
    //   url: 'http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea',
    //   method: 'post',
    //   params: {
    //     parentid:"310100"
    //   }
    // }).then(function (d) {
    //   if (d.status == 200) {
    //     console.log(d)
    //   }else{
    //     console.log("err");
    //   }
    // }).catch(function (e) {
    //   console.log(e);
    // })


  })

  .get('/get', async ctx => {

    let params = afun.getparams(ctx.request.url)
    ctx.body = {
      wname: params.name,
      wage: params.age
    }

    connection.query('SELECT * from tnoid', function (error, results, fields) {
      if (error) throw error;
      // console.log('results:' + JSON.stringify(results));
    });

  })

//- 循环创建接口服务
teststatic.forEach(function (val, index) {
  let type = val.type;
  let pu = val.porturl;
  if (type == 'POST' || type == 'post') {
    router.post(pu, koaBody(), async (ctx, next) => {

      interface(ctx, type, pu, next)

    })
  } else {
    router.get(pu, koaBody(), async (ctx, next) => {

      interface(ctx, type, pu, next)

    })
  }

})

//- 解决跨域问题
app.use(cors())

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000);

const afun = {
  getparams(url) {//- 获取参数
    if (url.indexOf("?") > -1) {
      let par = url.split("?")[1];
      let arr = par.split("&");
      let json = {};
      arr.forEach(function (val, index) {
        let vs = val.split("=");
        json[vs[0]] = vs[1];
      })
      return json;
    } else {
      return url;
    }
  },
  getUrlval(url) {//- 获取url中的val，‘？’前面的内容
    return url.indexOf("?") > -1 ? url.split("?")[0] : url;
  },
  getdefaultjsondata(url) {//- 获取url对应的json data
    let porturl = afun.getUrlval(url);
    let backmsg = '';
    teststatic.forEach(function (val, index) {
      if (val.porturl == porturl) backmsg = val.returndata;
    })
    return backmsg;
  }
}

function interface(ctx, type, pu, next) {

  let params = ctx.request.body;

  return new Promise(function (resolve, reject) {

    ajaxy(type, pu, params, function (d) {

      ctx.body = d;
      resolve(next());

    }, function () {

      console.log('接口：' + pu + ' err');

    })

  })
}

function ajaxy(type, url, data, suc, err, other) {

  let args = {
    url: 'http://ydjcs.hydee.cn/mall/'+url,
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
      data_v = qs.stringify(data);
    }

    args.data = data_v;
  } else {
    args.params = data;
  }

  axios(args).then(function (da) {

    if (da.status == 200) {
      suc(da.data);
    } else {
      err()
    }

  }).catch(function (e) {

    err()
    console.log('status：' + e.response.status + "\n" + 'statusText:' + e.response.statusText)

  })
}
