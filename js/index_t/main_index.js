define(function(){
    var init={};
    init.init_fun=function(){
        //todo 页面逻辑处理 start

        setTimeout(function(){
            var lsDom= "<div style='height:1000px;background:red;'>000" +
                        "<a href='#test1/a:a1/b:b1/c:c1' id='test1' onclick='al.rt()' style='position:absolute;bottom:0;color:black;'>000</a>" +
                    "</div>";
            $("#all .current").append(lsDom);
            al.qjLoading_hide();
        },300)

        //todo 页面逻辑处理 end
    }
    return init;
})