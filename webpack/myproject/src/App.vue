<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*@import "css/common.css";!*全局css文件引用格式*!*/
  *{
    margin:0;
    padding:0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .vue-toast{
    position: fixed;
    left: 50%;
    top: 60px;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    width: auto;
    max-width:66%;
    height: auto;
    padding: 8px 20px;
    background-color: #fd8f2e;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    color: #FFF;
    text-align: center;
    font-size: 18px;
    -webkit-box-shadow: 0 0 10px 2px #CAAB8F;
    -moz-box-shadow: 0 0 10px 2px #CAAB8F;
    box-shadow: 0 0 10px 2px #CAAB8F;
    z-index: 99999999;
  }
button{
  background: #999999;
}
</style>
