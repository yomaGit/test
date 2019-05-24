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
  import dataList from '../../components/datalist_old'

  export default {
    name: 'retial_management',
    components: {dataList},
    data() {
      return {
        columns: [
          {
            type:'selection',
          },
          {
            title:'序号',
            key:'serialNumber',
          },
          {
            title: '会计月',// 显示名称
            key: 'accountantMonth',// 名称对应的key
            hidden:true,// 隐藏属性
            type: 'select',// 列内容type
            setUp: {// 列内容type对应的设置
              placeholder: '（全部）',// type为select时的下拉默认提示文字
              defaultSelected: '',// type为select时的下拉默认显示value
              data: [// type为select时的下拉的数据数组
                {
                  value: '0',// 内容对应的值
                  label: '1'// 显示内容
                },
                {
                  value: '1',
                  label: '2'
                },
                {
                  value: '2',
                  label: '3'
                },
              ],
            },
            dataType:'link',// 数据展示的type值
            dataSetUp:{
              url:'http://www.baidu.com'// type为link时要跳转的链接
            }
          },
          {
            title: '库存数量',
            key: 'stockQuantity',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '555'
                },
                {
                  value: '1',
                  label: '666'
                },
                {
                  value: '2',
                  label: '777'
                },
              ],
            }
          },
          {
            title: '月初库存',
            key: 'beginingMonth',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '111'
                },
                {
                  value: '1',
                  label: '222'
                },
                {
                  value: '2',
                  label: '333'
                },
              ],
            }
          },
          {
            title: '销售品种数',
            key: 'sellClassQuantity',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '7'
                },
                {
                  value: '1',
                  label: '8'
                },
                {
                  value: '2',
                  label: '9'
                },
              ],
            }
          },
          {
            title: '有销售且有库存品种数',
            key: 'sellAndStockClassQuantity',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '2'
                },
                {
                  value: '1',
                  label: '3'
                },
                {
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '有库存品种数',
            key: 'stockClassQuantity',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '3'
                },
                {
                  value: '1',
                  label: '4'
                },
                {
                  value: '2',
                  label: '5'
                },
              ],
            }
          },
          {
            title: '销售额',
            key: 'salesVolume',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '2000.0'
                },
                {
                  value: '1',
                  label: '3000.0'
                },
                {
                  value: '2',
                  label: '4000.0'
                },
              ],
            }
          },
          {
            title: '耗损金额',
            key: 'lossAmount',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '1000.0'
                },
                {
                  value: '1',
                  label: '2000.0'
                },
                {
                  value: '2',
                  label: '3000.0'
                },
              ],
            }
          },
          {
            title: '配送金额',
            key: 'deliveryAmount',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '100.0'
                },
                {
                  value: '1',
                  label: '200.0'
                },
                {
                  value: '2',
                  label: '300.0'
                },
              ],
            }
          },
          {
            title: '配送退回金额',
            key: 'deliveryBackAmount',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '100.0'
                },
                {
                  value: '1',
                  label: '200.0'
                },
                {
                  value: '2',
                  label: '300.0'
                },
              ],
            }
          },
          {
            title: '商品满足率',
            key: 'productFillRate',
            type: 'select',
            setUp: {
              placeholder: '（全部）',
              defaultSelected: '',
              data: [
                {
                  value: '0',
                  label: '10%'
                },
                {
                  value: '1',
                  label: '20%'
                },
                {
                  value: '2',
                  label: '30%'
                },
              ],
            }
          },
        ],
        data: [
          {
            serialNumber:'0',
            accountantMonth:'3',
            stockQuantity:'555',
            beginingMonth:'222',
            sellClassQuantity:'10',
            sellAndStockClassQuantity:'3',
            stockClassQuantity:'2',
            salesVolume:'5000.0',
            lossAmount:'1000.0',
            deliveryAmount:'100.0',
            deliveryBackAmount:'50.0',
            productFillRate:'10%',
          },
        ],
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
