define(function(){
    var init={};
    init.init_fun=function(){
        setTimeout(function(){
            var lsDom= "<div style='height:1000px;background:pink;'>333" +
                "<a href='#test4/a:a4/b:b4/c:c4' id='test4' onclick='al.rt()' style='position:absolute;bottom:0;color:black;'>333</a>" +
                "</div>";
            $("#all .current").append(lsDom);
            al.qjLoading_hide();
        },300)
    }
    return init;
})