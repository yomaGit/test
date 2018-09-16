<template>
  <div>
    <a-pagination
      :pageSizeOptions="pageSizeOptions"
      :total="total"
      showSizeChanger
      :pageSize="pageSize"
      v-model="current"
      @showSizeChange="onShowSizeChange"
    >
      <template slot='buildOptionText' slot-scope='props'>
        <span v-if="props.value!=='50'">{{props.value}}条/页</span>
        <span v-if="props.value==='50'">全部</span>
      </template>
    </a-pagination>

  </div>
</template>

<script>
export default {
  name:'pager',
  data(){
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 1000,
    }
  },
  methods:{//- 方法
    init(){
      let that=this;


    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize
    },
  },
  mounted(){//- 创建
    this.init();

  }
}
</script>

<style lang="sass">
  @import "pager"
</style>
