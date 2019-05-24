<template>
  <table class="table">
    <colgroup>
      <template v-for="colum in columnsData">
        <template v-for="item in dataColumnsWidth" v-if="colum.key==item.key">
          <col :style="{width:item.width ? item.width+'px' : false}" :key="colum.key"/>
        </template>
      </template>
    </colgroup>
    <tbody>
    <tr v-for="(item,index) in dataData" :key="item.key" :class="{isHover:objData[index].isHover}"
        @mouseenter="trMouseEnter(index)" @mouseleave="trMouseLeave(index)">
      <td
        v-for="colum in columnsData"
        :key="colum.key"
        :class="{'selection':colum.type=='selection' ? true : false,tableHidden:!fixAlign || fixAlign && fixAlign==colum.fixed ? false : true}"
      >

        <div class="table_cell"
             :class="colum.align ? colum.align : ''"
             :style="{paddingLeft:colum.paddingLeft,paddingRight:colum.paddingRight}"
        >
                <span>

                  <!--全选-->
                  <template v-if="colum.type=='selection'">
                    <Checkbox v-model="item.checked" @on-change="selectionChange(item.key,item.checked)"></Checkbox>
                  </template>

                  <!--链接-->
                  <template v-if="colum.type=='link'">
                    <a :href="colum.typeSet.href" :target="colum.typeSet.hrefTarget ? '_blank' : '_self'">{{item[colum.key]}}</a>
                  </template>

                  <!--button-->
                  <template v-else-if="colum.type=='button'" v-for="btn in colum.typeSet.btnList">

                    <!--button为自写的link-->
                    <template v-if="btn.type=='link'">
                      <span class="link" @click="btn.eventClick(item.key)">{{btn.text}}</span>
                    </template>

                    <!--button为iview的默认button-->
                    <template v-else>
                      <Button :type="btn.type" @click="btn.eventClick(item.key)">{{btn.text}}</Button>
                    </template>

                  </template>

                  <!--checkbox-->
                  <template v-else-if="colum.type=='checkbox'">
                    <Checkbox v-model="item[colum.key]"
                              @on-change="itemSelectChange(colum.typeSet.eventChange,item.key)"></Checkbox>
                  </template>

                  <!--input-->
                  <template v-else-if="colum.type=='input'">
                    <Input v-model="item[colum.key]"/>
                  </template>

                  <!--select框-->
                  <template v-else-if="colum.type=='itemSelect'">
                    <Select v-model="item[colum.key]" filterable
                            @on-change="selectChangeItem(colum.typeSet.eventChange)">
                      <Option v-for="item_c in colum.typeSet.data" :value="item_c.value" :key="item_c.value">{{ item_c.label }}</Option>
                    </Select>
                  </template>

                  <!--selectCheckbox框-->
                  <template v-else-if="colum.type=='itemSelectCheckbox'">

                    <div class="itemCheckbox" :class="'itemCheckbox'+item[colum.key]">
                       <Select v-model="item[colum.key]" @on-change="selectChangeItem(colum.typeSet.eventChange)">
                        <Option
                          v-for="item_c in colum.typeSet.data"
                          :value="item_c.value"
                          :key="item_c.value"
                          :class="'itemCheckbox_item itemCheckbox_item'+item_c.value"></Option>
                      </Select>
                    </div>

                  </template>

                  <template v-else-if="colum.renderData">
                    <Expand :key="item.key" :render="colum.renderData" :row="item" :index="index"></Expand>
                  </template>

                  <!--文字-->
                  <template v-else>
                    {{item[colum.key]}}
                  </template>

                </span>
        </div>
      </td>
      <td v-show="!fixAlign&&!fixedWidthAll"></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {deepCopy} from '../../../utils/assist'
  import Expand from './expand.js';

  export default {
    name: "tableBody",
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
      objData: Object,
    },
    data() {
      return {
        columnsData: this.columns,
        dataData: this.data,
        dataColumnsWidth: this.columnsWidth
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
    },
    watch: {
      columns: {
        handler() {
          setTimeout(() => {
            this.columnsData = deepCopy(this.columns);
          }, 0);
        },
        deep: true
      },
      data: {
        handler() {
          setTimeout(() => {
            this.dataData = deepCopy(this.data);
          }, 0);
        },
        deep: true
      },
      columnsWidth: {
        handler() {
          setTimeout(() => {
            this.dataColumnsWidth = deepCopy(this.columnsWidth);
          }, 0);
        },
        deep: true
      }
    },
    methods: {
      // 全选时的类目的复选框的选择
      selectionChange(key, val) {
        let _this = this;
        _this.$emit('select-change', key, val)
      },
      // 内容为checkbox时的选择事件
      itemSelectChange(pEvent, key) {
        if (pEvent) pEvent(key);
      },
      // item为select时选择事件
      selectChangeItem(pEvent) {
        if (pEvent) pEvent();
      },
      // tr的鼠标浮动enter事件
      trMouseEnter(index) {
        this.$emit('trMouseEnter', index);
      },
      // tr的鼠标浮动leave事件
      trMouseLeave(index) {
        this.$emit('trMouseLeave', index);
      },
    },
  }
</script>

<style>

</style>
