<template>
  <div class="test0">
    <p>{{msg}}</p>
    <router-link to="/hello">跳回hello页面</router-link>
  </div>
</template>

<script>
export default {
  name: 'test0',
  data () {
    return {
      msg: '这里是第二个.vue的页面 test0'
    }
  }
}
</script>

<style scoped>
  p{
    color: #00A000;
  }
</style>
