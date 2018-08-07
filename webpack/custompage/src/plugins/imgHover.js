let ImgHover = {};
ImgHover.install = function (Vue, options) {
  Vue.prototype.$ImgHover = (dom,cla,errm,errl,par) => {
    let errmo=errm ? errm:0;
    let errlo=errl ? errl:0;
    let parj= par=='parent' ? true:false;
    dom.querySelectorAll("."+cla).forEach(function(v,i){
      let that=v.querySelector("img");
      let src=that.getAttribute("src");

      if(src.indexOf("http")>-1||src.indexOf("https")>-1){

        let nsrc="";
        if(src.indexOf("/120/")>-1){
          let srcarr=src.split("/");
          srcarr.forEach(function(v,i){
            if(v==120) srcarr[i]=800;
          })
          nsrc=srcarr.join("/");
        }else{
          nsrc=src;
        }

        that.addEventListener("mouseenter",function(){
          let mthat=this;

          let srcwidth=mthat.offsetWidth+10;

          let abval="";
          let scrright=document.body.offsetWidth-mthat.offsetLeft-errlo;
          if(parj) scrright=document.body.offsetWidth-mthat.parentNode.offsetLeft-errlo;
          if(scrright<420){
            abval="right:"+srcwidth+"px;";
          }else{
            abval="left:"+srcwidth+"px;";
          }

          let scrtop=mthat.offsetTop+errmo-document.getElementById("body").scrollTop;
          let btop=document.body.offsetHeight-scrtop;
          if(scrtop<420){
            let topval=0;
            if(btop<420) topval=btop-420;
            abval+="top:"+topval+"px;";
          }else{
            let botvalue=0;
            if(btop-mthat.offsetHeight<0) botvalue=mthat.offsetHeight-btop;
            abval+="bottom:"+botvalue+"px;";
          }

          let addDom=document.createElement("div");
          addDom.className="img_boxf";
          addDom.style=abval;

          let imgdom=document.createElement("img");
          imgdom.src=nsrc;

          addDom.appendChild(imgdom);

          let pn=mthat.parentNode;
          pn.style="position:relative;overflow:inherit";
          pn.appendChild(addDom);
        })
        that.addEventListener("mouseleave",function(){
          let pn=this.parentNode;
          pn.style="";
          pn.removeChild(pn.querySelector(".img_boxf"));
        })
      }
    })
  }
}

export default ImgHover;
