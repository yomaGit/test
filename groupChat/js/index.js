$(function () {

    var url_origin=location.origin+'/';
    if(location.href.indexOf('localhost')>-1 || location.href.indexOf('192.168.10.65:8090')>-1) url_origin='http://192.168.10.65:3000/';

    var basicMsg={
        userlist:{
            data:null,
            pageindex:0,
            nextpage:true
        },
        userMsg:null,
        otherMsg:null,
        ws:null,
        ws_url:'',
        strToJson:function(str){// str转json
            var json = (new Function("return " + str))();
            return json;
        },
        getTimeStamp:function(){// 获取时间戳
            return new Date().getTime()+Math.ceil(Math.random()*10)
        },
        imgDom:function(lid,url){// 返回图片dom结构
            return `<img id='${lid}' src='${url}' class='sendImg'>`;
        },
        judimgload:function(id){// 判断图片加载完页面滚动
            var zid=id;
            var lid=$("#"+zid);
            if(lid.length>0){
                var lidd=lid[0];
                lidd.onload =function() {
                    var sh=lidd.offsetHeight;
                    var st=$(".content").scrollTop();
                    $(".content").scrollTop(st+sh+35);
                }
            }
        },
        getUser_group:function(){//- 获取所在群列表
            var jsonParams={
                token:basicMsg.userMsg.token,
                pageIndex:1,
                pageSize:20
            }
            $.ajax({
                type:'POST',
                url:urlConfig.origin_groupChat+'group/getUserGroups',
                data:jsonParams,
                dataType:'json',
                success:function (d) {
                    if(d.success){
                        var domlist='';
                        var datalist=d.data;
                        if(datalist&&datalist.length>0){
                            datalist.map(function (v) {
                                if(v.groupStatus==1){
                                    var headPic_url=v.headPic;
                                    var headPic=headPic_url ? `<img src="${headPic_url}">` : `<div class="imggroup">
                                                                                <img src="img/user.jpg">
                                                                                <img src="img/user.jpg">
                                                                                <img src="img/user.jpg">
                                                                                <img src="img/user.jpg">
                                                                            </div>`
                                    var groupName=v.groupName ? v.groupName : '群组'

                                    domlist+=`<li data_id="${v.groupId}" data_name="${groupName}" data_img="${headPic_url}" data_type="group">
                                                    <a href="javascript:;" class="c">
                                                        <div class="img">
                                                            ${headPic}
                                                            <div class="num"></div>
                                                        </div>
                                                        <div class="con">
                                                            <div class="name">${groupName}</div>
                                                            <div class="text"></div>
                                                        </div>
                                                        <div class="msg">
                                                            <div class="time">00:00</div>
                                                        </div>
                                                    </a>
                                                </li>`;
                                }
                            })
                        }
                        if(domlist!=''){
                            $(".list ul").append(domlist);
                        }else{
                            $(".list .loadingNone").css('display','flex');
                        }
                    }else{
                        if(d.msg) alert(d.msg);
                        else alert('获取用户所在群fail');
                    }
                    $(".list .loading").hide();
                },
                error:function () {
                    $(".list .loading").hide();
                    $(".list .loadingNone").css('display','flex');
                    alert('获取用户所在群error');
                }
            })
        },
        getUserlist:function() {//- 获取成员数据

            if(!basicMsg.userlist.nextpage) return false;

            $(".userSel .loading,.userlist .loading").css('display','flex');

            var pi=basicMsg.userlist.pageindex;
            pi++;

            var jsonParams={
                token:basicMsg.userMsg.token,
                pageIndex:pi,
                pageSize:20
            }
            $.ajax({
                type:'POST',
                url:urlConfig.origin_groupChat+'user/allUser',
                data:jsonParams,
                dataType:'json',
                success:function (d) {
                    if(d.success){
                        var datalist=d.users;
                        if(datalist&&datalist.length>0){
                            if(basicMsg.userlist.data==null) basicMsg.userlist.data=[];

                            var userDom_q='';
                            var userDom_s='';
                            datalist.forEach(function (value) {

                                var userId=value.id;
                                var name=value.name;
                                var hp=value.headPic;
                                // if(hp) hp=hp.substring(0,hp.lastIndexOf('/'))+'/120'+hp.substring(hp.lastIndexOf('/'),hp.length)
                                if(hp) hp=hp;
                                else hp='img/user.jpg';

                                basicMsg.userlist.data.push({
                                    id:userId,
                                    name:name,
                                    img:hp
                                })

                                userDom_q+=`<li data_id="${userId}">
                                                <label class="c">
                                                    <input type="checkbox">
                                                    <div class="img"><img src="${hp}"></div>
                                                    <div class="name">${name}</div>
                                                </label>
                                            </li>`;

                                userDom_s+=`<li data_id="${userId}" data_name="${name}" data_img="${hp}">
                                                <a href="javascript:;" class="c">
                                                    <div class="img"><img src="${hp}"></div>
                                                    <div class="name">${name}</div>
                                                </a>
                                            </li>`;
                            })

                            $(".userSel ul").append(userDom_q);
                            $(".userlist ul").append(userDom_s);

                        }else if(d.pageIndex==0||d.pageIndex==1){
                            $(".userSel .loadingNone,.userlist .loadingNone").css('display','flex');
                        }
                        $(".userSel .loading,.userlist .loading").hide();
                    }else{
                        setTimeout(function () {
                            if(d.msg) alert(d.msg);
                            else alert('用户数据获取失败');
                        },500)
                        $(".userSel .loadingNone,.userlist .loadingNone").css('display','flex');
                    }
                    $(".userSel .loading,.userlist .loading").hide();

                    basicMsg.userlist.pageindex=d.pageIndex;
                    basicMsg.userlist.nextpage=d.nextPage;
                    if(d.nextPage){
                        $(".userSel .nextc,.userlist .nextc").css('display','flex');
                    }else{
                        $(".userSel .nextc,.userlist .nextc").hide();
                    }

                },
                error:function (e) {
                    setTimeout(function () {
                        alert('用户数据获取失败');
                    },500)
                    console.log(e);
                    $(".userSel .loading,.userlist .loading").hide();
                    $(".userSel .loadingNone,.userlist .loadingNone").css('display','flex');
                }
            })
        },
        uiListener:{// ws回调
            newMessage:function(msg){
                console.log("收到消息"+JSON.stringify(msg));
                var msgDom;
                var fromId=msg.fromUserId;
                if(fromId==basicMsg.userMsg.id) return false;

                switch (msg.messageType){
                    case basicMsg.ws.MessageType.text:
                        msgDom=msg.content;
                        break;
                    case  basicMsg.ws.MessageType.picture:
                        var lid="img_"+basicMsg.getTimeStamp();
                        msgDom=basicMsg.imgDom(lid,basicMsg.strToJson(msg.content).picUrl);
                        break;
                }

                // 消息存储
                basicMsg.msgSave_ls(msg,'back');

                var fromUserName=msg.fromUserName;
                var groupId=msg.groupId;

                var oppositeType=msg.oppositeType;
                var mtype=oppositeType==1 ? 'group' : 'normal';
                var noteBool=false;

                if($("#chating").length>0){
                    var type=basicMsg.otherMsg.type;

                    var gdom='';
                    var groupClass='';
                    var addDomBool=false;
                    if(mtype=='group'&&mtype==type&&groupId==basicMsg.otherMsg.id){//- 群组消息 && 在当前群组内
                        gdom=`<div class="name">${fromUserName}</div>`;
                        groupClass=' group';
                        addDomBool=true;
                    }else if(mtype=='normal'){
                        addDomBool=true;
                    }else{
                        noteBool=true;
                    }

                    if(addDomBool){
                        var bdom=`<li class="msg backMsg${groupClass}">
                                    <div class="img"><img src="img/user.jpg"></div>
                                    ${gdom}
                                    <div class="msgc"><span>${msgDom}</span></div>
                                </li>`;

                        $(".content ul").append(bdom);

                        basicMsg.scrollBottom();
                        if(msgDom.indexOf('sendImg')>-1) basicMsg.judimgload(lid);
                    }

                }

                if($("#chatinglist").length>0){

                    basicMsg.resetMsg();

                }

                if(noteBool) basicMsg.msgShow_box(mtype,msg.fromUserName,msgDom);
            },
            sendSuccess:function(rmid){
                console.log(`发送成功，mid:${rmid}`);
                if($("#chating").length>0){
                    $(".content li[data_mid="+rmid+"] .dot").hide();

                    // 改变消息的发送状态
                    var localName=`groupChatRecord${basicMsg.userMsg.id}`;
                    var localMsg=localStorage.getItem(localName);
                    if(localMsg) {
                        localMsg = basicMsg.strToJson(localMsg);

                        if ($("#chatinglist").length > 0) {

                        } else if ($("#chating").length > 0) {
                            var key = '';
                            if (basicMsg.otherMsg.type == 'group') {
                                key = `groupData${basicMsg.otherMsg.id}`;
                            } else if (basicMsg.otherMsg.type == 'normal') {
                                key = `normalData${basicMsg.otherMsg.id}`;
                            }

                            for (var i in localMsg) {
                                if (i == key) {
                                    var arrMsg = localMsg[i];
                                    arrMsg.data.forEach(function (v) {
                                        if (v.msg.mid==rmid) v.state=1;
                                    })
                                }
                            }
                        }

                        localStorage.setItem(localName,JSON.stringify(localMsg));
                    }
                }

            },

        },
        socketConnet:function () {// 获取socket server地址
            $.ajax({
                type:'POST',
                url:urlConfig.url_socketServer,
                data:{},
                dataType:"json",
                success:function (d) {
                    if(d.success){
                        basicMsg.ws_url=d.server.indexOf("ws://")>-1 ? d.server : `ws://${d.server}`;

                        window.socketConnet_w();

                    }else{
                        if(d.msg) alert(d.msg);
                        else alert('获取socket url fail');
                    }
                },
                error:function (e) {
                    console.log(e);
                    alert('获取socket url error');
                }
            })
        },
        msgShowtime:null,
        msgShow_box:function (type,name,msg) {// 消息弹框

            clearTimeout(basicMsg.msgShowtime);
            basicMsg.msgShowtime=setTimeout(function () {
                $(".msgbox").remove();
            },2000)

            var xtext=type=='group' ? '群消息' : '普通消息';
            var con=`<div class="type">消息来了：${xtext}</div>
                    <div class="name">名字：${name}</div>
                    <div class="text">内容：${msg}</div>`

            if($(".msgbox").length>0){
                $(".msgbox").html(con)
            }else{
                $("body").append(`<div class="msgbox">${con}</div>`)
            }
        },
        getMsg_offline:function(){//- 获取离线消息
            var jsonParams={
                token:basicMsg.userMsg.token,
                pageSize:20,
                requestSource:'H5'
            }

            $.ajax({
                type: 'POST',
                url: urlConfig.origin_groupChat + 'message/getLeaveMsg',
                data: jsonParams,
                dataType: 'json',
                success: function (d) {
                    if (d.success) {
                        var np=d.nextPage;
                        var list=d.data;
                        if(list&&list.length>0){
                            var msgidarr=[];
                            for(var i=0;i<list.length;i++){
                                var ct=basicMsg.strToJson(list[i].msgContent);
                                msgidarr.push(ct.mid);
                            }

                            var lsEJson_s={
                                token:basicMsg.userMsg.token,
                                msgIds:JSON.stringify(msgidarr),
                                requestSource:'H5'
                            }
                            $.ajax({
                                type: "POST",
                                url: urlConfig.origin_groupChat+'message/verifyLeaveMsg',
                                dataType: "json",
                                data: lsEJson_s,
                                success: function (da) {
                                    if(da.success){


                                        for(var i=0;i<list.length;i++){
                                            var ct=basicMsg.strToJson(list[i].msgContent);
                                            basicMsg.uiListener.newMessage(ct);
                                        }

                                        if(np){
                                            basicMsg.getMsg_offline();
                                        }else{

                                        }

                                    }else{

                                    }
                                },
                                error: function () {

                                }
                            })
                        }else{

                        }
                    }
                },
                error:function (e) {

                }
            })
        },
        msgSave_ls(msg,type){//- 存储消息记录

            var localName=`groupChatRecord${basicMsg.userMsg.id}`;
            var localMsg=localStorage.getItem(localName);
            var objMsg=localMsg ? basicMsg.strToJson(localMsg) : {};

            var oppositeType=msg.oppositeType;
            var fromId=type=='local' ? msg.toUserId : msg.fromUserId;
            var fromname=type=='local' ? msg.toUserName : msg.fromUserName;
            var groupId=msg.groupId;

            var key='';
            var name='';
            var sid='';
            if(oppositeType==1){
                sid=groupId;
                key=`groupData${groupId}`;
                name=msg.groupName;
            }else if(oppositeType==0){
                sid=fromId;
                key=`normalData${fromId}`;
                name=fromname;
            }

            var cJson={
                type:type,
                msg:msg,
                time:new Date().getTime()
            }

            if(type=='local'){// 发送的存储
                cJson.state=0
            }else if(type=='back'){//- 返回消息
                cJson.state=1
                if($("#chatinglist").length>0) cJson.state=0;
            }

            var arrMsg=[];
            for(var i in objMsg){
                if(i==key){
                    arrMsg=objMsg[i].data;
                }
            }
            arrMsg.push(cJson)

            objMsg[key]={
                name:name,
                sid:sid,
                data:arrMsg
            }
            localStorage.setItem(localName,JSON.stringify(objMsg));
        },
        resetMsg:function(){// 初始化消息记录
            var localName=`groupChatRecord${basicMsg.userMsg.id}`;
            var localMsg=localStorage.getItem(localName);
            if(localMsg){
                localMsg=basicMsg.strToJson(localMsg);

                if($("#chatinglist").length>0){
                    $(".list li").remove();
                    for(var i in localMsg){
                        var str=i+'';
                        var v=localMsg[i];
                        var adom='';

                        var _arrMsg=v.data;
                        var lastMsg=_arrMsg[_arrMsg.length-1]
                        var msgDom=lastMsg.msg.content;
                        if(msgDom.picUrl||msgDom.indexOf('"fileTypeName":"other"')>-1) msgDom='图片消息，进入详情后可以查看';

                        var style='display:none';
                        if(lastMsg.type=='back'&&lastMsg.state==0) style='display:flex';

                        if(str.indexOf('group')>-1){// 群组

                            adom=`<li data_id="${v.sid}" data_name="${v.name}" data_img="img/user.jpg" data_type="group">
                                                    <a href="javascript:;" class="c">
                                                        <div class="img">
                                                            <div class="imggroup">
                                                                <img src="img/user.jpg">
                                                                <img src="img/user.jpg">
                                                                <img src="img/user.jpg">
                                                                <img src="img/user.jpg">
                                                            </div>
                                                            <div class="num" style="${style}"></div>
                                                        </div>
                                                        <div class="con">
                                                            <div class="name">${v.name}</div>
                                                            <div class="text">${msgDom}</div>
                                                        </div>
                                                        <div class="msg">
                                                            <div class="time">00:00</div>
                                                        </div>
                                                    </a>
                                                </li>`;

                        }else if(str.indexOf('normal')>-1){// 普通
                            adom=`<li data_id="${v.sid}" data_name="${v.name}" data_img="img/user.jpg" data_type="normal">
                                        <a href="javascript:;" class="c">
                                            <div class="img">
                                                <img src="img/user.jpg">
                                                <div class="num" style="${style}"></div>
                                            </div>
                                            <div class="con">
                                                <div class="name">${v.name}</div>
                                                <div class="text">${msgDom}</div>
                                            </div>
                                            <div class="msg">
                                                <div class="time">00:00</div>
                                            </div>
                                        </a>
                                    </li>`
                        }
                        $(".list ul").append(adom)
                    }
                    if($(".list li").length>0) $(".list .loadingNone").css('display','none');

                }else if($("#chating").length>0){
                    var key='';
                    if(basicMsg.otherMsg.type=='group'){
                        key=`groupData${basicMsg.otherMsg.id}`;
                    }else if(basicMsg.otherMsg.type=='normal'){
                        key=`normalData${basicMsg.otherMsg.id}`;
                    }
                    var arrMsg=[];
                    for(var i in localMsg){
                        if(i==key){
                            arrMsg=localMsg[i];
                        }
                    }
                    if(arrMsg.data.length>0){
                        arrMsg.data.forEach(function (v) {
                            var addDom='';
                            var msg=v.msg;
                            var content=msg.content;

                            // 图片消息
                            var lid='_img'+basicMsg.getTimeStamp();
                            var imgBool=false;
                            if(content.picUrl||content.indexOf('"fileTypeName":"other"')>-1) {
                                var imgUrl=content.picUrl;
                                if(typeof content == 'string'&&content.indexOf('"fileTypeName":"other"')>-1) imgUrl=basicMsg.strToJson(content).picUrl
                                content=basicMsg.imgDom(lid,imgUrl);
                                imgBool=true;
                            }

                            if(v.type=='back'){
                                var gdom='';
                                var groupClass='';
                                if(msg.oppositeType==1){// 群组
                                    gdom=`<div class="name">${msg.fromUserName}</div>`;
                                    groupClass=' group';
                                }

                                addDom=`<li class="msg backMsg${groupClass}">
                                            <div class="img"><img src="img/user.jpg"></div>
                                            ${gdom}
                                            <div class="msgc"><span>${content}</span></div>
                                        </li>`;

                            }else if(v.type=='local'){

                                var style=v.state==1 ? 'display:none' : '';
                                addDom=`<li class="msg userMsg" data_mid="${msg.mid}">
                                        <div class="img"><img src="${basicMsg.userMsg.img}"></div>
                                        <div class="msgc"><span>${content}</span><div class="dot" style="${style}"></div></div>
                                    </li>`;

                            }

                            $(".content ul").append(addDom);

                            if(imgBool) basicMsg.judimgload(lid);

                        })

                    }
                }

            }
        },
        localAddMsg:function (mid,dom) {//- 发送 dom添加
            $(".content ul").append(`<li class="msg userMsg" data_mid="${mid}">
                                        <div class="img"><img src="${basicMsg.userMsg.img}"></div>
                                        <div class="msgc"><span>${dom}</span><div class="dot"></div></div>
                                    </li>`)

            basicMsg.scrollBottom();
        },
        scrollBottom:function(){
            $(".content").scrollTop($(".content ul").height()-$(window).height()+110)
        },
        sendMsg:function (msg) {// 发送消息

            if(basicMsg.otherMsg.type=='group'){//- 群组消息
                Object.assign(msg,{
                    groupId:basicMsg.otherMsg.id,
                    groupName:basicMsg.otherMsg.name,
                    oppositeType:1
                })
            }else{//- 普通消息
                Object.assign(msg,{
                    toUserId:basicMsg.otherMsg.id,
                    toUserName:basicMsg.otherMsg.name,
                    oppositeType:0,
                })
            }

            basicMsg.ws.sendMessage(msg);

            basicMsg.msgSave_ls(msg,'local');
        }
    }

    window.socketConnet_w=function () {// 全局调用ws
        if(basicMsg.ws_url!=''){
            basicMsg.ws=new WSSocket(basicMsg.ws_url,{
                id:basicMsg.userMsg.id,
                name:basicMsg.userMsg.name,
                img:basicMsg.userMsg.img
            },basicMsg.userMsg.mercode,basicMsg.userMsg.token,basicMsg.uiListener);

        }
    }

    //- 获取登陆后的基本信息 sessionStorage
    var sessionMsg=sessionStorage.getItem("lsGroupChat");
    if(!sessionMsg){
        alert("session数据失效，请重新登录");
        location.href="login.html";
        return false;
    }

    var userObj=basicMsg.strToJson(sessionMsg);

    basicMsg.userMsg={
        id:userObj.id,
        name:userObj.name,
        img:userObj.img,
        token:userObj.token,
        mercode:userObj.mercode,
    }

    //- 建立通讯 && 获取离线消息
    if($("#chatinglist").length>0||$("#chating").length>0){
        basicMsg.socketConnet()
        basicMsg.getMsg_offline();

        setTimeout(function () {
            basicMsg.resetMsg();
        },1)

        $(".username").html(`用户：${basicMsg.userMsg.name}`);
    }

    //- chating页面初始化
    if($("#chating").length>0){

        var sessionMsg=sessionStorage.getItem("chatingJson")
        if(!sessionMsg){
            alert("session数据失效，请重新登陆");
            location.href="login.html"
            return false
        }
        sessionMsg=basicMsg.strToJson(sessionMsg);

        basicMsg.otherMsg={
            type:sessionMsg.type,
            id:sessionMsg.id,
            name:sessionMsg.name,
            img:sessionMsg.img
        }

        var chat_name='对方';
        if(basicMsg.otherMsg.type=='group'){
            chat_name='群组'
        }
        $(".groupname").html(`${chat_name}：${basicMsg.otherMsg.name}`);

    }

    //- 发起群聊
    $(".addGC").click(function () {
        $(".groupSel").addClass("open");

        if(basicMsg.userlist.data==null){
            // $(".userSel .loading").css('display','flex');
            basicMsg.getUserlist();
        }

    })

    $(".groupSel .close").click(function () {
        $(".groupSel").removeClass("open")
    })

    //- 用户列表
    $(".user").click(function () {
        $(".userlist").addClass("open")

        if(basicMsg.userlist.data==null){
            // $(".userlist .loading").css('display','flex');
            basicMsg.getUserlist();
        }
    })

    $(".userlist .close").click(function () {
        $(".userlist").removeClass("open")
    })

    $(".userSel .nextc,.userlist .nextc").click(function () {
        basicMsg.getUserlist();
    })

    //- 退出
    $(".quit").click(function () {
        location.href='login.html'
    })

    //- 创建群组
    $(".addGroup").click(function () {

        var name=$("#groupName").val();
        if(name.match(/^\s*$/)){
            alert('群组名不可以不填写');
            return false;
        }

        if($(".userSel li").length<1){
            alert('群组成员必须添加');
            return false;
        }

        var userArr=[];
        $(".userSel li").each(function () {
            var _this=$(this);
            if(_this.find("input")[0].checked) userArr.push($(this).attr("data_id"))
        })

        var jsonParams={
            token:basicMsg.userMsg.token,
            name:name,
            userids:userArr.join(',')
        }

        var intro=$("#groupIntro").val();
        if(intro!='') jsonParams.introduct=intro;

        $(".loading_").show();
        $.ajax({
            type:'POST',
            url:urlConfig.origin_groupChat+'group/create',
            data:jsonParams,
            dataType:'json',
            success:function (d) {
                if(d.success){
                    var v=d;
                    var headPic_url=v.headPic;
                    var headPic=`<div class="imggroup">
                                    <img src="img/user.jpg">
                                    <img src="img/user.jpg">
                                    <img src="img/user.jpg">
                                    <img src="img/user.jpg">
                                </div>`
                    var groupName=v.groupName ? v.groupName : '群组'

                    var dom=`<li data_id="${v.groupId}" data_name="${groupName}" data_img="${headPic_url}" data_type="group">
                                    <a href="javascript:;" class="c">
                                        <div class="img">
                                            ${headPic}
                                            <div class="num"></div>
                                        </div>
                                        <div class="con">
                                            <div class="name">${groupName}</div>
                                            <div class="text"></div>
                                        </div>
                                        <div class="msg">
                                            <div class="time">00:00</div>
                                        </div>
                                    </a>
                                </li>`;

                    $(".list .loading,.list .loadingNone").hide();
                    $(".list ul").append(dom);

                    $(".groupSel .close").click();

                }else{
                    if(d.msg) alert(d.msg);
                    else alert('创建群失败');
                }

                $(".loading_").hide();
            },
            error:function () {
                alert('创建群失败');
                $(".loading_").hide();
            }
        })

    })

    //- 群组列表点击
    $("body").delegate(".list ul li",'click',function () {
        var _this=$(this);
        var id=_this.attr("data_id");
        var groupJson={
            type:'normal',
            id:id,
            name:_this.attr("data_name"),
            img:_this.attr("data_img"),
        }
        if(_this.attr('data_type')=='group') groupJson.type='group';
        sessionStorage.setItem('chatingJson',JSON.stringify(groupJson))

        // 改变返回消息的state
        var localName=`groupChatRecord${basicMsg.userMsg.id}`;
        var localMsg=localStorage.getItem(localName);
        if(localMsg) {
            localMsg = basicMsg.strToJson(localMsg);

            for (var i in localMsg) {
                var arrMsg = localMsg[i];
                if (arrMsg.sid == id) {
                    arrMsg.data.forEach(function (v) {
                        if (v.type=='back'&&v.state==0) v.state=1;
                    })
                }
            }

            localStorage.setItem(localName,JSON.stringify(localMsg));
        }

        location.href='chating.html';
    })

    //- 用户列表点击
    $("body").delegate(".userlist ul li","click",function () {
        var _this=$(this);
        var chatingJson={
            type:'normal',
            id:_this.attr("data_id"),
            name:_this.attr("data_name"),
            img:_this.attr("data_img"),
        }
        sessionStorage.setItem('chatingJson',JSON.stringify(chatingJson))
        location.href='chating.html';
    })

    $(".smsg").click(function () {
        var inputValue=$("#sendId").val();
        if(inputValue.match(/^\s*$/)){
            alert("发送不能为空");
            return false;
        }

        var mid=basicMsg.ws.createMid(basicMsg.otherMsg.id);

        basicMsg.localAddMsg(mid,inputValue);

        var msg={
            mid:mid,
            messageType:basicMsg.ws.MessageType.text,
            content:inputValue
        }

        basicMsg.sendMsg(msg);

        $("#sendId").val('');
    })

    $("#file").change(function(){
        var that=$(this);
        var file = that.prop("files");
        var fileLength=file.length;
        if(fileLength<1) return;
        $(".loading_").show();
        var file0 = file[0];
        var formData = new FormData();
        var columnName = 'img';
        formData.append(columnName, file0);
        formData.append("filetype", file0.type);
        $.ajax({
            type: 'POST',
            url: urlConfig.url_imgUpload,
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (data) {
                if (data != "") {
                    var imgUrl = data.img;
                    var dataSrc=imgUrl.substring(0,imgUrl.lastIndexOf("/"))+"/artwork"+imgUrl.substring(imgUrl.lastIndexOf("/"));

                    that.val("");

                    var lid='_img'+basicMsg.getTimeStamp();
                    var msgDom=basicMsg.imgDom(lid,dataSrc);

                    var mid=basicMsg.ws.createMid(basicMsg.otherMsg.id)
                    basicMsg.localAddMsg(mid,msgDom);

                    basicMsg.judimgload(lid);

                    var msg={
                        mid:mid,
                        messageType:basicMsg.ws.MessageType.picture,
                        content:{
                            picUrl:dataSrc,
                            fileTypeName:"other"
                        },
                    }

                    basicMsg.sendMsg(msg);

                }else{
                    alert("发送失败，请重试");
                }
                $(".loading_").hide();
            },
            fail:function(){
                $(".loading_").hide();
                alert("发送失败，请重试");
            }
        })
    })

})