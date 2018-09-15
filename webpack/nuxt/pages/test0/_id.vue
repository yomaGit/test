<template>
  <section>
    这里是带有id的页面
    {{$route.params.id}}
  </section>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "id",
    data() {
      return {}
    },
    asyncData({params}) {
      return new Promise(function (resolve, reject) {

          let data = qs.stringify({parentid: "310100"});

          axios({
            url: 'http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea',
            method: 'post',
            data: data
          }).then(function (d) {
            resolve(d)
          }).catch(function () {
            reject()
          })

        }).then(function (d) {
          console.log("地址获取成功了 返回数据为上海市的区");
          console.log(d);

        }, function () {
          console.log("地址获取失败了");
        })

    },
    methods: {}
  }
</script>

<style>

</style>
