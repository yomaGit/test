let Koa = require('koa');
let Router = require('koa-router');//- 中间件
var http = require('http');

let cors = require('koa2-cors');
// 引入modejs的文件系统API

let fs = require('fs');

let teststatic = JSON.parse(fs.readFileSync('./static/teststatic.json'));

//- 创建数据库并连接
let mysql = require('mysql');
var connection = mysql.createConnection({
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
    .post('/getJson', async ctx => {

        let params = afun.getparams(ctx.request.url)
        console.log('name:' + params.name + ",age:" + params.age)
        ctx.body = JSON.parse(fs.readFileSync('./static/material.json'));

    })

    .post('/getzzb2c', async ctx => {

        let params = afun.getparams(ctx.request.url)
        console.log('name:' + params.name + ",age:" + params.age)
        ctx.body = JSON.parse(fs.readFileSync('./static/material.json'));

        // let params = afun.getparams(ctx.request.url)
        // console.log('name:' + params.name + ",age:" + params.age)
        //- 中转接口
        var opt = {
            host:'',
            port:'',
            method:'GET',//这里是发送的方法
            path:'http://ydjcs.hydee.cn/homepage/getHomePage',     //这里是访问的路径
            headers:{
                //这里放期望发送出去的请求头
            }
        }
        var body = '';
        var req = http.request(opt, function(res) {
            console.log("Got response: " + res.statusCode);
            res.on('data',function(d){
                body += d;
            }).on('end', function(){
                console.log(res.headers)
                console.log(body)
            });

        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        })
        req.end();

    })

    .get('/get', async ctx => {

        let params = afun.getparams(ctx.request.url)
        ctx.body = {
            wname: params.name,
            wage: params.age
        }

        connection.query('SELECT * from tnoid', function (error, results, fields) {
            if (error) throw error;
            console.log('results:' + JSON.stringify(results));
        });

    })

//- 循环创建服务
teststatic.forEach(function (val, index) {
    let type=val.type;
    let pu = val.porturl;
    let da = val.returndata;
    if(type=='POST'||type=='post'){
        router.post(pu, async ctx => {
            ctx.body = JSON.stringify(da);
        })
    }else{
        router.get(pu, async ctx => {
            ctx.body = JSON.stringify(da);
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