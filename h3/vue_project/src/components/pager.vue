<template>
  <div>
    <Page :current="current" :total="1000" :page-size="pageSize" show-sizer on-change="pageChange" on-page-size-change="onShowSizeChange"/>


  </div>
</template>

<script>
export default {
  name:'pager',
  data(){
    return {
      current: 1,
      pageSize: 10,
      total: 1000,
    }
  },
  methods:{//- 方法
    init(){
      let that=this;


    },
    pageChange(val){
      console.log(val);
    },
    onShowSizeChange(pageSize) {
      this.pageSize = pageSize
    },
  },
  mounted(){//- 创建
    this.init();

  }
}
</script>

<style lang="sass">
  @import "../css/components/pager"
</style>
