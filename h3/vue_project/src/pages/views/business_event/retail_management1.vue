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

    <div class="listSqu">
      <div class="fun_c">
        <div class="search_condition">
          <div class="i"></div>
          <div class="c">
            <div class="name">信息</div>
            <Dropdown trigger="click" @on-click="searchClick">
              <a href="javascript:;">
                最近查询条件 <span class="icon"></span>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem v-for="item in search_condition" :key="item.id" :name="item.id">{{item.name}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="fr">
          <Button type="primary" class="add" @click="addShow">新增</Button>
          <Button type="primary" class="print">打印</Button>
        </div>
      </div>
      <div class="dataSqu_list">
        <dataList :columns="columns" :data="data" @select-change="changeSingle" columnsBGColor="#f2f2f2" textNowrap></dataList>
      </div>

    </div>

  </section>

</template>

<script>

  import {v4} from 'uuid'

  export default {
    name: 'retial_management1',
    data() {
      return {
        originColumns:[
          {
            type:'selection',
          },
          {
            title: '序号',
            key: 'serialNumber',
          },
          {
            title: '会计月',
            key: 'accountantMonth',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '1'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '3'
                },
              ],
            }
          },
          {
            title: '库存数量',
            key: 'stockQuantity',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '555'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '666'
                },
                {
                  id: this.$v4(),
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
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '555'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '666'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '777'
                },
              ],
            }
          },
          {
            title: '销售品种数',
            key: 'sellClassQuantity',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '555'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '666'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '777'
                },
              ],
            }
          },
          {
            title: '有销售且有库存品种数',
            key: 'sellAndStockClassQuantity',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
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
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '销售额',
            key: 'salesVolume',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '耗损金额',
            key: 'lossAmount',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '配送金额',
            key: 'deliveryAmount',
            type: 'select',
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '100.0'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '200.0'
                },
                {
                  id: this.$v4(),
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
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '100.0'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '200.0'
                },
                {
                  id: this.$v4(),
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
            typeSet: {
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '10%'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '20%'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '30%'
                },
              ],
            }
          },
          {
            title: '操作',
            key: 'operate',
            fixed:'right',
            modelaction:this.modelaction,
            modelshow:this.modelshow,
            renderHeader:(h,params)=>{
              return h('div', {
                  class: ['operation']
                },
                [
                  h('div', {
                    class: 'model_save'
                  }, [
                    h('div', {
                      class: 'search_btn'
                    }, '搜索'),
                    h('div', {
                      class: 'line'
                    }),
                    h('div', {
                      class: 'icon',
                      on: {
                        click: ()=>{
                          params.row.modelaction()
                        }
                      }
                    }, [h('div')])
                  ]),
                  h('div', {
                    class: 'ofun model_save_show',
                    style: {
                      'display': 'none'
                    },
                    on: {
                      click: ()=>{
                        params.row.modelshow()
                      }
                    }
                  }, '存为模板...')
                ]
              )
            },
            edit:this.dataEdit,
            delete:this.dataDelete,
            renderData:(h,params)=>{
              return h('div', {
                class:'dataOperate'
              }, [
                h('div', {
                    class: 'edit',
                    on: {
                      click: () => {
                        params.edit()
                      }
                    }
                  }, [h('div')]
                ),
                h('div', {
                    class: 'delete',
                    on: {
                      click: () => {
                        params.delete()
                      }
                    }
                  }, [h('div')]
                )
              ])
            },
          },
        ],



        columns: [
          {
            type:'selection',
            hideHeadCheckbox:true,
            width:'60',
            fixed:'left',
          },
          {
            title: '序号',
            key: 'serialNumber',
            width:'60',
          },
          {
            title: '会计月',
            key: 'accountantMonth',
            width:'120',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '1'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '3'
                },
              ],
            }
          },
          {
            title: '库存数量',
            key: 'stockQuantity',
            width:'135',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '555'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '666'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '777'
                },
              ],
            }
          },
          {
            title: '月初库存',
            key: 'beginingMonth',
            width:'130',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '555'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '666'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '777'
                },
              ],
            }
          },
          {
            title: '销售品种数',
            key: 'sellClassQuantity',
            width:'110',
            type: 'select',
            typeSet: {
              width: '90',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '555'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '666'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '777'
                },
              ],
            }
          },
          {
            title: '有销售且有库存品种数',
            key: 'sellAndStockClassQuantity',
            width:'180',
            type: 'select',
            typeSet: {
              width: '150',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '有库存品种数',
            key: 'stockClassQuantity',
            width:'120',
            type: 'select',
            typeSet: {
              width: '90',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '销售额',
            key: 'salesVolume',
            width:'130',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '耗损金额',
            key: 'lossAmount',
            width:'135',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '2'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '3'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '4'
                },
              ],
            }
          },
          {
            title: '配送金额',
            key: 'deliveryAmount',
            width:'135',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '100.0'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '200.0'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '300.0'
                },
              ],
            }
          },
          {
            title: '配送退回金额',
            key: 'deliveryBackAmount',
            width:'135',
            type: 'select',
            typeSet: {
              width: '100',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '100.0'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '200.0'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '300.0'
                },
              ],
            }
          },
          {
            title: '商品满足率',
            key: 'productFillRate',
            width:'120',
            type: 'select',
            typeSet: {
              width: '80',
              placeholder: '（全部）',
              dataSelected: '',
              data: [
                {
                  id: this.$v4(),
                  value: '0',
                  label: '10%'
                },
                {
                  id: this.$v4(),
                  value: '1',
                  label: '20%'
                },
                {
                  id: this.$v4(),
                  value: '2',
                  label: '30%'
                },
              ],
            }
          },
          {
            title: '操作',
            key: 'operate',
            width:'120',
            fixed:'right',
            modelaction:this.modelaction,
            modelshow:this.modelshow,
            renderHeader:(h,params)=>{
              return h('div', {
                  class: ['operation']
                },
                [
                  h('div', {
                    class: 'model_save'
                  }, [
                    h('div', {
                      class: 'search_btn'
                    }, '搜索'),
                    h('div', {
                      class: 'line'
                    }),
                    h('div', {
                      class: 'icon',
                      on: {
                        click: ()=>{
                          params.row.modelaction()
                        }
                      }
                    }, [h('div')])
                  ]),
                  h('div', {
                    class: 'ofun model_save_show',
                    style: {
                      'display': 'none'
                    },
                    on: {
                      click: ()=>{
                        params.row.modelshow()
                      }
                    }
                  }, '存为模板...')
                ]
              )
            },
            edit:this.dataEdit,
            delete:this.dataDelete,
            renderData:(h,params)=>{
              return h('div', {
                class:'dataOperate'
              }, [
                h('div', {
                    class: 'edit',
                    on: {
                      click: () => {
                        params.edit()
                      }
                    }
                  }, [h('div')]
                ),
                h('div', {
                    class: 'delete',
                    on: {
                      click: () => {
                        params.delete()
                      }
                    }
                  }, [h('div')]
                )
              ])
            },
          },
        ],
        data: [
          {
            key:v4(),
            checked:false,
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
          {
            key:v4(),
            checked:false,
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
          {
            key:v4(),
            checked:false,
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
          {
            key:v4(),
            checked:false,
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
          {
            key:v4(),
            checked:false,
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
        modelSave:false,
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
      searchClick(){
        //TODO
      },
      search_condition(){
        //TODO
      },
      addShow(){
        //TODO
      },
      // 右侧搜索右侧的按钮
      modelaction(){
        let _this=this;
        let val=_this.modelSave ? 'none' : 'flex';

        _this.modelSave=!_this.modelSave;

        _this.changeModel(val);
      },
      // 改变 存为模板 的显示状态
      changeModel(val){
        let dom=document.getElementsByClassName('model_save_show');
        for(let i=0;i<dom.length;i++){
          dom[i].style.display=val
        }
      },
      // 点击了存为模板
      modelshow(){
        this.modelaction();
      },
      dataEdit(){
        //TODO
        console.log('dataEdit 被点击了');
      },
      dataDelete(){
        //TODO
        console.log('dataDelete 被点击了');
      },
      // data单个复选框的事件
      changeSingle(key,val){
        let _this=this;

        _this.data.forEach((v) => {
          if (v.key == key) v.checked = val
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
