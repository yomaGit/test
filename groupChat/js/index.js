$(function () {

    document.body.addEventListener('touchstart', function () { });

    var basicMsg={
        origin:'http://ydjkf.hydee.cn/',
        userlist:null
    }

    //- 获取基本信息 sessionStorage
    var sessionMsg=sessionStorage.getItem("lsGroupChat");
    var userMsg=null;
    if(sessionMsg){
        var userObj=JSON.parse(sessionMsg);
        userMsg={
            id:userObj.id,
            name:userObj.name,
            img:userObj.img,
            token:userObj.token,
            mercode:userObj.mercode,
        }

        //- 建立通讯
        if($("#chatinglist").length>0||$("#chatinglist").length>0){
            //- TODO 通讯连接
        }

        //- chatinglist页面
        if($("#chatinglist").length>0){
            //- 获取当前群聊列表
            var jsonParams={
                token:userMsg.token,
                pageIndex:1,
                pageSize:20
            }
            $.ajax({
                type:'POST',
                url:basicMsg.origin+'ydjchat/group/getUserGroups',
                data:jsonParams,
                dataType:'json',
                success:function (d) {
                    if(d.success){
                        var domlist='';
                        var datalist=d.data;
                        if(datalist&&datalist.length>0){
                            datalist.map(function (v) {
                                if(v.groupStatus==1){
                                    var headPic=v.headPic ? v.headPic : `<div class="imggroup">
                                                                            <img src="img/user.jpg">
                                                                            <img src="img/user.jpg">
                                                                            <img src="img/user.jpg">
                                                                            <img src="img/user.jpg">
                                                                        </div>`
                                    var groupName=v.groupName ? v.groupName : '群组'

                                    domlist+=`<li>
                                                <a href="chating.html?groupId=${v.groupId}" class="c">
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
                        alert('获取用户所在群fail');
                    }
                    $(".list .loading").hide();
                },
                error:function () {
                    $(".list .loading").hide();
                    $(".list .loadingNone").css('display','flex');
                    alert('获取用户所在群error');
                }
            })

            //- 发起群聊
            $(".addGC").click(function () {
                $(".groupSel").addClass("open");

                if(basicMsg.userlist==null){
                    $(".userSel .loading").css('display','flex');
                    getUserlist();
                }

            })

            $(".groupSel .close").click(function () {
                $(".groupSel").removeClass("open")
            })

            //- 用户列表
            $(".user").click(function () {
                $(".userlist").addClass("open")

                if(basicMsg.userlist==null){
                    $(".userlist .loading").css('display','flex');
                    getUserlist();
                }
            })

            $(".userlist .close").click(function () {
                $(".userlist").removeClass("open")
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
                    userArr.push({id:$(this).attr("data_id")})
                })

                var jsonParams={
                    token:userMsg.token,
                    createdUserId:userMsg.id,
                    groupName:name,
                    users:userArr
                }

                var intro=$("#groupIntro").val();
                if(intro!='') jsonParams.introduce=intro;

                $.ajax({
                    type:'POST',
                    url:basicMsg.origin+'ydjchat/group/create',
                    data:jsonParams,
                    dataType:'json',
                    success:function (d) {
                        if(d.success){
                            var v=d.data;
                            var headPic=v.headPic ? v.headPic : `<div class="imggroup">
                                                                            <img src="img/user.jpg">
                                                                            <img src="img/user.jpg">
                                                                            <img src="img/user.jpg">
                                                                            <img src="img/user.jpg">
                                                                        </div>`
                            var groupName=v.groupName ? v.groupName : '群组'

                            var dom=`<li>
                                                <a href="chating.html?groupId=${v.groupId}" class="c">
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

                        }else{
                            if(d.msg) alert(d.msg);
                            else alert('创建群失败');
                        }
                    },
                    error:function () {
                        alert('创建群失败');
                    }
                })

            })

        }
    }

    function getUserlist() {
        //- 获取成员数据 TODO 接口未定
        var jsonParams={
            token:userMsg.token,
            pageIndex:1,
            pageSize:20
        }
        $.ajax({
            type:'POST',
            url:basicMsg.origin+'ydjchat/group/getUserGroups',
            data:jsonParams,
            dataType:'json',
            success:function (d) {
                if(d.success){

                }else{
                    alert('用户数据获取失败');
                    $(".userSel .loadingNone,.userlist .loadingNone").css('display','flex');
                }
                $(".userSel .loading,.userlist .loading").hide();

            },
            error:function () {
                alert('用户数据获取失败');
                $(".userSel .loading,.userlist .loading").hide();
                $(".userSel .loadingNone,.userlist .loadingNone").css('display','flex');
            }
        })
    }

})