import toast from './toast.vue'

let Toast = {};
Toast.install = function (Vue, options) {
  Vue.prototype.$toast = (tips='') => {
    let top=60;
    let length=document.getElementsByClassName('vue-toast').length;
    for(let i=0;i<length;i++){
      let nh=parseInt(document.getElementsByClassName('vue-toast')[i].clientHeight);
      if(isNaN(nh)){
        nh=40;
      }
      top=top+nh+10;
    }
    let toastTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
      template: '<div class="vue-toast" style="top:'+top+'px">' + tips + '</div>'
    });
    let tpl = new toastTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
    setTimeout(() => {        // 4、延迟2.5秒后移除该提示
      document.body.removeChild(tpl);
    }, 2500)
  }

  Vue.component('Toast', toast)
}

// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

export default Toast;
