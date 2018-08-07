<template>
  <div class="match_code">
    <navbar navfirst="sp" navsecond="dml"></navbar>
    <section class="content">
      <div class="crumbs">
        <a href="javascript:;" class="c">产品对码</a>
        <span>/</span>
        <a href="javascript:;" class="gray">ccc</a>
      </div>
      <div class="note">为了方便商家快速录入商品并上架发布，药店加商户中心提供了较全面的药品资料库。您只需要轻松对码，便可导入产品。如果找不到您想发布的商品，请您<a href="javascript:;">申请新品</a></div>



    </section>
  </div>
</template>

<script>
  import navbar from './navbar'

  export default {
    name:'match_code',
    components: { navbar },
    data(){
      return {

      }
    },
    methods:{//- 方法

    },
    watch:{//- 监听

    },
    created(){//- 创建 常用
      setTimeout(function(){//- 模拟loading隐藏
        document.getElementById('loader').style.display='none';
      },300)
    },
    updated(){//- 组件更新之后

    },
    destroyed(){//- 销毁

    },
    beforeRouteEnter(to, from, next){//- 进入路由，无this
      document.getElementById('loader').style.display='block';
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

<style scoped>
@import "../css/match_code.css";
</style>
