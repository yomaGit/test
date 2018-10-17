<template>
  <section>
    这里是带有id的页面
    {{$route.params.id}}

    store的counter:{{count}}

    <br/>
    这里是是服务端渲染的数据citylist:
    <ul>
      <li v-for="item in citylist" :key="item.id">
        {{item.id}} {{item.name}}
      </li>
    </ul>
  </section>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "id",
    data() {
      return {
        citylist: ['test']
      }
    },
    asyncData({context}) {

      let data = qs.stringify({parentid: "310100"});

      return axios({
        url: 'http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea',
        method: 'post',
        data: data
      }).then(function (d) {

        return {
          citylist: d.data.data
        }

      }).catch(function () {

      })


    },
    computed:{
      count(){
        return this.$store.state.counter
      }
    },
    methods: {

    },
    mounted(){

    }
  }
</script>

<style>

</style>
