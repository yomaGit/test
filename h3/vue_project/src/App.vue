<template>
  <div class="body" :class="{hidebart:hidebart}" @click="bodyclick">

    <div class="cbg" v-show="cbgshow" id='cbg' @click='cbgclick'></div>
    <div class="processbar" :class={off:!probarshow} v-show="processbar_show">
      <div :style="'width:'+probarwidth+'%;'"></div>
    </div>

    <navbar ref="navbar"></navbar>

    <router-view ref="routerview"/>

  </div>
</template>

<script>
  import navbar from './pages/modules/navbar'

  export default {
    name: 'App',
    components: {navbar},
    data() {
      return {}
    },
    methods: {//- 方法
      bodyclick() {//- 全局点击方法
        let that = this;

        //- dataList的弹框隐藏的跨组件方法
        if (that.$refs.routerview.$refs.dataList.closeFloat) that.$refs.routerview.$refs.dataList.closeFloat();

        //- navbar的头部搜索框隐藏的跨组件方法
        if (that.$refs.navbar.closeFloat) that.$refs.navbar.closeFloat();
      },
      cbgclick() {//- 全局cbg的点击方法

      }
    },
    computed: {
      hidebart() {
        return this.$store.state.hidebart
      },
      cbgshow() {
        return this.$store.state.cbgshow
      },
      probarshow() {
        return this.$store.state.processbar;
      },
      processbar_show() {
        return this.$store.state.processbar_show;
      },
      probarwidth() {
        return this.$store.state.processbar_width;
      },
    },
    mounted() {
      let that = this;

      that.$store.commit('resetHeight')//- 初始化二级菜单的点击交互的height

    }
  }
</script>

<style lang="sass">
  @import "css/app.scss"
</style>
