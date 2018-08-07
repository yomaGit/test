define(function(){
    var init={};
    init.init_fun=function(){
        setTimeout(function(){
            var lsDom= "<div style='height:1000px;background:yellow;'>111" +
                "<a href='#test2/a:a2/b:b2/c:c2' id='test2' onclick='al.rt()' style='position:absolute;bottom:0;color:black;'>111</a>" +
                "</div>";
            $("#all .current").append(lsDom);
            al.qjLoading_hide();
        },300)
    }
    return init;
})