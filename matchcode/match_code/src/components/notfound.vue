<template>
  <p>404,页面未找到，请查看router配置</p>
</template>

<script>
  export default {
    name:'notfound',
    data(){
      return {

      }
    },
    methods:{//- 方法

    },
    watch:{//- 监听

    },
    created(){//- 创建

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

<style scoped>
p{
  text-align: center;
  margin:50px auto;
  font-size: 20px;
  color: red;
}
</style>
