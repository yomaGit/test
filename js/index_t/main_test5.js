define(function(){
    var init={};
    init.init_fun=function(){
        setTimeout(function(){
            var lsDom= "555 <a href='#jj'>jj</a>";
            $("#all .current").append(lsDom);
            al.qjLoading_hide();
        },300)
    }
    return init;
})