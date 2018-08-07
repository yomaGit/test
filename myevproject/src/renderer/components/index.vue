<template>
    <div class="warper">
        <img src="~@/assets/img/logo.png" class="img">
        <p class="noteword">{{msg}}</p>
        <p>
            测试跳转不同页面
            <a href="http://www.baidu.com">百度链接</a>
            <a href="http://ydjcs.hydee.cn/ydj-merchant-center/dist/index.html#/new_apply">药店加新后台</a>
            <router-link to="/landingPage">landingPage</router-link>
            <router-link to="/notfound">notfound</router-link>
        </p>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '这里是index页面，测试各项功能'
    }
  }
}
</script>

<style scoped>
.warper{
    background:
            radial-gradient(
                    ellipse at top left,
                    rgba(255, 255, 255, 1) 40%,
                    rgba(229, 229, 229, .9) 100%
            );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
}
.img{
    display: block;
    width: 250px;
    height:auto;
    margin:0 auto;
}
    .noteword{
        text-align: center;
        margin:20px 0;
    }
    p{
        text-align: center;
    }
</style>