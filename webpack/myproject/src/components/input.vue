<template>
  <div>
    <input type="text" v-bind="$attrs" v-on="listeners" style="border: 1px solid green;"/>
    <input type="text" placeholder="子组件的第二个输入框提示文字" style="border:1px solid blue">
  </div>
</template>

<script>
    export default {
      name: "testInput",
      data(){
        return {
          testinput_zv:'1122'
        }
      },
      inheritAttrs:false,//- 跟组件是否继承父组件的特性
      computed:{
        listeners(){
          return {
            ...this.$listeners,
            input: event =>
              this.$emit('input', event.target.value)
          }
        }
      },
      watch:{
        testinput_zv(v){
          console.log(`子组件input值变了${v}`);
        }
      }
    }
</script>

<style scoped>

</style>
