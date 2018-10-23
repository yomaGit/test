<template>


  <section class="content">

    <div class="crumbs">
      <div class="l sel">订单</div>
    </div>

    <div class="step">
      <ul>
        <li class="circle sel">1</li>
        <li class="line"></li>
        <li class="circle">2</li>
        <li class="line"></li>
        <li class="circle">3</li>
        <li class="line"></li>
        <li class="circle">4</li>
        <li class="line"></li>
        <li class="circle">5</li>
      </ul>
    </div>

    <div class="property">
      <ul>
        <li>
          <div class="name">关键属性</div>
          <ul>
            <li>供应商：杭州XXX商贸有限公司</li>
            <li>提交时间：2017-11-11</li>
            <li>提交人：遥欣</li>
          </ul>
        </li>
        <li>
          <div class="name">关键属性</div>
          <ul>
            <li>供应商：杭州XXX商贸有限公司</li>
            <li>提交时间：2017-11-11</li>
            <li>提交人：遥欣</li>
          </ul>
        </li>
        <li>
          <div class="name">关键属性</div>
          <ul>
            <li>供应商：杭州XXX商贸有限公司</li>
            <li>提交时间：2017-11-11</li>
            <li>提交人：遥欣</li>
          </ul>
        </li>
        <li>
          <div class="name">关键属性</div>
          <ul>
            <li>供应商：杭州XXX商贸有限公司</li>
            <li>提交时间：2017-11-11</li>
            <li>提交人：遥欣</li>
          </ul>
        </li>
      </ul>
    </div>

    <dataList class="rm_list" ref="dataList"></dataList>

  </section>

</template>

<script>
  import dataList from '../../components/datalist'

  export default {
    name: 'retial_management',
    components: {dataList},
    data() {
      return {

      }
    },
    methods: {//- 方法
      init() {
        let that=this;

        that.$store.commit('changeNavbar',{
          menu:'index',
          navFirst:'businessEvents',
          navSecond:'initialValue'
        })

      },


    },
    mounted() {//- 创建 常用
      this.init();
    },
  }
</script>

<style lang="sass">
  @import "../../../css/views/business_event/retail_management"
</style>
