document.body.addEventListener('touchstart', function () { });

var url_origin=location.origin+'/';
if(location.href.indexOf('localhost')>-1 || location.href.indexOf('192.168.10.65:8090')>-1) url_origin='http://192.168.10.65:3000/';

var urlConfig={

    // 群聊相关地址
    origin_groupChat:url_origin+'ydjchat/',
    // origin_groupChat:'http://192.168.10.144:8080/ydjchat-service/',

    //- 服务相关地址
    origin_merchant:url_origin+'merchants/',

    // socket地址获取
    url_socketServer:url_origin+'address_center/get_server',
    // url_socketServer:'http://192.168.10.144:8081/address_center/get_server',

    url_imgUpload:'http://ydjcs.hydee.cn:8090/hwimg/files/upload'
}
