define(function(){
    var init={};
    init.init_fun=function(){
        setTimeout(function(){
            var lsDom= "<div style='height:1000px;background:blue;'>222" +
                "<a href='#test3/a:a3/b:b3/c:c3' id='test3' onclick='al.rt()' style='position:absolute;bottom:0;color:black;'>222</a>" +
                "</div>";
            $("#all .current").append(lsDom);
            al.qjLoading_hide();
        },300)
    }
    return init;
})