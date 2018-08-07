require(["zepto"],function($){
    $(function(){
        var b={//全局方法
            s_setItem:function(a,b){
                sessionStorage.setItem(a,b);
            },
            s_getItem:function(a){
                return sessionStorage.getItem(a);
            },
            s_removeItem:function(a){
                sessionStorage.removeItem(a);
            },
            l_setItem:function(a,b){
                localStorage.setItem(a,b);
            },
            l_getItem:function(a){
                return localStorage.getItem(a);
            },
            l_removeItem:function(a){
                localStorage.removeItem(a);
            },
            hasClass:function(elem, cls) {
                cls = cls || '';
                if (cls.replace(/\s/g, '').length == 0) return false;
                return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
            },
            addClass:function(ele, cls) {
                var elem=ele;
                if (!al.hasClass(elem, cls)) {
                    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
                }
            },
            removeClass:function(ele, cls) {
                var elem=ele;
                if (al.hasClass(elem, cls)) {
                    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
                    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                        newClass = newClass.replace(' ' + cls + ' ', ' ');
                    }
                    elem.className = newClass.replace(/^\s+|\s+$/g, '');
                }
            },
            rt:function(){//记录页面高度数据
                var t=$(window).scrollTop();
                var h= al.getHashVal();
                setTimeout(function(){
                    var l= w.step_list;
                    for(var i=0;i<l.length;i++){
                        if(l[i].hash==h){
                            l[i].top=t;
                        }
                    }
                },1)
            },
            addCss:function(h){
                var a=document.createElement("link");
                a.rel="stylesheet";
                a.href=h;
                document.getElementsByTagName("head")[0].appendChild(a);
            },
            addJs:function(h){
                var a=document.createElement("script");
                a.type="text/javascript";
                a.src=h;
                document.getElementsByTagName("head")[0].appendChild(a);
            },
            getHashVal:function(){
                var hash=location.hash;
                if(hash==""||hash==undefined)
                    hash="#index";
                else
                    hash=hash.split("/")[0];
                return hash;
            },
            getVal_esid:function(){
                var h=location.hash;
                if(h.indexOf("sid:")>-1){
                    h=h.split("/sid:")[0]
                }
                return h;
            },
            getVal:function(){
                var h=al.getVal_esid();
                var no={};
                if(h.indexOf("/")>-1){
                    var va=h.split("/");
                    for(var i=0;i<va.length;i++){
                        var vai=va[i];
                        if(vai.indexOf(":")>-1){
                            var vaia=vai.split(":");
                            no[vaia[0]]=vaia[1];
                        }
                    }
                }
                return no;
            },
            qjLoading_show:function(){
                $(al.loading).show();
            },
            qjLoading_hide:function(){
                $(al.loading).hide();
            },
        }
        b.loading=".loadingLogin";//loading默认选择器
        window.al=b;

        var w={//页面内全局方法
            stepLAdd:function(y){
                var ar= w.step_list;
                if(y=="add"){
                    if(ar.length>=w.pageL) {
                        ar.pop();//删除并返回最后一个元素
                        //require 有init的方法就不需要remove掉js了

                        //var l_hash=ar.pop();//删除并返回最后一个元素
                        //var j_hash=l_hash.hash;
                        // if(j_hash.indexOf("/")>-1){
                        //     j_hash=j_hash.split("/")[0];
                        // }
                        // var hl=w.hashs;
                        //for(var i in hl){
                            //if(i==j_hash) $("script[data-requiremodule="+hl[i]+"]").remove()
                        //}
                    }
                    var h= al.getHashVal();
                    var title="";
                    for(var i in hashs){
                        var hi=hashs[i];
                        if(i==k){
                            jud=false;
                            w.jc_hash=i;
                            w.jc_js=hi;
                            ntitle=hi.title;
                        }
                        if(i=="#404"){
                            w.error_404=hi;
                        }
                    }
                    var lo={
                        hash:h,
                        top:0
                    }
                    ar.unshift(lo);
                }else if(y=="min"){

                    var a=ar.shift();//删除并返回第一个元素
                    //todo
                    //require 有init的方法就不需要remove掉js了

                    //var l_hash=ar.shift();//删除并返回第一个元素
                    //var j_hash=l_hash.hash;
                    // if(j_hash.indexOf("/")>-1){
                    //     j_hash=j_hash.split("/")[0];
                    // }
                    // var hl=w.hashs;
                    // for(var i in hl){
                    //     if(i==j_hash) $("script[data-requiremodule="+hl[i]+"]").remove()
                    // }

                }
                setTimeout(function(){
                    w.judHCa=true;
                },1)
            },
            resetFun:function(){//页面初始化或刷新执行
                w.addDom();
                w.stepLAdd("add");
                al.s_setItem("step_num",0);
            },
            addDom:function(){//根据hash引入不同页面的js
                var h= al.getHashVal();
                var hashs=w.hashs;
                var jc=false;
                var jc_hash="";
                var jc_js="";
                var jc_jsj="";
                for(var i in hashs){
                    if(i==h){
                        jc=true;
                        jc_hash=i;
                        jc_jsj=hashs[i];
                        jc_js=jc_jsj.html;
                    }
                }
                if(jc){
                    $("#all>section").removeClass("current");
                    al.qjLoading_show();
                    $(window).scrollTop(0);
                    if($("#all section").length>=w.pageL) $("#all section")[0].remove();
                    $("#all").append("<section class='current'></section>");
                    require([jc_js],function(init){
                        console.log(jc_hash+"页面 ok,"+jc_js+"[js] ok");
                        init.init_fun();
                    })
                    document.title=jc_jsj.title;
                }else{
                    //todo 404处理
                    alert("404：页面未找到");
                    al.qjLoading_hide();
                }
            },
        }
        w.step_list=[];
        w.judHCa=true;
        w.judExit=false;
        w.hashs=hash_pages;
        w.pageL=4;//默认记录4个页面的数据

        w.resetFun();//页面初次进入和刷新的时候调用初始化的方法

        window.addEventListener("hashchange", function(){//url改变事件
            if(w.judHCa){//w.judHCa 禁止replace后再执行
                w.judHCa=false;
                var h= al.getHashVal();
                var a= w.step_list;
                var b=a[1];
                if(b&&h==b.hash){//存在dom,删除
                    var l=$("#all section").length-1;
                    $("#all section")[l].remove();
                    var m=$("#all section").length-1;
                    al.addClass($("#all section")[m],"current");
                    var t= b.top;
                    $(window).scrollTop(t);
                    w.stepLAdd("min");
                }else{//不存在dom，新添加
                    w.addDom();
                    var n= al.s_getItem("step_num");
                    n++;
                    var lh= al.getVal_esid();
                    location.replace(lh+"/sid:"+n);
                    al.s_setItem("step_num",n);
                    w.stepLAdd("add");
                }
            }
        })

        //function event end
    })
})

require(["fastclick"],function(FastClick){//解决移动端点击的300ms延迟
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
})