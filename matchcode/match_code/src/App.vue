<template>
  <div id="body" class="body" @click='bodyclick'>
    <div id="loader">
      <div class="loader">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <p>Please wait...</p>
      </div>
    </div>
    <div class="cbg" id='cbg' @click='cbgclick'></div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  methods:{//- 方法
    bodyclick(){//- 全局点击方法
      var cla=document.getElementById("noticebox").className;
      if(cla.indexOf("slideDown")>-1){//- 系统通知弹框隐藏
        cla=cla.replace(" slideDown","");
        document.getElementById("noticebox").setAttribute("class",cla);
      }


    },
    cbgclick(){//- 全局cbg的点击方法

    }
  },
  watch:{//- 监听

  },
  created(){//- 创建 常用

  },
  updated(){//- 组件更新之后

  },
  destroyed(){//- 销毁

  },
  beforeRouteEnter(to, from, next){//- 进入路由，无this

    next(true);
  },
  beforeRouteUpdate(to, from, next){//- 路由改变，可this

    next(true);
  },
  beforeRouteLeave(to, from, next){//- 离开路由，可this

    next(true);
  }
}
</script>

<style>
  @import "css/app.css";
</style>
