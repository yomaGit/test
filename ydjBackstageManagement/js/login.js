$(function(){
    $("#submit").click(function(){
        var nameValue=$("#username").val();
        var passwordValue=$("#password").val();
        if(nameValue==""){
            alert("账户名不能为空");
            $("#username").focus();
            return false;
        }
        if(passwordValue==""){
            alert("密码不能为空");
            $("#password").focus();
            return false;
        }
        var lsJson={
            phone:nameValue,
            password:passwordValue,
            class:2
        }
        $(".loadingLogin").show();
        $.ajax({
            type:'post',
            url:"http://192.168.1.101:8020/ydj-user-app/mall/login",
            data:lsJson,
            dataType:'json',
            success:function(data) {
                $(".loadingLogin").hide();
                if(data.success){
                    var lsJson={
                        id:data.entityId,
                        name:data.obj.trueName,
                        img:data.obj.headPicture,
                        token:data.obj.token,
                        mercode:data.obj.merchantCode,
                        storeId:data.obj.storeid
                    }
                    sessionStorage.setItem("lsYaoshiMsg",JSON.stringify(lsJson));
                    window.location.href="chating.html";
                }else{
                    alert(data.message);
                }
            },
            error:function(){
                $(".loadingLogin").hide();
                alert("网络错误，请重试");
            }
        })
    })

})
