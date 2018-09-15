<template>
  <div>
    <navbar ref="navbar"></navbar>
    <section class="content">
      <div class="squ" style="width: 100%;height: 200px;background: #ffffff;"></div>

      <div class="list">

        <div class="list_scroll_limit">
          <div class="list_scroll">
            <ul class="list_head">

              <li v-for="item in datalist.head" :class="item.class">
                <template v-if="item.name">
                  <div class="name">{{item.name}}</div>

                  <div class="operation" v-if="item.mode">

                    <template v-if="item.mode=='select'">
                      <a-select
                        showSearch
                        :placeholder="item.placeholder"
                        :style="'width: '+item.select_width"
                        optionFilterProp="children"
                        :filterOption="item.filter"
                        :defaultValue="item.select_val.smsg"
                      >

                        <a-select-option v-for="item_c in item.select_val.list" :key="item_c.id" :value="item_c.msg">{{item_c.msg}}</a-select-option>

                      </a-select>
                    </template>

                  </div>

                </template>
              </li>

            </ul>
            <ul class="list_main">

              <li v-for="item in datalist.list">
                <ul>
                  <li class="checkbox">
                    <a-checkbox v-model="item.checked" @change="change_s"></a-checkbox>
                  </li>
                  <li class="serial_num">{{item.serial_num}}</li>
                  <li class="accountant">{{item.accountant}}</li>
                  <li class="stock">{{item.stock}}</li>

                  <template  v-for="i in 11">
                    <li class="stock">{{item.stock}}</li>
                  </template>

                </ul>
              </li>

            </ul>
          </div>
        </div>

        <div class="list_foot">

          <div class="fun">
            <div class="check">
              <a-checkbox v-model="checkAll_c" @change="checkAll"></a-checkbox>
            </div>

            <a-button-group >
              <a-button>删除</a-button>
              <a-button>导出</a-button>
            </a-button-group>

          </div>
          <div class="r">
            <pager></pager>
            <div class="totop">Click To Top</div>
          </div>

        </div>

      </div>


    </section>
  </div>
</template>

<script>
  import navbar from '../../moudles/navbar'
  import pager from '../../moudles/pager'

  export default {
    name: 'retial_management',
    components: {navbar,pager},
    data() {
      return {
        datalist:{
          head:[
            {
              class:'checkbox'
            },
            {
              class:'serial_num',
              name:'序号'
            },
            {
              class:'accountant',
              name:'会计月',
              mode:'select',
              select_width:'65px',
              placeholder:'（全部）',
              filter:this.filterOption,
              select_val:{
                sid:0,
                smsg:1,
                list:[
                  {
                    id:0,
                    msg:'1'
                  },
                  {
                    id:1,
                    msg:'2'
                  },
                  {
                    id:2,
                    msg:'3'
                  }
                ]
              }

            },
            {
              class:'stock',
              name:'库存数量',
              mode:'select',
              select_width:'105px',
              placeholder:'（全部）',
              filter:this.filterOption,
              select_val:{
                sid:0,
                smsg:undefined,
                list:[
                  {
                    id:0,
                    msg:'库存0'
                  },
                  {
                    id:1,
                    msg:'库存1'
                  },
                  {
                    id:2,
                    msg:'库存2'
                  }
                ]
              }

            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
            {
              class:'stock',
              name:'占位',
            },
          ],
          list:[
            {
              checked:true,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
            {
              checked:false,
              serial_num:1,
              accountant:3,
              stock:'123',
            },
          ]
        },
        checkAll_c:false


      }
    },
    methods: {//- 方法
      init() {

      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      checkAll(){
        let that=this;
        let c=that.checkAll_c;
        let list= that.datalist.list;
        if(c){
          for(let i=0;i< list.length;i++){
            list[i].checked=true;
          }
        }else{
          for(let i=0;i< list.length;i++){
            list[i].checked=false;
          }
        }

      },
      change_s(){
        let that=this;

        let allt=false,allf=false;

        that.datalist.list.forEach((val)=>{
          if(val.checked)
            allt=true;
          else
            allf=true;
        })

        if(allt&&!allf)
          that.checkAll_c=true;
        else
          that.checkAll_c=false;

      }

    },
    mounted() {//- 创建 常用
      this.init();
    },
  }
</script>

<style lang="sass">
  @import "../../../css/business_event/retail_management/index"
</style>
