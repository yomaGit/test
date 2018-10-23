<template>
  <div>i am toast div，test、test、test</div>
</template>

<script>
  export default {
    name: "toast"
  }
</script>

<style>
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
</style>
