function stopProp(e){ if(e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;}//阻止冒泡方法
function judgeNull(val){ return val.match(/^\s*$/)? "right":"error";}//判断是否为空

var imgUploadUrl="http://ydjia.hydee.cn:8090/hwimg/store/img";//全局变量（图片的上传地址）

$(function(){

    var winH=$(window).height();
    var rightWinH=$("#right-wrapper").height();
    $("#left-wrapper").css("min-height",winH);
    $("#right-wrapper").css("min-height",winH);
    if(rightWinH>winH) $("#left-wrapper").css("height",rightWinH);

    $(".div-help-area").css("height",winH-62);
    $(".div-help-area .ul-right-nav").css("height",winH-151);

    if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) <= 4) {
        var winWidth = parseInt($(window).width());
        if (1920 - winWidth > 0) { $(".imgLeft img").css("left", (winWidth - 1920) / 2 + "px");}
    }

    if ($(".fileUpload").length > 0) { $(".fileUpload").fileUpload();}
    var inputPlace = document.createElement('input');
    if ("placeholder" in inputPlace) {
        $(".inputLabel").addClass("nonei");
    } else {
        $(".inputLabel").show();
        $(".input").each(function () {
            var inputDom = $(this).find("input");
            var labelDom = $(this).find("label");
            var val = inputDom.val();
            if (!val.match(/^\s*$/)) labelDom.hide();
            $(this).find("input").focus(function () { labelDom.hide();})
            $(this).find("input").blur(function () {
                var value = $(this).val();
                if (value.match(/^\s*$/)) labelDom.show();
            })
        })

        $(".inputLabel").each(function () {
            var val = $("#" + $(this).attr("for")).val();
            if (val != undefined && !val.match(/^\s*$/)) $(this).hide();
        })

        $("body").delegate(".labelInput", "keydown", function () {
            $("#" + $(this).attr("id") + "Label").hide();
            if ($(this).attr("id").indexOf("T") >= 0) $("#" + $(this).attr("id").split("T")[0] + "Label").hide();
        })

        $("body").delegate(".labelInput", "keyup", function () {
            if ($(this).val().match(/^\s*$/)) {
                $("#" + $(this).attr("id") + "Label").show();
                if ($(this).attr("id").indexOf("T") >= 0) $("#" + $(this).attr("id").split("T")[0] + "Label").show();
            } else {
                $("#" + $(this).attr("id") + "Label").hide();
            }
        })
    }



    $("body").delegate(".ul-tab-options li,.ul-tab-options-f li", "click", function (e) {
        stopProp(e);
        var thisLi=$(this);
        var dataId=thisLi.attr("dataId");
        thisLi.parent().find("li").removeClass("activeTab");
        thisLi.addClass("activeTab");
        if(thisLi.parent().hasClass("ul-tab-options-f")){
            $(".systemInfoF").hide();
        }else{
            $(".auditingInfo,.systemInfo").hide();
        }
        $(".for"+dataId).show();
    })

    $("body").delegate(".editChainInfo","click", function (e) {
        stopProp(e);
        $(".shadowWhite,.wholeBg").show();
    })
    $("body").delegate(".goodsAuditing","click", function (e) {
        stopProp(e);
        $(".goodsDetailAudit,.wholeBg").show();
    })

    $("body").delegate(".shadowWhite .forClose","click", function (e) {
        stopProp(e);
        $(".shadowWhite,.wholeBg").hide();
    })

    $("body").delegate(".shadowWhite .forSure,.shadowWhite .cancel", "click", function (e) {
        stopProp(e);
        $(".shadowWhite,.wholeBg").hide();
    })

    var thisAgreeBtn;
    $("body").delegate(".goodsImgAgree input[type='button']","click", function (e) {
         stopProp(e);
        $(".wholeBg,.goodsImgAudit").show();
        thisAgreeBtn=$(this);
    })

    $("body").delegate(".goodsImgAgree_ck input[type='button']","click", function (e) {
        stopProp(e);
        $(".wholeBg,.goodsImgAudit_res").show();
        thisAgreeBtn=$(this);
    })

    //$("body").delegate(".mainImgOp li img","click",function(e){
    //    stopProp(e);
    //    var thisLi=$(this).parent();
    //    var thisP=thisLi.parent();
    //    var thisCheckbox=thisLi.find("input[type='checkbox']");
    //    $(".mainImgOp").find("li").not(thisLi).removeClass("selectMainImg");
    //    if(thisP.hasClass("ul-oldImg")){
    //        if(thisCheckbox.attr("checked")!="checked"){
    //            $(".ul-newImg").find("li").each(function(e){ if($(this).find("input[type='checkbox']").attr("checked")=="checked") $(this).attr("class","willUpload");});
    //            $(thisLi).toggleClass("selectMainImg");
    //        }else{
    //            alert("取消选择删除后，才能设置为主图");
    //        }
    //    }
    //    if(thisP.hasClass("ul-newImg")){
    //        if(thisCheckbox.attr("checked")=="checked"){
    //            if($(thisLi).hasClass("willUpload")){ $(thisLi).attr("class","selectMainImg");}else{ $(thisLi).attr("class","willUpload");}
    //            $(".ul-newImg").find("li").not(thisLi).each(function(e){ if($(this).find("input[type='checkbox']").attr("checked")=="checked") $(this).attr("class","willUpload");});
    //        }else{
    //            alert("请先选择图片，之后才可能设置为主图");
    //        }
    //    }
    //})
    $("body").delegate(".ul-oldImg .sc input[type='checkbox']", "change", function (e) {
        stopProp(e);
        var that=$(this);
        var che=that.attr("checked");
        if(che=="checked"){
            that.parent().parent().parent().addClass("sel").removeClass("sel_zt");
            that.parent().parent().parent().find(".zt input[type='checkbox']").removeAttr("checked");
        }else{
            that.parent().parent().parent().removeClass("sel")
        }
    })

    $("body").delegate(".goodsImgAudit .shadowMain .zt input[type='checkbox']", "change", function (e) {
        stopProp(e);
        var that=$(this);
        var che=that.attr("checked");
        if(che=="checked"){
            if(that.parent().parent().find(".sh").length>0&&that.parent().parent().find(".sh input[type='checkbox']").attr("checked")!="checked") that.parent().parent().find(".sh input[type='checkbox']").click();
            $(".goodsImgAudit .shadowMain .zt input[type='checkbox']").removeAttr("checked");
            that.parent().parent().parent().find(".zt input[type='checkbox']").attr("checked","checked");
            $(".goodsImgAudit .shadowMain li").removeClass("sel_zt");
            that.parent().parent().parent().addClass("sel_zt");
        }else{
            that.parent().parent().parent().removeClass("sel_zt");
        }
    })

    $("body").delegate(".ul-newImg>li .sh_f .selL span","click",function(){
        $(this).toggleClass("on");
    })

    $("body").delegate(".ul-newImg .sh input[type='checkbox']", "change", function (e) {
        stopProp(e);
        var that=$(this);
        var che=that.attr("checked");
        if(che=="checked"){
            that.parent().parent().parent().addClass("sel");
            that.parent().parent().parent().find(".sh_f").css("visibility","hidden");
        }else{
            that.parent().parent().parent().removeClass("sel").removeClass("sel_zt");
            that.parent().parent().parent().find(".zt input[type='checkbox']").removeAttr("checked");
            that.parent().parent().parent().find(".sh_f").css("visibility","visible");
        }
    })

    $("body").delegate(".oldImgCheckbox", "change", function (e) {
        stopProp(e);
        var gPli=$(this).parent().parent();
        if($(this).attr("checked")!="checked"){
            gPli.removeClass("selectOldImg");
        }else{
            if(gPli.hasClass("selectMainImg")) gPli.removeClass("selectMainImg");
            gPli.addClass("selectOldImg");
        }
    })

    $("body").delegate("input[type='checkbox'].newImgCheckbox", "change", function (e) {
        stopProp(e);
        var gPli=$(this).parent().parent();
        if($(this).attr("checked")!="checked"){ gPli.attr("class","");}else{ gPli.attr("class","willUpload");}
    })

    $("body").delegate(".goodsImgDisagree input[type='button']","click", function (e) {
        stopProp(e);
        if(confirm("确定拒绝该条申请信息吗？")){
            $(this).val("已拒绝").addClass("btn-disabled-disagree").attr("disabled","disabled");
            $(this).parent().addClass("marginTop10px");
            $(this).parent().parent().find(".goodsImgAgree").remove();
        }
    })

    var addSource;
    var changeFirst;
    var changeWhere;
    $("body").delegate(".addContext","click", function (e) {
        stopProp(e);
        addSource="newAdd";
        $(".addNewContext").find("#contextTitle").val("");
        $(".addNewContext,.wholeBg").show();
    })

    $("body").delegate(".contextR .span-editContext","click", function (e) {
        stopProp(e);
        addSource="editInfo";
        changeFirst=$(".ul-left-nav").find("li.activeContextLi");
        changeWhere=$(this).parent().parent().find(".rTitle");
        $(".addNewContext").find("#contextTitle").val($(this).parent().parent().find(".rTitle").text());
        $(".addNewContext,.wholeBg").show();
    })

    $("body").delegate(".addNewContext .forClose","click", function (e) {
        stopProp(e);
        $(".addNewContext").find("#contextTitle").val("");
        $(".addNewContext,.wholeBg").hide();
    })

    $("body").delegate(".addNewContext .forSure", "click", function (e) {
        stopProp(e);
        var nowdate=new Date();
        var dateTimeId=formatDate(nowdate);
        var newContext=$(".addNewContext").find("#contextTitle").val();
        switch(addSource){
            case "editInfo":
                changeFirst.text(newContext).attr("title",newContext);
                changeWhere.text(newContext);
                $(".addNewContext,.wholeBg").hide();
                break;
            case "newAdd":
                var newDomLi="<li dateTimeId='"+dateTimeId+"' title='"+newContext+"' class='activeContextLi'>"+newContext+"</li>";
                var newDomRight="<div class='help-area-right' id='for"+dateTimeId+"'><div class='contextR'><div class='rTitle'>"+newContext+"</div><div class='addContentBtn'><input type='button' class='btn-hover-hyacinth marginRight10px' value='新建文档'><input type='button' class='btn-hover-skyblue marginRight10px addMediaBtn' value='上传视频'></div><div class='operationDetail'><span class='span-editContext'></span><span class='span-deleteContext'></span></div></div><ul class='ul-right-nav'></ul></div>";
                $(".ul-left-nav").find("li").removeClass("activeContextLi");
                $(".help-area-right").addClass("displayNone");
                $(".ul-left-nav").append(newDomLi);
                $(".div-help-area").append(newDomRight);
                break;
            default :break;
        }
    })

    $("body").delegate(".contextR .span-deleteContext","click", function (e) {
        stopProp(e);
        if(confirm("一旦删除将无法恢复，确定删除吗？")){
            $(this).parent().parent().parent().remove();
            $(".ul-left-nav").find("li.activeContextLi").remove();
        }
    })

    $("body").delegate(".ul-right-nav li .span-deleteContext","click", function (e) {
        stopProp(e);
        if(confirm("一旦删除将无法恢复，确定删除吗？")) $(this).parent().parent().remove();
    })

    $("body").delegate(".ul-uploadDocument li .span-deleteDocument","click", function (e) {
        stopProp(e);
        if(confirm("一旦删除将无法恢复，确定删除吗？")) $(this).parent().remove();
    })

    var mediaSpan;
    var mediaSpanWhere;
    var mediaNum;
    $("body").delegate(".addMediaBtn","click", function (e) {
        stopProp(e);
        if($(this).parent().parent().find(".operationDetail").find("span").length>2){
            mediaNum=true;
            mediaSpan=$(this).parent().parent().find(".operationDetail").find(".span-viewMedia");
            $(".addMainMedia").find("#mediaUrl").val(mediaSpan.attr("mediaId"));
        }else{
            mediaNum=false;
            mediaSpanWhere=$(this).parent().parent().find(".operationDetail").find(".span-editContext");
            $(".addMainMedia").find("#mediaUrl").val("");
        }
        $(".addMainMedia,.wholeBg").show();
    })

    $("body").delegate(".addMainMedia .forClose","click", function (e) {
        stopProp(e);
        $(".addMainMedia").find("#mediaUrl").val("");
        $(".addMainMedia,.wholeBg").hide();
    })

    $("body").delegate(".addMainMedia .forSure", "click", function (e) {
        stopProp(e);
        if($(".addMainMedia").find("#mediaUrl").val().length!=0) {
            var newSpan = "<span class='span-viewMedia' mediaId='" + $("#mediaUrl").val() + "'></span>";
            if (mediaNum) { $(mediaSpan).replaceWith(newSpan);}else{ $(newSpan).insertBefore(mediaSpanWhere);}
        }
        $(".addMainMedia").find("#mediaUrl").val("");
        $(".addMainMedia,.wholeBg").hide();
    })

    $("body").delegate(".ul-left-nav li","click",function(e){
        stopProp(e);
        $(this).addClass("activeContextLi");
        $(this).parent().find("li").not(this).removeClass("activeContextLi");
        $(".help-area-right").addClass("displayNone");
        $("#for"+$(this).attr("dateTimeId")).removeClass("displayNone");
    })

    $("body").delegate(".span-viewMedia","click", function (e) {
        stopProp(e);
        $(".viewTheMedia").find("embed").attr("src","http://static.youku.com/v1.0.0223/v/swf/loader.swf?winType=adshow&VideoIDS="+$(this).attr("mediaId")+"&isAutoPlay=false");
        $(".viewTheMedia,.wholeBg").show();
    })

    $("body").delegate(".viewTheMedia .mediaClose","click", function (e) {
        stopProp(e);
        $(".viewTheMedia").find("embed").attr("src","");
        $(".viewTheMedia,.wholeBg").hide();
    })

    document.body.addEventListener('paste', function(e) {
        console.log("pasteIn");
        var clipboard = e.clipboardData;
        for(var i=0,len=clipboard.items.length; i<len; i++) {
            if(clipboard.items[i].kind == 'file' || clipboard.items[i].type.indexOf('image') > -1) {
                var imageFile = clipboard.items[i].getAsFile();
                console.log("ajaxStart"+imageFile);
                var formData = new FormData();
                formData.append('png', imageFile);
            	formData.append("filetype", imageFile.type);

            	$.ajax({
            		type:'post',
            		url:"documentfiles/img",
            		data:formData,
            		contentType: false,
            		processData: false,
            		dataType:'json',
            		success:function(data){
            			if(data!=null){
            				var imgurl=data.png;
                            var lsDom="<img src='"+imgurl+"' alt='' width='auto' id='demoImage'>";
                            $("#customized-buttonpane").append(lsDom);
            			}
            		}
            	});
                e.preventDefault();
            }
        }
    });

    $("body").delegate(".systemMsg_d","click", function (e) {
        stopProp(e);
        $(".shadowWhite,.wholeBg").show();
    })

    $(".cRetMainLi li").click(function(){
        $(".cRetMainLi li").removeClass("on");
        $(this).addClass("on");
    })

    $(".addRbackRec").click(function(){
        $(".shadowWhite_cRet input[type='text']").val("");
        $(".shadowWhite_cRet input[type='checkbox']").removeAttr("checked");
        $(".shadowWhite_cRet,.wholeBg").show();
    })

    $(".addRconRec").click(function(){
        $(".shadowWhite_cRetcon .shadowTitle").html("添加合同记录");
        $(".shadowWhite_cRetcon input[type='text']").val("");
        $(".shadowWhite_cRetcon input[type='checkbox']").removeAttr("checked");
        $(".shadowWhite_cRetcon,.wholeBg").show();
    })

    $(".showCDetail_edit").click(function(){
        $(".shadowWhite_cRetcon .shadowTitle").html("编辑合同记录");
        $(".shadowWhite_cRetcon input[type='text']").val("");
        $(".shadowWhite_cRetcon input[type='checkbox']").removeAttr("checked");

        //todo 这里是编辑的数据填充
        $(".shadowWhite_cRetcon,.wholeBg").show();
    })

    $("body").delegate(".selMoni","click",function(){
        var that=$(this);
        var thatp=that.parent();
        if(!thatp.hasClass("multi")) thatp.find(".selMoni").removeClass("on");
        if(that.hasClass("nl"))
            thatp.find(".selMoni").removeClass("on");
        else
            thatp.find(".nl").removeClass("on");
        that.toggleClass("on");
    })

    $("body").delegate(".showCDetail","click",function(){
        $(".shadowWhite_cRetcon .shadowTitle").html("编辑合同记录");
    	$(".shadowWhite_cRetcon,.wholeBg").show();
    })
   
    
    $(".funList li").click(function(){
        $(this).toggleClass("on");
    })

    $(".open_bauto").click(function(){
        $(".selectLayer_open").val(1);
        $(".shadowWhite_cRet_open .open").hide();
        $(".shadowWhite_cRet_open .open1").show();
        $(".shadowWhite_cRet_open,.wholeBg").show();
    })

    $(".selectLayer_open").change(function(){
        $(".shadowWhite_cRet_open .open").hide();
        $(".shadowWhite_cRet_open .open"+$(this).val()).show();
        $("#cj-select-serviceid").val($(this).val());
    });

    $(".edit_chain").click(function(){
        $(".shadowWhite_cRet_editC input[type='text']").val("");
        $(".shadowWhite_cRet_editC,.wholeBg").show();
    })

    resetCretMainLiLength();

    $("body").delegate(".allHT_edit","click",function(){
        $(".shadowWhite_cRet,.wholeBg").show();
    })

    $("body").delegate(".table-cell","click", function () {
        $(".win-bgView").show();
    })

    $("body").delegate(".hide-win","click", function () {
        $(".win-bgView").hide();
    })

    $("body").delegate(".btv-b.b1","click", function () {
        $(".win-bgView2").show();
    })
    $("body").delegate(".contentView2 .view1 .input.ipt1","click", function () {
        $(".win-bgView2").hide();
    })

    $("body").delegate(".win2btn-tg","click", function () {
        $(".win-bgView2").hide();
    })
    $("body").delegate(".win2btn-jj","click", function () {
        // $(".win-bgView2").hide();
        $(".win-bgView3").show();
    })
    $("body").delegate(".win2btn-tg","click", function () {
        $(".win-bgView2").hide();
    })
    $("body").delegate(".win3btn-qd","click", function () {
        $(".win-bgView3").hide();
    })
    $("body").delegate(".input.ipt1.gb","click", function () {
        $(".win-bgView3").hide();
        // $(".win-bgView2").show();
    })
    $("body").delegate(".winGoodsInfo.btv .btv-b.b2","click", function () {
        $(".win-bgView3").show();
    })

    $("body").delegate(".option-nr.ipt1","click", function () {
        $(".win-bgView3 #qtyy").hide();
        $(".option-nr").hide();
    })
    $("body").delegate(".option-nr.ipt2,.option-nr.ipt3","click", function () {
        $(".win-bgView3 #qtyy").show();
        $(".option-nr").hide();
    })

    $("body").delegate(".option-v","click", function () {
        $(".option-nr").show();
        $(".win-bgView3 #qtyy").hide();
    })

    $("body").delegate(".lv-cell-t #bj-spmc","click", function () {
        if($(".lv-cell-t .spmc").css("display")=='none'){
            $(".lv-cell-t .spmc").show();
            $(".lv-cell-input.spmc").hide();
        }else {
            $(".lv-cell-t .spmc").hide();
            $(".lv-cell-input.spmc").show();
        }
    })
    $("body").delegate(".lv-cell-input.spmc","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .spmc").show();
            $(".lv-cell-input.spmc").hide();
        }
    })


    $("body").delegate(".lv-cell-t #bj-gg","click", function () {
        if($(".lv-cell-t .gg").css("display")=='none'){
            $(".lv-cell-t .gg").show();
            $(".lv-cell-input.gg").hide();
        }else {
            $(".lv-cell-t .gg").hide();
            $(".lv-cell-input.gg").show();
        }
    })
    $("body").delegate(".lv-cell-input.gg","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .gg").show();
            $(".lv-cell-input.gg").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-scqy","click", function () {
        if($(".lv-cell-t .scqy").css("display")=='none'){
            $(".lv-cell-t .scqy").show();
            $(".lv-cell-input.scqy").hide();
        }else {
            $(".lv-cell-t .scqy").hide();
            $(".lv-cell-input.scqy").show();
        }
    })
    $("body").delegate(".lv-cell-input.scqy","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .scqy").show();
            $(".lv-cell-input.scqy").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-ssgjc","click", function () {
        if($(".lv-cell-t .ssgjc").css("display")=='none'){
            $(".lv-cell-t .ssgjc").show();
            $(".lv-cell-input.ssgjc").hide();
        }else {
            $(".lv-cell-t .ssgjc").hide();
            $(".lv-cell-input.ssgjc").show();
        }
    })
    $("body").delegate(".lv-cell-input.ssgjc","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .ssgjc").show();
            $(".lv-cell-input.ssgjc").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-pzwh","click", function () {
        if($(".lv-cell-t .pzwh").css("display")=='none'){
            $(".lv-cell-t .pzwh").show();
            $(".lv-cell-input.pzwh").hide();
        }else {
            $(".lv-cell-t .pzwh").hide();
            $(".lv-cell-input.pzwh").show();
        }
    })
    $("body").delegate(".lv-cell-input.pzwh","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .pzwh").show();
            $(".lv-cell-input.pzwh").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-txm","click", function () {
        if($(".lv-cell-t .txm").css("display")=='none'){
            $(".lv-cell-t .txm").show();
            $(".lv-cell-input.txm").hide();
        }else {
            $(".lv-cell-t .txm").hide();
            $(".lv-cell-input.txm").show();
        }
    })
    $("body").delegate(".lv-cell-input.txm","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .txm").show();
            $(".lv-cell-input.txm").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-sfyp","click", function () {
        if($(".lv-cell-t .sfyp").css("display")=='none'){
            $(".lv-cell-t .sfyp").show();
            $(".lv-cell-input.sfyp").hide();
        }else {
            $(".lv-cell-t .sfyp").hide();
            $(".lv-cell-input.sfyp").show();
        }
    })
    $("body").delegate(".lv-cell-input.sfyp","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .sfyp").show();
            $(".lv-cell-input.sfyp").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-yplx","click", function () {
        if($(".lv-cell-t .yplx").css("display")=='none'){
            $(".lv-cell-t .yplx").show();
            $(".lv-cell-input.yplx").hide();
        }else {
            $(".lv-cell-t .yplx").hide();
            $(".lv-cell-input.yplx").show();
        }
    })
    $("body").delegate(".lv-cell-input.yplx","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .yplx").show();
            $(".lv-cell-input.yplx").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-cffl","click", function () {
        if($(".lv-cell-t .cffl").css("display")=='none'){
            $(".lv-cell-t .cffl").show();
            $(".lv-cell-input.cffl").hide();
        }else {
            $(".lv-cell-t .cffl").hide();
            $(".lv-cell-input.cffl").show();
        }
    })
    $("body").delegate(".lv-cell-input.cffl","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .cffl").show();
            $(".lv-cell-input.cffl").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-mhj","click", function () {
        if($(".lv-cell-t .mhj").css("display")=='none'){
            $(".lv-cell-t .mhj").show();
            $(".lv-cell-input.mhj").hide();
        }else {
            $(".lv-cell-t .mhj").hide();
            $(".lv-cell-input.mhj").show();
        }
    })
    $("body").delegate(".lv-cell-input.mhj","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .mhj").show();
            $(".lv-cell-input.mhj").hide();
        }
    })



    $("body").delegate(".lv-cell-t #bj-zjm","click", function () {
        if($(".lv-cell-t .zjm").css("display")=='none'){
            $(".lv-cell-t .zjm").show();
            $(".lv-cell-input.zjm").hide();
        }else {
            $(".lv-cell-t .zjm").hide();
            $(".lv-cell-input.zjm").show();
        }
    })
    $("body").delegate(".lv-cell-input.zjm","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .zjm").show();
            $(".lv-cell-input.zjm").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-ppmc","click", function () {
        if($(".lv-cell-t .ppmc").css("display")=='none'){
            $(".lv-cell-t .ppmc").show();
            $(".lv-cell-input.ppmc").hide();
        }else {
            $(".lv-cell-t .ppmc").hide();
            $(".lv-cell-input.ppmc").show();
        }
    })
    $("body").delegate(".lv-cell-input.ppmc","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .ppmc").show();
            $(".lv-cell-input.ppmc").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-sms","click", function () {
        if($(".lv-cell-t .sms").css("display")=='none'){
            $(".lv-cell-t .sms").show();
            $(".lv-cell-input.sms").hide();
        }else {
            $(".lv-cell-t .sms").hide();
            $(".lv-cell-input.sms").show();
        }
    })
    $("body").delegate(".lv-cell-input.sms","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .sms").show();
            $(".lv-cell-input.sms").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-tym","click", function () {
        if($(".lv-cell-t .tym").css("display")=='none'){
            $(".lv-cell-t .tym").show();
            $(".lv-cell-input.tym").hide();
        }else {
            $(".lv-cell-t .tym").hide();
            $(".lv-cell-input.tym").show();
        }
    })
    $("body").delegate(".lv-cell-input.tym","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .tym").show();
            $(".lv-cell-input.tym").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-gnlx","click", function () {
        if($(".lv-cell-t .gnlx").css("display")=='none'){
            $(".lv-cell-t .gnlx").show();
            $(".lv-cell-input.gnlx").hide();
        }else {
            $(".lv-cell-t .gnlx").hide();
            $(".lv-cell-input.gnlx").show();
        }
    })
    $("body").delegate(".lv-cell-input.gnlx","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .gnlx").show();
            $(".lv-cell-input.gnlx").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-yfyl","click", function () {
        if($(".lv-cell-t .yfyl").css("display")=='none'){
            $(".lv-cell-t .yfyl").show();
            $(".lv-cell-input.yfyl").hide();
        }else {
            $(".lv-cell-t .yfyl").hide();
            $(".lv-cell-input.yfyl").show();
        }
    })
    $("body").delegate(".lv-cell-input.yfyl","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .yfyl").show();
            $(".lv-cell-input.yfyl").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-blfy","click", function () {
        if($(".lv-cell-t .blfy").css("display")=='none'){
            $(".lv-cell-t .blfy").show();
            $(".lv-cell-input.blfy").hide();
        }else {
            $(".lv-cell-t .blfy").hide();
            $(".lv-cell-input.blfy").show();
        }
    })
    $("body").delegate(".lv-cell-input.blfy","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .blfy").show();
            $(".lv-cell-input.blfy").hide();
        }
    })

    $("body").delegate(".lv-cell-t #bj-jj","click", function () {
        if($(".lv-cell-t .jj").css("display")=='none'){
            $(".lv-cell-t .jj").show();
            $(".lv-cell-input.jj").hide();
        }else {
            $(".lv-cell-t .jj").hide();
            $(".lv-cell-input.jj").show();
        }
    })
    $("body").delegate(".lv-cell-input.jj","keyup", function (event) {
        if((event.keyCode || event.which)==13){
            $(".lv-cell-t .jj").show();
            $(".lv-cell-input.jj").hide();
        }
    })


    $("body").delegate(".ipt1-win-cell","click", function () {
            $(".ipt1-win,.ipt1-win-sj").hide();
    })

})

function formatDate(date) {
    var datetime = date.getFullYear()
        + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
        + (date.getMonth() + 1))
        + (date.getDate() < 10 ? "0" + date.getDate() : date
            .getDate())
    + (date.getHours() < 10 ? "0" + date.getHours() : date
            .getHours())
    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
            .getMinutes())
    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
            .getSeconds());
    return datetime;
}

function resetCretMainLiLength(){
    var nowL=$(".cRetMainLi li").length*(160+35);
    $(".cRetMainLi ul").css("width",nowL+"px");
}

function clickId(obj){
    $("li[dataid="+obj+"]").click();
}