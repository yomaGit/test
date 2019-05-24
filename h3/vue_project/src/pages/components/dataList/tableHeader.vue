<template>
  <table class="table">
    <colgroup>
      <template v-for="colum in columnsData">
        <template v-for="item in columnsWidth" v-if="colum.key==item.key">
          <col :style="{width:item.width ? item.width+'px' : false}" :key="colum.key"/>
        </template>
      </template>
    </colgroup>
    <tbody>
    <th
      v-for="(item,index) in columnsData"
      :key="item.key"
      :class="{'selection':item.type=='selection' ? true : false,tableHidden:!fixAlign || fixAlign && fixAlign==item.fixed ? false : true}"
    >

      <div class="table_cell"
           :class="{tooltip:item.tooltip,[item.align]:item.align ? item.align : ''}"
           :style="{paddingLeft:item.paddingLeft ? item.paddingLeft : false,paddingRight:item.paddingRight ? item.paddingRight : false}"
      >

        <div class="name">
          <template v-if="item.type=='selection'">
            <Checkbox v-show="item.hideHeadCheckbox ? false : true" v-model="item.checked"
                      @on-change="selectionChangeAll"></Checkbox>
          </template>
          <template v-else-if="!selectionHead&&item.renderHeader">
            <Expand :key="item.key" :render="item.renderHeader" row="1" :index="index"></Expand>
          </template>
          <template v-else>
            <span>{{item.title}}</span>
          </template>

          <template v-if="item.tooltip">
            <Tooltip :content="item.tooltipSet.content" :theme="item.tooltipSet.theme">
              <Button class="circel" icon="ios-help"></Button>
            </Tooltip>
          </template>

        </div>

        <div class="select" v-if="selectionHead" :style="{width:item.type=='select' ? item.typeSet.width+'px': false}">

          <template v-if="item.type=='select'">
            <Select
              v-if="item.type=='select'"
              v-model="item.typeSet.dataSelected"
              filterable
              :placeholder="item.typeSet.placeholder"
              @on-change="selectChange(item.typeSet.eventChange)">
              <Option v-for="item_c in item.typeSet.data" :value="item_c.value" :key="item_c.value">{{ item_c.label
                }}
              </Option>
            </Select>
          </template>
          <template v-else-if="item.renderHeader">
            <Expand :key="item.key" :render="item.renderHeader" :row="item" :index="index"></Expand>
          </template>

        </div>

      </div>

    </th>
    <th v-show="!fixAlign&&!fixedWidthAll"></th>
    </tbody>
  </table>
</template>

<script>
  import Expand from './expand.js';

  export default {
    name: "tableHeader",
    components: {Expand},
    props: {
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      columnsWidth: {
        type: Array,
        default() {
          return [];
        }
      },
      fixAlign: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        columnsData: this.columns,
        dataData: this.data,

      }
    },
    computed: {
      /**
       * 是否全部设置了宽度值
       * false 全部
       * true 不是全部
       * */
      fixedWidthAll() {
        return this.columnsData.find((v) => {
          return !(v.width || v.minWidth)
        })
      },
      /**
       * 是否存在头部为select框的元素
       * true 存在
       * false 不存在
       * */
      selectionHead() {
        return this.columnsData.find((v) => {
          return v.type == 'select'
        })
      },
    },
    methods: {
      // 全选时的头部复选框的选择
      selectionChangeAll(val) {
        this.$emit('select-change-all', val)
      },
      // 头部为select时选择事件
      selectChange(pEvent) {
        if (pEvent) pEvent();
      },
    }
  }
</script>

<style>

</style>
