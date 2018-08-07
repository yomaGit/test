define(function(){
    var init={};
    init.init_fun=function(){
        setTimeout(function(){
            var lsDom= "<div style='height:1000px;background:green;'>444" +
                "<a href='#test5/a:a5/b:b5/c:c5' id='test5' onclick='al.rt()' style='position:absolute;bottom:0;color:black;'>444</a>" +
                "</div>";
            $("#all .current").append(lsDom);
            al.qjLoading_hide();
        },300)
    }
    return init;
})