<template>
  <div>
    <div v-show="value_props" style="color: red;">我是子组件divToggle</div>
    <button @click="changeValue_">子组件的改变div显示状态</button>
  </div>
</template>

<script>
  export default {
    name: "divtoggle",
    props: ['value'],
    data() {
      return {
        value_props: this.value
      }
    },
    methods:{
      changeValue_(){
        let that=this;
        let vp=!that.value_props;
        this.value_props=vp;
        this.$emit('input',vp)
      },
      changeState(){
        this.value_props=!this.value_props
      }
    }
  }
</script>

<style scoped>

</style>
