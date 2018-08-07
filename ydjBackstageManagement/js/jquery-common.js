(function ($) {
    $.widget("custom.dropList", {//下拉可搜索的列表的插件
        options: {
            dropListz:[],
            key:"id",
            name:"name",
            inputName:"demo",
            width:"340px",
            input:true,
            appendId:"",
            appendFun:"",
            endFun:""
        },
        _create: function () {},
        _init: function () {
            var that=this.element;
            if(that.find("ul").length<1){
                that.prepend("<input type='hidden' name='"+this.options.inputName+"' value=''>");
                that.find(".dropList-top").css("width",this.options.width).append("<div><span>▼</span></div><input type='text'><ul></ul>");
            }
            if(!this.options.input) that.find(".dropList-top input[type='text']").hide();
            var liList=this.options.dropListz;
            var thatUl=that.find("ul");
            var liListId=this.options.key;
            var liListName=this.options.name;
            $.each(liList,function(index,value){
                var judgeExit=true;
                thatUl.find("li").each(function(){ if(value[liListId]==$(this).attr("data_id")) judgeExit=false;})
                if(judgeExit) thatUl.append("<li judgeD='"+value[liListName]+"' data_id='"+value[liListId]+"' onclick='dropListSelect($(this))'>"+value[liListName]+"</li>");
            })
            this._addEvent();
        },
        _addEvent:function(){
            var listId=this.options.appendId;
            var listFun=this.options.appendFun;
            var endFun=this.options.endFun;
            var that0=this;
            var that=this.element;
            var nowInput=that.find(".dropList-top input");
            var nowUl=that.find("ul");
            that.find(".dropList-con").click(function(e){
                that0._stopPropa(e);
                $(".dropList-top").hide();
                //that.find(".dropList-con").removeClass("ok");
                that.find(".dropList-top").show();
                that.find("input").focus();
            })
            nowInput.keyup(function(){
                var val=$(this).val();
                $(this).parent().find("ul li").hide().each(function(){
                    var judgeD=$(this).attr("judgeD");
                    if(judgeD.indexOf(val)>=0) $(this).show();
                })
            })
            nowInput.click(function(e){
                that0._stopPropa(e);
                return;
            })
            nowUl.find("li").click(function(){
                var html=$(this).html();
                var id=$(this).attr("data_id");
                if(html=="不填"){
                    html="";
                    that.find(".dropList-con").removeClass("ok");
                }else{
                    that.find(".dropList-con").addClass("ok");
                }
                that.find(".dropList-con").html(html).attr("dataSelectId",$(this).attr("data_id")).attr("title",html);
                if(listId!=""){
                    $("#"+listId).append("<li><label>"+html+"</label><span class='doorListDelete two sp'>×</span></li>");
                    if(listFun!="") listFun();
                }
                that.find("input[type='hidden']").val(id).attr("data_val",html);
                if(endFun!="") endFun();
                that0._refresh();
            })

            $("body").click(function(){ that0._refresh();})
        },
        destroy: function () { },
        _refresh:function(){
            var that=this.element;
            that.find(".dropList-top").hide();
            that.find(".dropList-top input").val("");
            that.find("ul li").show();
            this.destroy();
        },
        _stopPropa:function(e){ if (e.stopPropagation) e.stopPropagation(); else e.cancelBubble = true;}
    });

    $.widget("custom.fileUpload", {//图片上传
        options:{
            fun:""
        },
        _create: function () { this._addEvent();},
        _init: function () {},
        _addEvent:function(){
            var that0=this;
            var that=this.element;
            var thatP1=that.parent();
            var thatP2=that.parent().parent();
            var thatP3=that.parent().parent().parent();
            var limit=that.attr("limit");
            that.change(function(){
                if($(".importing_audio").length>0) $(".importing_audio").show();
                var file = $(this).prop("files");
                var fileLength=file.length;
                if(fileLength<1) return;
                for(var i=0;i<fileLength;i++){ file_change_fun(file[i]);}
                function file_change_fun(obj){
                    var file0=obj;
                    var formData = new FormData();
                    var columnName='img';
                    formData.append(columnName, file0);
                    formData.append("filetype", file0.type);
                    //将文件以Data URL形式读入页面,测试
                    //var reader = new FileReader();
                    //reader.readAsDataURL(file[0]);
                    //reader.onload=function(e){
                    //    if(that.hasClass("editImging")){
                    //        that.parent().parent().parent().find("img").attr("src",this.result);
                    //    }else{
                    //        $("<div class='flaotleft uploadImg'><img src='"+this.result+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div></div>").insertBefore(that.parent());
                    //    }
                    //    if(that.parent().parent().find(".uploadImg").length>=limit){
                    //        that.parent().hide();
                    //    }
                    //}
                    $.ajax({
                        type:'post',
                        url:cFunYdj.imgUploadUrl,
                        data:formData,
                        contentType: false,
                        processData: false,
                        dataType:'json',
                        success:function(data) {
                            if(data!=""){
                                var imgUrl=data.img;
                                var dataSrc=imgUrl.substring(0,imgUrl.lastIndexOf("/"))+"/artwork"+imgUrl.substring(imgUrl.lastIndexOf("/"));
                                var newData=JSON.stringify(data);
                                if(that.hasClass("editImging")){
                                    thatP3.find("img").attr({"src":dataSrc,"dataBefore":newData});
                                }else{
                                    if($(".userDefinHtmlPage").length>0&&$(".banner").css("display")=="block"||$(".distribution_banner").length>0&&$(".banner").css("display")=="block"||$(".newWeiChatIT").length>0&&$(".imgAdRight").css("display")=="block"||$(".newWeiChatIT").length>0&&$(".banner_l").css("display")=="block"){
                                        $("<div class='flaotleft uploadImg'><img src='"+dataSrc+"' dataBefore='"+newData+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div><input type='text' class='weiChatBlurs' forC='banner'></div>").insertBefore(thatP1);
                                    }else if($(".userDefinHtmlPage").length>0&&$(".banner1").css("display")=="block"){
                                        $("<div class='flaotleft uploadImg'><img src='"+dataSrc+"' dataBefore='"+newData+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div><input type='text' class='weiChatBlurs' forC='banner1'></div>").insertBefore(thatP1);
                                    }else if($(".userDefinHtmlPage").length>0&&$(".imgAdShow_banner").css("display")=="block"){
                                        $("<div class='flaotleft uploadImg'><img src='"+dataSrc+"' dataBefore='"+newData+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div><input type='text' class='weiChatBlurs' forC='imgAdShow_banner'></div>").insertBefore(thatP1);
                                    }else if($("#jfHome-li-lblFile").length>0&&$("#jfHome-li-lblFile").find(".jfUploadLayer").length<4) {
                                        $("<div class='jfUploadLayer flaotleft uploadImg flaotNone overflowIn marginBottom20 marginLeft20'><div class='limitW'><img src='"+dataSrc+"' databefore='"+newData+"'></div><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div><div class='right_jf'><div class='top'>设置超链接</div><input type='text' class='width358px'></div></div>").insertBefore($("#jfHome-li-lblFile .jfUploadLayer:last"));
                                    }else if($(".jfGoodsAddImg").length>0&&$(".jfGoodsAddImgLi").length>0){
                                        $("<div class='flaotleft uploadImg'><img src='"+dataSrc+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div></div>").insertBefore($(".jfGoodsAddImg"));
                                    }else if($("#goodsInfoImg").length>0&&$("#goodsInfoImg").find(".newUploadImg").length<4){
                                        $("<li class='newUploadImg'><div>待审核</div><img src='"+dataSrc+"' dataBefore='"+newData+"'><span class='deleteNewImg'>×</span></li>").insertBefore($("#goodsInfoImg .clear"));
                                    }else if($("#goodsInfoImg").length>0&&$("#goodsInfoImg").find(".newUploadImg").length==4){
                                        cFunYdj.alertMoni("已经添加4张图片了哦，不能贪多，我们会马不停蹄为你处理的~~");
                                        return;
                                    }else if($(".ul-goodsImg").length>0){
                                        $("<li><img src='"+dataSrc+"'><span class='goodsSelected'></span></li>").insertBefore(thatP2);
                                    }else if($(".imgUpload_imgShow").length>0){
                                        $(".imgUpload_imgShow").append("<div class='flaotleft uploadImg'><img src='"+dataSrc+"' dataBefore='"+newData+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div></div>");
                                    }else if(that.hasClass("audio_f")){
                                        thatP3.find("audio").remove();
                                        $("<audio src='"+dataSrc+"' controls='controls' style='width:300px;'></audio>").insertBefore(thatP3.find(".audio_con_fun"));
                                        thatP1.find("span").text("修改音频");
                                        thatP2.find(".deleteAudio").show();
                                        audioReset();
                                        $(".importing_audio").hide();
                                    }else if(that.hasClass("audio_img")){
                                        $(".audio_layer_main_img img").attr("src",dataSrc);
                                        audioReset();
                                    }else{
                                        $("<div class='flaotleft uploadImg'><img src='"+dataSrc+"' dataBefore='"+newData+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div></div>").insertBefore(thatP1);
                                    }
                                }
                                if(thatP2.find(".uploadImg").length>=limit) thatP1.hide();
                                if($(".newWeiChatIT").length>0&&$(".newWeiChatITs").length<1){
                                    $("#img").remove();
                                    $("<img id='img' src='"+$(".ul-contain-file img").attr("src")+"'>").insertBefore($(".newWeiChatITLeftMainLayerTop #textarea"));
                                }
                                if($(".newWeiChatITs").length>0) $(".littleWeiChatIT.on img").attr("src",dataSrc);

                                if($(".userDefinHtmlModel_main").length>0){
                                    var userDefinDom=$(".userDefin-liLayer.on");
                                    var dataClass=userDefinDom.attr("dataClass");
                                    var lsOnDom="";
                                    switch (dataClass){
                                        case "imgAd":lsOnDom="imgAdRight";break;
                                        case "banner_l":lsOnDom="banner_l";break;
                                        default :break;
                                    }
                                    if(lsOnDom!=""){
                                        var lsDomSwiper="<div class='imgAd_swiper'><div class='swiper-container swiper-container-imgAd'><div class='swiper-wrapper'>";
                                        $("."+lsOnDom+" .uploadImg").each(function(){
                                            var that=$(this);
                                            var lsUrl_swiper=that.find(".weiChatBlurs").val();
                                            if(lsUrl_swiper=="") lsUrl_swiper="javascript:;";
                                            lsDomSwiper=lsDomSwiper+"<div class='swiper-slide'><a href='"+lsUrl_swiper+"'><img src='"+that.find("img").attr("src")+"'></a></div>";
                                        })
                                        var lsClass="";
                                        var ls_liLayerM="<div class='liLayerMove'></div>";
                                        var ls_edit="<span class='action delete'>删除</span>";
                                        if($(".container_homeUserD").length>0){
                                            lsClass=" move_limit";
                                            ls_liLayerM="";
                                            ls_edit="";
                                        }
                                        userDefinDom.empty().append(lsDomSwiper+"</div><div class='swiper-pagination swiper-pagination0'></div></div></div><div class='userDefin-liLayerBorder"+lsClass+"'><div class='userDefin-liLayerFun'><span class='action edit'>编辑</span>"+ls_edit+"</div>"+ls_liLayerM+"</div>");
                                        if(userDefinDom.find(".swiper-slide").length>1){
                                            var swiper = new Swiper(userDefinDom.find('.swiper-container-imgAd'), {
                                                pagination: userDefinDom.find('.swiper-pagination'),
                                                paginationClickable: true,
                                                autoplay:"3000",
                                                autoplayDisableOnInteraction:false,
                                                spaceBetween: 0,
                                            });
                                        }
                                    }
                                    if($(".nav_a").css("display")=="block"){
                                        if(that.hasClass("edit_copy")) thatP3.replaceWith("<div class='flaotleft uploadImg'><img src='"+dataSrc+"'><div class='editImg'><label><input type='file' class='fileUpload editImging' limit='"+limit+"'>编辑</label><label class='editImgimgDelete'>删除</label></div></div>");
                                        reset_nav_main();
                                    }
                                }

                                if($(".userDefinHtmlPage").length>0&&$(".banner").css("display")=="block"){
                                    var lsDom="<div class='swiper-container index_scrolls'><div class='swiper-wrapper index_scrollss banner150'>";
                                    $(".banner .uploadImg").each(function(){
                                        var lsHref=$(this).find(".weiChatBlurs").attr("value");
                                        if(lsHref=="") lsHref="javascript:void(0);";
                                        lsDom=lsDom+"<div class='swiper-slide'><a href='"+lsHref+"'><img src='"+$(this).find("img").attr("src")+"'></a></div>";
                                    })
                                    lsDom=lsDom+"</div><div class='swiper-pagination swiper-pagination0'></div></div>";
                                    $(".cont-banner .swiper-container").replaceWith(lsDom);
                                    startSwiper();
                                }

                                if($(".distribution_banner").length>0&&$(".banner").css("display")=="block"){
                                    var lsDom="<div class='swiper-container'><div class='swiper-wrapper banner150'>";
                                    $(".banner .uploadImg").each(function(){
                                        var lsHref=$(this).find(".weiChatBlurs").attr("value");
                                        if(lsHref=="") lsHref="javascript:void(0);"
                                        lsDom=lsDom+"<div class='swiper-slide'><a href='javascript:;' hrefVal='"+lsHref+"'><img src='"+$(this).find("img").attr("src")+"'></a></div>";
                                    })
                                    lsDom=lsDom+"</div><div class='swiper-pagination swiper-pagination0'></div></div>";
                                    $(".cont-banner .swiper-container").replaceWith(lsDom);
                                    startSwiper();
                                }

                                if($(".userDefinHtmlPage").length>0&&$(".banner1").css("display")=="block"){
                                    var lsDom="<div class='swiper-container1 index_scrolls'><div class='swiper-wrapper index_scrollss banner150'>";
                                    $(".banner1 .uploadImg").each(function(){
                                        var lsHref=$(this).find(".weiChatBlurs").attr("value");
                                        if(lsHref=="") lsHref="javascript:void(0);"
                                        lsDom=lsDom+"<div class='swiper-slide'><a href='"+lsHref+"'><img src='"+$(this).find("img").attr("src")+"'></a></div>";
                                    })
                                    lsDom=lsDom+"</div><div class='swiper-pagination swiper-pagination1'></div></div>";
                                    $(".cont-banner1 .swiper-container1").replaceWith(lsDom);
                                    startSwiper1();
                                }

                                if($(".userDefinHtmlPage").length>0&&$(".imgAdShow_banner").css("display")=="block"){
                                    $(".imgAdShow img").attr("src",dataSrc);
                                    $(".imgAdShow a").attr("href","javascript:void(0);");
                                }

                                if($(".userDefinHtmlPage").length>0&&$(".layer1").css("display")=="block"){
                                    var lIndex=that.parent().parent().parent().parent().index();
                                    if(that.hasClass("editImging")) lIndex=that.parent().parent().parent().parent().parent().parent().index();
                                    $(".nav-options li:eq("+lIndex+") img").attr("src",dataSrc);
                                }

                                if($(".userDefinHtmlPage").length>0&&$(".layer2").css("display")=="block"){
                                    var lIndex=that.parent().parent().parent().parent().index();
                                    var dataClass;
                                    switch (lIndex){
                                        case 0:dataClass="nav-options-left";break;
                                        case 1:dataClass="nav-options-right-top";break;
                                        case 2:dataClass="nav-options-right-bottom-left";break;
                                        case 3:dataClass="nav-options-right-bottom-right";break;
                                        default:break;
                                    }
                                    $("."+dataClass+" img").attr("src",dataSrc);
                                }

                                if($(".userDefinHtmlPage").length>0&&$(".goodsLayer").css("display")=="block") rightGoodsReset();

                                if($(".memberCardCon").length>0){
                                    $(".memberCardCon_mwb").css("display","block");
                                    $(".memberCardCon").attr("style","background:url("+dataSrc+") no-repeat center;background-size:100% 100%;");
                                }

                                if($(".magicCube").length>0&&$(".magicCube").css("display")=="block"){
                                    $(".magicCube_controls .current").empty().append("<img src='"+dataSrc+"'>").click();
                                    resetMagicCubeImg();
                                }
                            }
                        },
                        fail:function(){
                            $(".importing_audio").hide();
                        },
                        error:function(){
                            cFunYdj.alertMoni("上传失败");
                            $(".importing_audio").hide();
                            return false;
                        }
                    })
                }
            })
        },
        _destroy: function () { },
        _stopPropa:function(e){
            if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
        }
    })

    $.widget("custom.getOrderState", {//获取订单状态
        options:{
            num:"",
            time:[]
        },
        _create: function () { this._addEvent();},
        _init: function () { },
        _addEvent:function(){
            var numArray=this.options.num.split("");
            var timeArray=this.options.time;
            var strDom="";
            var widthD="";
            switch(numArray.length){
                case 2:widthD="width600";break;
                case 3:widthD="width265";break;
                case 4:widthD="width153";break;
                case 5:widthD="width98";break;
                case 6:widthD="width64";break;
                default :break;
            }
            for(var i=0;i<numArray.length;i++){
                var con="";
                var ntime=timeArray[i].split(" ")[0]+"<br />"+timeArray[i].split(" ")[1];
                switch (numArray[i]){
                    case "1":con="买家已下单";break;case "2":con="买家已取消";break;case "3":con="待提货";break;case "4":con="买家已提货";break;case "5":con="待收货";break;case "6":con="买家已收货";break;case "7":con="待支付";break;case "8":con="买家已付款";break;case "9":con="待退款";break;case "a":con="退款成功";break;case "b":con="待退货";break;case "c":con="收到买家退货";break;case "d":con="买家已申请退货";break;case "e":con="买家已提货";break;case "f":con="买家已收货";break;case "g":con="买家已提货付款";break;
                    default :break;
                }
                var lsDom="<li class='gap "+widthD+"'></li><li><div class='name'>"+con+"</div><div class='imgBg'></div><div class='time'>"+ntime+"</div></li>";
                if(numArray[i]=="1") lsDom="<li><div class='name'>"+con+"</div><div class='imgBg'></div><div class='time'>"+ntime+"</div></li>";
                if(con.split("")[0]=="待") lsDom="<li class='gap "+widthD+" colorGb'></li><li><div class='name colorG'>"+con+"</div><div class='imgBg imgBgH'></div><div class='time'>"+ntime+"</div></li>";
                strDom=strDom+lsDom;
            }
            $(".orderState").html(strDom+"<div class='clear'> </div>");
            this._destroy();
        },
        _destroy: function () { },
        _stopPropa:function(e){ if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;}
    })

    $.widget("custom.colorSelect",{
        options:{
            colorArray:["#B4E9EF","#CFF8E6","#C876C2","#C697C3","#A6A3CE","#6469A9","#E6DED1","#ECA29F","#FA4A54","#76C08D","#E3A335","#B47941"],
            colorId:[],
            conName:"",
            conNameC:"",
            inputHiddenId:""
        },
        _create: function () { },
        _init: function () {
            var that=this.element;
            var colorId=this.options.colorId;
            var judgeColorId=false;
            if(colorId.length>0) judgeColorId=true;
            if(that.parent().find(".colorSelect").length==0){
                var colorA=this.options.colorArray;
                var tdDom="<tr>";
                for(var i=0;i<colorA.length;i++){
                    if(i!=0&&i%6==0&&i!=colorA.length-1) tdDom=tdDom+"</tr><tr>";
                    if(judgeColorId) tdDom=tdDom+"<td style='background-color:"+colorA[i]+";' colorSelect='"+colorA[i]+"' dataId='"+colorId[i]+"'></td>";else tdDom=tdDom+"<td style='background-color:"+colorA[i]+";' colorSelect='"+colorA[i]+"'></td>";
                    if(i==colorA.length-1) tdDom=tdDom+"</tr>";
                }
                that.parent().css("position","relative").append("<table class='colorSelect'></table>").find(".colorSelect").append(tdDom);
            }
            this._addEvent();
        },
        _addEvent:function() {
            var thiss=this;
            var that=this.element;
            var colorSelectDom=that.parent().find(".colorSelect");
            that.click(function(e){
                thiss._stopPropa(e);
                colorSelectDom.fadeIn();
            })
            colorSelectDom.find("td").click(function(){
                var colorValue=$(this).attr("colorSelect");
                var colorId=$(this).attr("dataId");
                if(thiss.options.inputHiddenId){
                    that.attr("value",colorValue);
                    $("#"+thiss.options.inputHiddenId).attr("value",colorValue);
                    $("#"+thiss.options.inputHiddenId).attr("dataId",colorId);
                }
                if(thiss.options.conName) $(thiss.options.conName).css("backgroundColor",colorValue);
                if(thiss.options.conNameC) $(thiss.options.conNameC).css("color",colorValue);
                that.css("backgroundColor",colorValue);
                colorSelectDom.fadeOut();
            })
            $("body").click(function(e){
                thiss._stopPropa(e);
                colorSelectDom.fadeOut();
            })
            thiss._destroy();
        },
        _destroy: function () { },
        _stopPropa:function(e){ if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;}
    })

    $.widget("custom.getStores",{
        options:{
            dropListz:[],
            key:"id",
            name:"name",
            appendId:""
        },
        _create: function () { },
        _init: function () {
            var that=this.element;
            that.prepend("<input type='hidden' name='"+this.options.inputName+"' value='"+that.find(".dropList-con").text()+"'>");
            that.find(".dropList-top").append("<ul></ul><div class='dropList-top-fun'><span class='dropList-top-funSure'>确定</span><span class='dropList-top-funCancel'>取消</span></div>");
            var liList=this.options.dropListz;
            var thatUl=that.find("ul");
            var liListId=this.options.key;
            var liListName=this.options.name;
            $.each(liList,function(index,value){ thatUl.append("<label title='"+value[liListName]+"'><li judgeD='"+value[liListName]+"' data_id='"+value[liListId]+"'><input type='checkbox'>"+value[liListName]+"</li></label>");})
            this._addEvent();
        },
        _addEvent:function() {
            var that0=this;
            var that=this.element;
            var appendId=this.options.appendId;
            that.find(".dropList-con").click(function(e){
                that0._stopPropa(e);
                $(".dropList-top").hide();
                that.find(".dropList-top").show();
            })
            that.find(".dropList-top-funSure").click(function(){
                var hideValue="";
                that.find("input[type='checkbox']").each(function(){
                    if($(this).attr("checked")=="checked"){
                        if(that0.options.appendId!="") $(appendId).append("<li title='"+$(this).parent().text()+"'><label data_id='"+$(this).parent().attr("data_id")+"'>"+$(this).parent().text()+"</label><span class='doorListDelete two sp'>×</span></li>");
                        hideValue=hideValue+$(this).parent().attr("data_id")+",";
                    }
                })
                that.find("input[type='hidden']").val(hideValue);
                that0._refreth();
            })
            that.find(".dropList-top-funCancel").click(function(){ that0._refreth();})
            that.find("label").click(function(e){ that0._stopPropa(e);})
            $("body").click(function(){ that0._refreth();})
        },
        _refreth:function(){
            var that=this.element;
            that.find(".dropList-top").hide();
            that.find(".dropList-top input[type='checkbox']").removeAttr("checked");
            this._destroy();
        },
        _destroy: function () {},
        _stopPropa:function(e){ if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;}
    })

    $.widget("custom.getGoods",{
        options:{
            dropListz:[],
            key:"id",
            name:"name",
            goodsLayer:"goods",
            goodsList:[],
            appendId:"",
            appendFun:"",
            appendDom:"",
            judgeIdExist:"",
            selectgroupFun:"",
            endFun:""
        },
        _create: function () {},
        _init: function () {
            var that=this.element;
            var that0=this;
            var thatp=that.parent();
            var groupList=this.options.dropListz;
            var goodsList=this.options.goodsList;
            var goodsLayer=this.options.goodsLayer;
            var groupId=this.options.key;
            var groupName=this.options.name;
            var selectgroupFun = this.options.selectgroupFun;
            var nGroupSelFun=that0.options.nGroupSelFun;
            cFunction_resetSecond=nGroupSelFun;
            if($(".chooseGoods").length<=0){
                var chooseGoodsDom="<div class='inputBg'></div><div class='addStoreGroup chooseGoods'><div class='positionRe'><div class='nGroupSel_bg'></div><div class='storeGroupHeader'>选择商品<div class='storeGroupHeaderPos'><label class='input'><input type='text' id='searchFloat' class='mid-textinput labelInput' placeholder='名称/编码/厂家/品牌/条形码'><img src='static/img/sc.png'></label></div></div><ul class='addStoreGroupMain'></ul><div class='addStoreFun'><label class='allSelect storeGroupAllSelect'><input type='checkbox'>全选</label><div class='pager'><a href='javascript:void(0)' class='lastPager'>上一页</a><a href='javascript:void(0)' class='nowPager'>第1页</a><a href='javascript:void(0)' class='nextPager'>下一页</a>共100页 共100条，跳转至<input type='text' class='pagerInput'>页<a href='javascript:void(0)' class='toPager'>确定</a></div><span class='forSure chooseGroupFun'>确定</span><span class='cancel chooseGroupFun'>取消</span></div></div></div>";
                if(goodsLayer=="stores"){
                    chooseGoodsDom="<div class='inputBg'></div><div class='addStoreGroup chooseGoods'><div class='positionRe'><div class='storeGroupHeader'>选择门店<div class='storeGroupHeaderPos'><label class='input'><input type='text' id='searchFloat' class='mid-textinput labelInput' placeholder='请输入门店名称或编码'><img src='static/img/sc.png'></label></div></div><ul class='addStoreGroupMain'></ul><div class='addStoreFun'><label class='allSelect storeGroupAllSelect'><input type='checkbox'>全选</label><div class='pager'><a href='javascript:void(0)' class='lastPager'>上一页</a><a href='javascript:void(0)' class='nowPager'>第1页</a><a href='javascript:void(0)' class='nextPager'>下一页</a>共100页 共100条，跳转至<input type='text' class='pagerInput'>页<a href='javascript:void(0)' class='toPager'>确定</a></div><span class='forSure chooseGroupFun'>确定</span><span class='cancel chooseGroupFun'>取消</span></div></div></div>";
                }
                $(chooseGoodsDom).insertBefore(that);
            }
            thatp.find(".storeGroup_group").remove();
            if(groupList!=""){
                if(goodsLayer=="goods"){
                    $("<div class='storeGroup_group'><div class='nGroupSel'><div class='dropList paddingTop8'><div class='nGroupSelMain'><div><span>▼</span></div><div class='nGroupSelMain_ul'><ul class='flaotleft nGroup_first'></ul><ul class='flaotleft nGroup_second'></ul><div class='clear'> </div></div></div><div class='dropList-con width148' title='选择分组'>选择分组</div></div><ul class='nGroupSelMainRes'><div class='clear'> </div></ul><div class='clear'> </div></div><div class='storeGroup_group_down' otherS='▲'>▼</div><div class='storeGroup_group_search'>筛选</div></div>").insertAfter($(".chooseGoods .storeGroupHeader"));
                    $.each(groupList,function(index,value){
                        var child=value["child"];
                        var lsDom="";
                        if(child.length>0) lsDom="<li data_id='"+value[groupId]+"' data_value='"+JSON.stringify(child)+"' dataChecked='' dataCheckedValue=''><label>"+value[groupName]+"</label></li>";else lsDom="<li data_id='"+value[groupId]+"' data_value='noMsg' dataChecked='' dataCheckedValue=''><label><input type='checkbox' onclick='inputCheckBindClick($(this),1)'><span>"+value[groupName]+"</span></label></li>";
                        thatp.find(".storeGroup_group .nGroupSelMain_ul .nGroup_first").append(lsDom);
                    })

                    thatp.find(".storeGroup_group .nGroupSelMain_ul .nGroup_first li").hover(function(){
                        var lsThat=$(this);
                        var nlsJson=lsThat.attr("data_value");
                        var addLsDom=thatp.find(".storeGroup_group .nGroupSelMain_ul .nGroup_second");
                        addLsDom.hide();
                        if(nlsJson!="noMsg"){
                            addLsDom.css("height",parseInt(thatp.find(".storeGroup_group .nGroupSelMain_ul .nGroup_first").height())+5).empty().show().attr("dataBId",lsThat.attr("data_id"));
                            var nlsJsons=cFunYdj.strToJson(nlsJson);
                            var nlsArray=lsThat.attr("dataChecked");
                            var nLsArrays=[];
                            if(nlsArray!="") nlsArray=nlsArray+",";
                            if(nlsArray.indexOf(",")>-1) nLsArrays=nlsArray.split(",");
                            $.each(nlsJsons,function(index,value){
                                var nlsDom="<li data_id='"+value[groupId]+"' data_value='noMsg'><label><input type='checkbox' onclick='inputCheckBindClick($(this),2)'><span>"+value[groupName]+"</span></label></li>";
                                for(var j=0;j<nLsArrays.length;j++){ if(nLsArrays[j]==value[groupId]) nlsDom="<li data_id='"+value[groupId]+"' data_value='noMsg'><label><input type='checkbox' checked='checked' onclick='inputCheckBindClick($(this),2)'><span>"+value[groupName]+"</span></label></li>";}
                                addLsDom.append(nlsDom);
                            })
                        }
                    },function(){});

                }else if(goodsLayer=="stores"){
                    $("<div class='storeGroup_group'>门店分组<ul></ul><div class='storeGroup_group_down' otherS='▲'>▼</div><div class='storeGroup_group_search'>筛选</div></div>").insertAfter($(".chooseGoods .storeGroupHeader"));
                    $.each(groupList,function(index,value){ thatp.find(".storeGroup_group ul").append("<li data_id='"+value[groupId]+"'>"+value[groupName]+"</li>");})
                }
                thatp.find(".storeGroup_group_down").click(function(e){
                    that0._stopPropa(e);
                    var nhtml=$(this).html();
                    var nother=$(this).attr("others");
                    $(this).html(nother);
                    $(this).attr("others",nhtml);
                    thatp.find(".storeGroup_group>ul,.nGroupSelMainRes").toggleClass("heightAuto");
                })
                
                var myTimeout = null;
                thatp.find(".storeGroup_group>ul>li").click(function(e){
                    that0._stopPropa(e);
                    $(this).toggleClass("on");
                    clearTimeout(myTimeout);
                    if(selectgroupFun!="") myTimeout = setTimeout(function(){selectgroupFun();}, 1500);
                })

                thatp.find(".nGroupSel .dropList-con").click(function(){ $(".nGroupSelMain,.nGroupSel_bg").show();})

                thatp.find(".nGroupSel_bg,.nGroupSelMain div:first").click(function(){
                    $(".nGroupSelMain,.nGroupSel_bg").hide();
                    if(nGroupSelFun) nGroupSelFun();
                    var lsDomAll="";
                    $(".nGroup_first>li").each(function(){
                        var lsThat=$(this);
                        var dataChecked=lsThat.attr("dataChecked");
                        var dataCheckedValue=lsThat.attr("dataCheckedValue");
                        if(dataChecked!=""){
                            var lsDoms="";
                            var dataCheckedArray=dataChecked;
                            var dataCheckedValueArray=dataCheckedValue;
                            if(dataChecked.indexOf(",")>-1){
                                dataCheckedArray=dataChecked.split(",");
                                dataCheckedValueArray=dataCheckedValue.split(",");
                                for(var i=0;i<dataCheckedArray.length;i++){ lsDoms=lsDoms+"<li dataPId='"+lsThat.attr("data_id")+"' data_id='"+dataCheckedArray[i]+"'>"+dataCheckedValueArray[i]+"<span class='nGroupSelMainRes_close' onclick='resetSecondClass($(this))'>×</span></li>";}
                            }else{
                                lsDoms="<li dataPId='"+lsThat.attr("data_id")+"' data_id='"+dataCheckedArray+"'>"+dataCheckedValueArray+"<span class='nGroupSelMainRes_close' onclick='resetSecondClass($(this))'>×</span></li>";
                            }
                            lsDomAll=lsDomAll+lsDoms;
                        }
                    })
                    $(".nGroupSelMainRes").empty().append(lsDomAll+"<div class='clear'> </div>");
                })
            }else{
                thatp.find(".chooseGoods .addStoreGroupMain").css("margin-top","10px");
            }
            thatp.find(".addStoreGroupMain").empty();
            if(goodsLayer=="goods"){
                thatp.find(".addStoreGroupMain").append("<li class='layer layerHeader'><ul><li class='storeGroup_checkbox'></li><li class='storeGroup_img'>图片</li><li class='storeGroup_name'>名称</li><li class='storeGroup_standard'>规格</li><li class='storeGroup_coding'>编码</li><li class='storeGroup_production'>生产厂家</li><div class='clear'></div></ul></li><div class='dataLoading'><img src='static/img/loading.gif'>数据加载中……</div>");
                if(goodsList!=""){
                    $.each(goodsList,function(index,value){
                        thatp.find(".addStoreGroupMain").append("<li class='layer' data_id='"+value.productCode+"'  onclick='layerCheckSelect($(this))'><ul><li class='storeGroup_checkbox'><input type='checkbox' onclick='inputCheckBindClick($(this))'></li><li class='storeGroup_img'><img src='"+cFunYdj.judgeGetPictureUrl(value.mainPicture)+"'></li><li class='storeGroup_name' title='"+value.goodsName+"'>"+value.goodsName+"</li><li class='storeGroup_standard' title='"+value.goods_standard+"'>"+value.goods_standard+"</li><li class='storeGroup_coding' title='"+value.platformgoodscode+"'>"+value.platformgoodscode+"</li><li class='storeGroup_production' title='"+value.manufacturing_enterprise+"'>"+value.manufacturing_enterprise+"</li><div class='clear'> </div></ul></li>");
                    })
                }
            }else if(goodsLayer=="stores"){
                thatp.find(".addStoreGroupMain").append("<li class='layer layerHeader'><ul><li class='storeGroup_checkbox'></li><li class='storeGroup_img'>图片</li><li class='storeGroup_coding'>编码</li><li class='storeGroup_production'>名称</li><li class='storeGroup_line'></li><div class='clear'> </div></ul></li><div class='dataLoading'><img src='static/img/loading.gif'>数据加载中……</div>");
                if(goodsList!=""){
                    $.each(goodsList,function(index,value){
                        thatp.find(".addStoreGroupMain").append("<li class='layer' data_id='"+value.storeid+"'  onclick='layerCheckSelect($(this))'><ul><li class='storeGroup_checkbox'><input type='checkbox' onclick='inputCheckBindClick($(this))'></li><li class='storeGroup_img'><img src='"+value.pictures+"'></li><li class='storeGroup_coding' title='"+value.storecode+"'>"+value.storecode+"</li><li class='storeGroup_production' title='"+value.storename+"'>"+value.storename+"</li><li class='storeGroup_line'></li><div class='clear'> </div></ul></li>");
                    })
                }
            }
            this._addEvent();
        },
        _addEvent:function() {
            var that=this.element;
            var that0=this;
            var thatp=that.parent();
            var listStyle=that0.options.listStyle;
            $(".inputBg,.chooseGoods").fadeIn();
            that.click(function(){ $(".inputBg,.chooseGoods").fadeIn();})
            $("body").click(function(){ thatp.find(".storeGroup_group ul").removeClass("heightAuto");})
            thatp.find(".allSelect input[type='checkbox']").click(function(e){
                that0._stopPropa(e);
                var lsThat=$(this);
                setTimeout(function(){
                    if(lsThat.attr("checked")=="checked"){
                        lsThat.parent().parent().parent().find("input[type='checkbox']").removeAttr("checked");
                        lsThat.removeAttr("checked");
                    }else{
                        lsThat.parent().parent().parent().find("input[type='checkbox']").attr("checked","checked");
                        lsThat.attr("checked","checked");
                    }
                },100);
            })
            thatp.find(".addStoreFun .cancel").click(function(e){
                that0._stopPropa(e);
                thatp.find(".inputBg,.chooseGoods").fadeOut();
                that0._refresh();
                that0._destroy();
            });

            thatp.find(".addStoreFun .forSure").click(function(e){
                that0._stopPropa(e);
                var listId=that0.options.appendId;
                var listFun=that0.options.appendFun;
                var goodsLayer=that0.options.goodsLayer;
                var listDom=that0.options.appendDom;
                var judgeIdExist=that0.options.judgeIdExist;
                thatp.find(".addStoreGroupMain .layer").each(function(){
                    if($(this).find("input[type='checkbox']").attr("checked")=="checked"){
                        if(listId!=""){
                            if(goodsLayer=="goods"){
                                var judgeE=false;
                                var judgeId=$(this).attr("data_id");
                                if(judgeIdExist!="") listDom.find(">li").each(function(){ if($(this).attr("data_id")==judgeId) judgeE="exist";})
                                if(judgeE!="exist") if(listStyle=="2") $("<li data_id='"+$(this).attr("data_id")+"'><img src='"+$(this).find(".storeGroup_img img").attr("src")+"'><p class='p-list name' title='"+$(this).find(".storeGroup_name").text()+"'>"+$(this).find(".storeGroup_name").text()+"</p><span class='selected-delete' onclick='deleteGoodsList_center($(this))'>×</span></li>").insertBefore(("#"+listId+" .selectGoodsExitLi"));else $("#"+listId).append("<li data_id='"+$(this).attr("data_id")+"'><label>"+$(this).find(".storeGroup_name").text()+"</label><span class='doorListDelete two sp'>×</span></li>");
                            }else if(goodsLayer=="stores"){
                                var judgeE=false;
                                var judgeId=$(this).attr("data_id");
                                if(judgeIdExist!="") listDom.find("li").each(function(){ if($(this).attr("data_id")==judgeId) judgeE="exist";})
                                if(judgeE!="exist"){
                                    var lsDom="<li data_id='"+$(this).attr("data_id")+"'><p class='flaotleft' title='"+$(this).find(".storeGroup_production").text()+"'>"+$(this).find(".storeGroup_production").text()+"</p>&nbsp;&nbsp;<label class='flaotleft font-color-white font-size-shisi doorListDelete two'>×</label><div class='clear'> </div></li>";
                                    if(listDom.attr("id")=="storeList") lsDom="<li data_id='"+judgeId+"'><label>"+$(this).find(".storeGroup_production").text()+"</label><span class='doorListDelete two sp'>×</span></li>";
                                    if(listDom.attr("id")=="storeListadd") lsDom="<li data_id='"+judgeId+"' class='li-container-right font-color-liu'>"+$(this).find(".storeGroup_production").text()+"<a class='font-color-blue  nonevisibility doorListDelete two'>删除</a></li>";
                                    if(listDom.find(".clear").length>0) $(lsDom).insertBefore(listDom.find(".clear:last"));else listDom.append(lsDom+"<div class='clear'> </div>");
                                }
                            }
                            if(listFun!="") listFun();
                        }
                    }
                })
                that0._refresh();
            });
            if(this.options.endFun!="") this.options.endFun();
        },
        _refresh:function(){
            var that=this;
            this.element.parent().find(".inputBg,.chooseGoods").fadeOut();
            setTimeout(function(){
                $(".chooseGoods,.inputBg").remove();
                that._destroy();
            },300)
        },
        _destroy: function () { },
        _stopPropa:function(e){ if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;}
    })

    $.widget("custom.getMsgChoose",{
        options:{
            type:"",
            cArray:[],
            appendId:""
        },
        _create: function () {},
        _init: function () {
            var that=this;
            var dataName=that.options.type;
            var dataArray=that.options.cArray;
            var cDom="";
            for(var i=0;i<dataArray.length;i++){ cDom=cDom+"<li>"+dataArray[i]+"</li>";}
            $("body").append("<div class='couponMsgShow'><div class='conponMsgShowHeader'><div class='couponMsgShowName'>设置"+dataName+"信息</div><div class='closeCouponMsg'>×</div><div class='clear'> </div></div><div class='couponMsgShowCenter'><div class='couponMsgShowLayer couponMsgShowLayerL'><div><div class='couponMsgShowLayerLname'>请选择选填信息</div><ul>"+cDom+"</ul></div></div><div class='couponMsgShowLayerC'><span class='couponMsgLayerCd'>添加</span></div><div class='couponMsgShowLayer couponMsgShowLayerR'><div><div class='couponMsgShowLayerLname'>"+dataName+"信息</div><ul></ul></div></div><div class='clear'> </div></div><div class='couponMsgShowFooter'><span class='couponMsgShowSure'>确定</span></div></div>");
            $(".couponMsgShow,.inputBg").fadeIn();
            this._addEvent();
        },
        _addEvent:function() {
            var that=this;
            var thatE=this.element;
            var appendId=that.options.appendId;
            $(".couponMsgLayerCd").click(function(){
                var leftOnDom=$(".couponMsgShowLayerL li.on");
                var lsADom="";
                leftOnDom.each(function(){ lsADom=lsADom+"<li><span class='name'>"+$(this).text()+"</span><span class='close' onclick='cFunYdj.deleteParentN($(this))'>×</span></li>";})
                $(".couponMsgShowLayerR ul").empty().append(lsADom);
            })

            $(".couponMsgShowLayerL li").click(function(){ $(this).toggleClass("on");})

            $(".closeCouponMsg").click(function(){ that._refreth();})

            $(".couponMsgShowSure").click(function(){
                var lsLiDom="";
                var appendDom=$("#"+appendId);
                $(".couponMsgShowLayerR li").each(function(){
                    var lsSpanT=$(this).find(".name").text();
                    var appendJ=true;
                    appendDom.find("li").each(function(){ if($(this).find(".name").text()==lsSpanT) appendJ=false;})
                    if(appendJ) lsLiDom=lsLiDom+"<li><span class='name'>"+lsSpanT+"</span><span class='close' onclick='cFunYdj.deleteParentJ($(this))'>×</span></li>";
                })
                appendDom.append(lsLiDom);
                that._refreth();
            })

        },
        _refreth:function(){
            var that=this;
            $(".couponMsgShow,.inputBg").fadeOut();
            setTimeout(function(){
                $(".couponMsgShow").remove();
                that._destroy();
            },300);
        },
        _destroy: function () {},
        _stopPropa:function(e){ if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;}
    })
    $.widget("custom.getArcCanvas",{
        options:{
            canvas:"myCanvas",
            bgColor:"#DBD8D3",
            arcColor:"#DF003C",
            maxValue:"75",
            x : 50,
            y : 50,
            r : 40
        },
        _create: function () {},
        _init: function () {
            var canvasS=this.element.attr("id");
            var x=this.options.x;
            var y=this.options.y;
            var r=this.options.r;
            var bgColor=this.options.bgColor;
            var arcColor=this.options.arcColor;
            var arcLine=this.options.arcLine;

            var maxValue;
            var judgeStyle=this.options.judgeStyle;
            if(judgeStyle=="time"){
                var startTime=this.options.timeStart;
                var endTime=this.options.timeEnd;
                var eTy=endTime.split("/")[0];
                var eTm=endTime.split("/")[1];
                var eTr=endTime.split("/")[2];
                var date=new Date();
                var dTy=date.getFullYear();
                var dTm=date.getMonth()+1;
                var dTr=date.getDate();
                if(dTy>eTy||(dTy==eTy&&dTm>eTm)||(dTy==eTy&&dTm==eTm&&dTr>eTr)){
                    maxValue=100;
                }else{
                    var objInterval = {'D' : 1000 * 60 * 60 * 24, 'H' : 1000 * 60 * 60, 'M' : 1000 * 60, 'S' : 1000, 'T' : 1};
                    var dt1 = Date.parse(startTime);
                    var dt2 = Date.parse(endTime);
                    var dt3=Date.parse(dTy+"/"+dTm+"/"+dTr);
                    maxValue=((((dt3 - dt1) / objInterval["D"])/((dt2 - dt1) / objInterval["D"]))*100).toFixed(0);
                }
            }else if(judgeStyle=="number"){
                var numStart=this.options.numStart;
                var numEnd=this.options.numEnd;
                maxValue=(numEnd/numStart*100).toFixed(0);
                if(maxValue>100) maxValue=100;
            }
            $("#"+canvasS).parent().find(".perC").text(maxValue+"%");;

            var canvasBg = document.getElementById(canvasS+"Bg");
            try{
                var ctxBg = canvasBg.getContext("2d");
                ctxBg.clearRect(0,0,canvasBg.width,canvasBg.height);
                ctxBg.beginPath();
                ctxBg.strokeStyle = bgColor;
                ctxBg.lineWidth = arcLine;
                var circle = {
                    x : x,
                    y : y,
                    r : r
                };
                ctxBg.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
                ctxBg.stroke();

                var timeP;
                var bfb=0;
                drawPro();
                function drawPro(){
                    addCanvas(canvasS,bfb);

                    timeP=setTimeout(function(){ drawPro();},5);

                    if(bfb>=maxValue){
                        clearTimeout(timeP);
                        bfb=0;
                        return;
                    }
                    bfb+=1;
                }

                function addCanvas(myc,per){
                    var canvas = document.getElementById(myc);
                    try{
                        var ctx = canvas.getContext("2d");
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        ctx.beginPath();
                        ctx.strokeStyle = arcColor;
                        ctx.lineWidth = arcLine;
                        var circle = {
                            x : x,
                            y : y,
                            r : r
                        };
                        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * per/50, false);
                        ctx.stroke();
                    }catch(e){}
                }
                this._destroy();
            }catch(e){}},
        _destroy: function () {}
    })

    $.widget("custom.getLineShow",{
        options:{
            dataObj:{}
        },
        _create: function () {},
        _init: function () {
            var that=this;
            var thate=this.element;
            var dataObj=that.options.dataObj;
            var dataObj_dataArray=[];
            var dataObjLength=dataObj.length;
            var addDom=thate.find(".posDataShow ul");

            for(var i=0;i<dataObj.length;i++){ dataObj_dataArray.push(parseInt(dataObj[i].data));}

            var maxData=that._maopaoOrder(dataObj_dataArray);
            var maxRealData=that._getNewValue(maxData);

            var liOnArray=[];
            if(dataObjLength<=7){
                for(var i=0;i<dataObjLength;i++){ liOnArray.push(i);}
            }else{
                var firstVal=(dataObjLength-1)%4;
                var secondVal=(dataObjLength-1)%5;
                var thirdVal=(dataObjLength-1)%6;
                var minVal=5;
                if(firstVal<=secondVal) minVal=5; else if(secondVal<=thirdVal) minVal=6;else minVal=7;
                var judgeCData=parseInt((dataObjLength+1)/minVal);
                var dataSrart=0;
                liOnArray.push(dataSrart);
                for(var i=1;i<minVal;i++){
                    dataSrart=dataSrart+judgeCData;
                    liOnArray.push(dataSrart);
                }
            }

            addDom.empty().append("<div class='clear'> </div>");

            var lsSinLiWidth=800/(dataObjLength-1);
            if(dataObjLength==1) lsSinLiWidth=800;
            var judgeLsTimeS=0;
            var judgeLsTimeSi=0;
            for(var i=0;i<dataObjLength;i++){
                var marL=0;
                var jClass="off";
                var judgeOF="judgeOn";
                if(i==judgeLsTimeS){
                    jClass="on";
                    judgeLsTimeSi++;
                    judgeLsTimeS=liOnArray[judgeLsTimeSi];
                    if(dataObj_dataArray[i]==0) judgeOF="judgeOff";
                }
                if(i==0&&dataObjLength!=1) marL=-lsSinLiWidth/2;
                var topValue=250-(dataObj_dataArray[i]/maxRealData*250)-4+50;
                $("<li class='"+jClass+" "+judgeOF+"' style='width:"+lsSinLiWidth+"px;margin-left:"+marL+"px'><div class='liMain'><span class='floatLineBorder'></span><div class='floatPoint point' style='top:"+topValue+"px;' datas='"+dataObj_dataArray[i]+"'></div><div class='bottomPoint point'></div><div class='bottomTime'>"+dataObj[i].time+"</div></div></li>").insertBefore(thate.find(".posDataShow ul .clear"));
            }

            var singleArray=[];
            thate.find(".posDataShow ul li").each(function(){
                var that=$(this);
                var imgDom=that.find(".floatPoint");
                var cleft=95+lsSinLiWidth*that.index();
                var ctop=parseFloat(imgDom.css("top").split("px")[0])+4;
                singleArray.push({
                    "left":cleft,
                    "top":ctop
                })
            })

            thate.find(".floatLine").remove();
            var timeLine=1/dataObjLength;
            for(var i=0;i<singleArray.length;i++){
                if(i!=singleArray.length-1){
                    var j=i+1;
                    var angle=that._getAngle(singleArray[i],singleArray[j]);
                    var divW=Math.sqrt(Math.pow((singleArray[j].top-singleArray[i].top),2)+Math.pow((singleArray[j].left-singleArray[i].left),2));
                    that._addDom0(thate,singleArray,angle,divW,i,timeLine,timeLine*i);
                }
            }

            var setTimeShow;
            $(".posDataShow li").hover(function(){
                var that=$(this);
                var spand=that.find(".floatPoint");
                if(spand.length<1) return;
                var newLeft=parseInt(spand.offset().left-$(".posDataShow").offset().left-77)+"px";
                var thatH=parseInt(spand.css("top"));
                var lsTime=that.find(".bottomTime").text();
                var nTime=lsTime.split("-")[0]+"/"+lsTime.split("-")[1]+"/"+lsTime.split("-")[2];
                var lsDay=new Date(nTime).getDay();
                var lsWeek="日";
                switch (lsDay){
                    case 0:lsWeek="日";break;case 1:lsWeek="一";break;case 2:lsWeek="二";break;case 3:lsWeek="三";break;case 4:lsWeek="四";break;case 5:lsWeek="五";break;case 6:lsWeek="六";break;
                }
                $(".floatDaTa .time").text(lsTime+" 星期"+lsWeek);
                $(".floatDaTa .date").text("当前销售额："+spand.attr("datas"));
                $(".floatDaTa").css({"left":newLeft,"top":thatH-75+"px","opaticy":"0"}).fadeIn();
                clearTimeout(setTimeShow);
            },function(){
                setTimeShow=setTimeout(function(){ $(".floatDaTa").fadeOut();},1500);
            })

            this._destroy();
        },
        _getNewValue:function(data){
            var thate=this.element;
            var maxValue=5000*(parseInt(data/5000)+1);
            for(var i=6;i>1;i--){
                var j=i-2;
                thate.find(".pos1"+i).text(maxValue/5*(5-j));
            }
            return maxValue;
        },
        _getAngle:function(start,end){
            var diff_x = end.left - start.left,
                diff_y = end.top - start.top;
            return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
        },
        _addDom0:function(ppDom,singleArray,angle,divW,i,k,j){
            var lsId=(new Date()).getTime()+i;
            var lsDom="<div class='floatLine' id='"+lsId+"' style='left:"+singleArray[i].left+"px;top:"+singleArray[i].top+"px;width:"+0+"px;transform:rotate("+angle+"deg);-webkit-transform:rotate("+angle+"deg);'></div>";
            ppDom.find(".dataShowLineChart").append(lsDom);
            setTimeout(function(){ $("#"+lsId).css({"width":divW+0.4+"px","transition":"width "+k+"s linear "+j+"s"});},50)
        },
        _maopaoOrder:function(obj){
            var maxValue=obj[0];
            for(var i=0;i<obj.length;i++){
                var j=i+1;
                for(j;j<obj.length;j++){ if(obj[j]>maxValue) maxValue=obj[j];}
            }
            return maxValue;
        },
        _destroy: function () {}
    })

})(jQuery);


function storeGroup_pager(storeGroup_goodsJson){//点击分页的传入数据的方法(商品)
    $(".addStoreGroupMain .layer").each(function(){ if(!$(this).hasClass(".layerHeader")) if($(this).find("input[type='checkbox']").length>0&&$(this).find("input[type='checkbox']").attr("checked")!="checked") $(this).remove();})
    if(storeGroup_goodsJson!=null && storeGroup_goodsJson!=""){
        $.each(storeGroup_goodsJson,function(index,value){
            $(".addStoreGroupMain").append("<li class='layer' data_id='"+value.productCode+"' onclick='layerCheckSelect($(this))'><ul><li class='storeGroup_checkbox'><input type='checkbox' onclick='inputCheckBindClick($(this))'></li><li class='storeGroup_img'><img src='"+cFunYdj.judgeGetPictureUrl(value.mainPicture)+"'></li><li class='storeGroup_name' title='"+value.goodsName+"'>"+value.goodsName+"</li><li class='storeGroup_standard' title='"+value.goods_standard+"'>"+value.goods_standard+"</li><li class='storeGroup_coding' title='"+value.platformgoodscode+"'>"+value.platformgoodscode+"</li><li class='storeGroup_production' title='"+value.manufacturing_enterprise+"'>"+value.manufacturing_enterprise+"</li><div class='clear'> </div></ul></li>");
        })
    }
}

function storesGroup_pager(storeGroup_goodsJson){//点击分页的传入数据的方法(门店)
    $(".addStoreGroupMain .layer").each(function(){ if(!$(this).hasClass(".layerHeader")) if($(this).find("input[type='checkbox']").length>0&&$(this).find("input[type='checkbox']").attr("checked")!="checked") $(this).remove();})
    if(storeGroup_goodsJson!=null && storeGroup_goodsJson!=""){
        $.each(storeGroup_goodsJson,function(index,value){
            $(".addStoreGroupMain").append("<li class='layer' data_id='"+value.storeid+"'  onclick='layerCheckSelect($(this))'><ul><li class='storeGroup_checkbox'><input type='checkbox' onclick='inputCheckBindClick($(this))'></li><li class='storeGroup_img'><img src='"+value.pictures+"'></li><li class='storeGroup_coding' title='"+value.storecode+"'>"+value.storecode+"</li><li class='storeGroup_production' title='"+value.storename+"'>"+value.storename+"</li><li class='storeGroup_line'></li><div class='clear'> </div></ul></li>");
        })
    }
}

function layerCheckSelect(obj){//通用的layer点击当下的checkbox选中的方法
    if(obj.find("input[type='checkbox']").attr("checked")=="checked") obj.find("input[type='checkbox']").removeAttr("checked");else obj.find("input[type='checkbox']").attr("checked","checked");
}

function dropList_dataRefresh(dataJson,key,name,obj,otherJson){//下拉列表的更新数据方法（全局）
    obj.find(".dropList-top ul").empty();
    var lsOtherJson="";
    if(otherJson) lsOtherJson=JSON.stringify(otherJson);
    $.each(dataJson,function(index,value){ obj.find(".dropList-top ul").append("<li judgeD='"+value[name]+"' data_id='"+value[key]+"' data_otherJson='"+lsOtherJson+"' onclick='dropListSelect($(this))'>"+value[name]+"</li>");})
}

function dropListSelect(obj){
    var that=obj.parent().parent().parent();
    var html=obj.html();
    var id=obj.attr("id");
    if(html=="不填"){
        html="";
        that.find(".dropList-con").removeClass("ok");
    }else{
        that.find(".dropList-con").addClass("ok");
    }
    that.find(".dropList-con").html(html).attr("dataSelectId",obj.attr("data_id"));
    that.find("input[type='hidden']").val(obj.attr("data_id"));
}

function inputCheckBindClick(obj,data){
    var data1=false;
    var data2=false;
    if(data==1) data1=true;
    if(data==2) data2=true;
    if(data2){
        var dataBId=obj.parent().parent().parent().attr("dataBId");
        var dataThisId=obj.parent().parent().attr("data_id");
        var leftDom=$(".nGroup_first li[data_id="+dataBId+"]");
        var leftDomData=leftDom.attr("dataChecked");
        var leftDomDataValue=leftDom.attr("dataCheckedValue");
        var dataThisName=leftDom.find("label").text()+"-"+obj.parent().parent().find("span").text();
    }
    if(data1){
        var leftDom=obj.parent().parent();
        var dataThisId=leftDom.attr("data_id");
        var dataThisName=leftDom.find("span").text();
    }
    setTimeout(function(){
        if(obj.attr("checked")=="checked"){
            obj.removeAttr("checked");
            if(data2){
                if(leftDomData.indexOf(",")>-1){
                    var nLeftDataA=leftDomData.split(",");
                    var nLsData="";
                    var nLeftDataAValue=leftDomDataValue.split(",");
                    var nLsDataValue="";
                    for(var i=0;i<nLeftDataA.length;i++){
                        var nLsDatal=nLeftDataA[i];
                        var nLsDatalValue=nLeftDataAValue[i];
                        if(nLsDatal!=""&&nLsDatal!=dataThisId){
                            nLsData=nLsData+nLsDatal+",";
                            nLsDataValue=nLsDataValue+nLsDatalValue+",";
                        }
                    }
                    nLsData=nLsData.substring(0,nLsData.length-1);
                    nLsDataValue=nLsDataValue.substring(0,nLsDataValue.length-1);
                    leftDom.attr("dataChecked",nLsData);
                    leftDom.attr("dataCheckedValue",nLsDataValue);
                }else{
                    leftDom.attr("dataChecked","");
                    leftDom.attr("dataCheckedValue","");
                }
            }
            if(data1){
                leftDom.attr("dataChecked","");
                leftDom.attr("dataCheckedValue","");
            }
        }else{
            obj.attr("checked","checked");
            if(data2){
                if(leftDomData==""){
                    leftDom.attr("dataChecked",dataThisId);
                    leftDom.attr("dataCheckedValue",dataThisName);
                }else{
                    leftDom.attr("dataChecked",leftDomData+","+dataThisId);
                    leftDom.attr("dataCheckedValue",leftDomDataValue+","+dataThisName);
                }
            }
            if(data1){
                leftDom.attr("dataChecked",dataThisId);
                leftDom.attr("dataCheckedValue",dataThisName);
            }
        }
    },50);
}

var cFunction_resetSecond;
function resetSecondClass(obj){
    var firstLiDom=obj.parent();
    var dataPId=firstLiDom.attr("dataPId");
    var dataId=firstLiDom.attr("data_id");
    var leftDom=$(".nGroup_first li[data_id="+dataPId+"]");
    if(dataPId==dataId){
        leftDom.attr("dataChecked","");
        leftDom.attr("dataCheckedValue","");
        leftDom.find("input[type='checkbox']").removeAttr("checked");
    }else{
        var dataChecked=leftDom.attr("dataChecked");
        var dataCheckedValue=leftDom.attr("dataCheckedValue");
        if(dataChecked.indexOf(",")>-1){
            var dataCheckedArray=dataChecked.split(",");
            var dataCheckedValueArray=dataCheckedValue.split(",");
            var newDataChecked=[];
            var newDataCheckedValue=[];
            for(var i=0;i<dataCheckedArray.length;i++){
                if(dataId!=dataCheckedArray[i]){
                    newDataChecked.push(dataCheckedArray[i]);
                    newDataCheckedValue.push(dataCheckedValueArray[i]);
                }
            }
            leftDom.attr("dataChecked",newDataChecked.join(","));
            leftDom.attr("dataCheckedValue",newDataCheckedValue.join(","));
        }else{
            leftDom.attr("dataChecked","");
            leftDom.attr("dataCheckedValue","");
        }
    }
    firstLiDom.remove();
    cFunction_resetSecond();
}