var express = require('express');
var proxy = require('http-proxy-middleware');

var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');

var app = express();

var post = 8090;
var mercode=123456;

var devurl='http://ydjkf.hydee.cn/';//- TODO 目标地址
var userkey='CE28D9CBB0C1C6E947391A6471DFA7DB';//- TODO user-key验证

var mine={
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
}

var server = http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    var realPath = path.join(__dirname, pathname);

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    // response.writeHead(500, {
                    //     'Content-Type': 'text/plain'
                    // });
                    // response.end(err);
                    console.log(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            })
        }
    })
})
server.listen(post);
console.log(`Server runing at port: ${ post } . Please copy url http://localhost:${ post }/login.html`);

//- 解决跨域问题
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
})

app.use('**', proxy({
    target: devurl,
    changeOrigin: false,
    headers:{
        'Cookie': 'user-key=' + encodeURIComponent(userkey)
    }
}))
app.listen(3000);