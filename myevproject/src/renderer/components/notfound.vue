<template>
  <div>
    <p>404,页面未找到或报错了，请查看router配置或console报错信息</p>
    <p>
      跳回其他页面<br />
      <router-link to="/index">index</router-link>
      <router-link to="/landingPage">landingPage</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'notfound'
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
