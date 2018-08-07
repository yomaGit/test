<template>
  <div class="index">
    <p>{{msg}}</p>
    <router-link to="/hello">进入hello页面</router-link>
    <router-link to="/test0">进入test0页面</router-link>
  </div>
</template>

<script>
export default {
  name:'index',
  data(){
    return {
      msg:"这里是index公共页，没有路由会进入到这里"
    }
  }
}
</script>

<style scoped>
p{
  color: red;
}
</style>
