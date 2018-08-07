let ImgClick = {};
ImgClick.install = function (Vue, options) {
  Vue.prototype.$ImgClick = (srcv) => {

    if(srcv!=""){
      let addDom=document.createElement("div");
      addDom.className="bigimgshow";
      addDom.addEventListener("click",function(){
        document.body.removeChild(this);
      })

      let idom=document.createElement("img");
      idom.src=srcv;

      addDom.appendChild(idom);

      document.body.appendChild(addDom);
    }

  }
}

export default ImgClick;
