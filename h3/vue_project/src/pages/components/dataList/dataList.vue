<template>
  <div
    class="dataList"
    :class="{
      'alignLeft':textAlign=='left',
      'alignRight':textAlign=='right',
      'textNowrap':textNowrap
    }"
    :style="{padding:paddingLR ? `0 ${paddingLR}px` : false}">

    <div class="tableLimitWraper fixed fixed_left" v-if="fixedType.fixed&&fixedType.fixedL"
         :style="{width:fixedLeftWidth+'px'}"
         ref="leftBody"
    >
      <div class="tableBody">

        <div class="table_header" :class="{'select-head':selectionHead}" :style="{backgroundColor:columnsBGColor}">

          <table-header
            :columns="columnsDataLeft"
            :data="dataData"
            :columnsWidth="columnsWidth"
            fixAlign="left"
            @select-change-all="selectionChangeAll"
          ></table-header>

        </div>

        <div class="tableLimit"
             :style="{height:dataHeightLimitz ? dataHeightLimitz : false}"
             ref="leftLimit"
             @scroll="tableScroll"
             @mouseenter="setEnterState('left')"
        >

          <div class="table_body">

            <table-body
              :columns="columnsDataLeft"
              :data="dataData"
              :columnsWidth="columnsWidth"
              fixAlign="left"
              :objData="objData"
              @trMouseEnter="trMouseEnter"
              @trMouseLeave="trMouseLeave"
              @select-change="selectionChange"
            ></table-body>

          </div>

        </div>

      </div>
    </div>

    <div class="tableLimitWraper fixed fixed_right" v-if="fixedType.fixed&&fixedType.fixedR"
         :style="{width:fixedRightWidth+'px'}"
         id="rightBody"
         ref="rightBody"
    >
      <div class="tableBody">

        <div class="table_header" :class="{'select-head':selectionHead}" :style="{backgroundColor:columnsBGColor}">

          <table-header
            :columns="columnsDataRight"
            :data="dataData"
            :columnsWidth="columnsWidth"
            fixAlign="right"
            @select-change-all="selectionChangeAll"
          ></table-header>

        </div>

        <div class="tableLimit"
             :style="{height:dataHeightLimitz ? dataHeightLimitz : false}"
             ref="rightLimit"
             @scroll="tableScroll"
             @mouseenter="setEnterState('right')"
        >

          <div class="table_body">

            <table-body
              :columns="columnsDataRight"
              :data="dataData"
              :columnsWidth="columnsWidth"
              fixAlign="right"
              :objData="objData"
              @trMouseEnter="trMouseEnter"
              @trMouseLeave="trMouseLeave"
              @select-change="selectionChange"
            ></table-body>

          </div>

        </div>

      </div>
    </div>

    <div class="tableLimitWraper normalBody"
         ref="normalBody"
    >

      <div class="tableBody">

        <div class="table_header" :class="{'select-head':selectionHead}" :style="{backgroundColor:columnsBGColor}">

          <table-header
            :columns="columnsData"
            :data="dataData"
            :columnsWidth="columnsWidth"
            @select-change-all="selectionChangeAll"
          ></table-header>

        </div>

        <div class="tableLimit"
             :style="{height:dataHeightLimitz ? dataHeightLimitz : false}"
             @scroll="tableScroll"
             ref="normalLimit"
             @mouseenter="setEnterState('normal')"
        >

          <div class="table_body">

            <table-body
              :columns="columnsData"
              :data="dataData"
              :columnsWidth="columnsWidth"
              :objData="objData"
              @trMouseEnter="trMouseEnter"
              @trMouseLeave="trMouseLeave"
              @select-change="selectionChange"
            ></table-body>

          </div>

        </div>

      </div>

    </div>

    <div class="dataList_pager">
      <div class="fun">
        <div class="check">
          <Checkbox :indeterminate="indeterminate" v-model="checkAll_c" @click.prevent.native="checkAll"></Checkbox>
        </div>

        <ButtonGroup>
          <Button @click="delete_batch">删除</Button>
          <Button>导出</Button>
        </ButtonGroup>

      </div>
      <div class="r">
        <Page :current="pager.current" :total="1000" :page-size="pager.pageSize" show-sizer @on-change="pageChange"
              on-page-size-change="onShowSizeChange"/>
        <div class="totop" @click="scrollList">
          <div></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {oneOf, deepCopy, perTopoint} from '../../../utils/assist'
  import {on, off, getNode_class, hasClass} from '../../../utils/dom'

  import tableHeader from './tableHeader'
  import tableBody from './tableBody'

  import pager from '../pager'

  export default {
    name: "dataList",
    components: {pager},
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
      align: {
        type: String,
        validate(value) {
          return oneOf(value, ['center', 'left', 'right'])
        },
        default: 'center',
      },
      columnsBGColor: {
        type: String,
        default: null,
      },
      paddingLR: {
        type: String,
        default: null,
      },
      textNowrap: {
        type: Boolean,
        default: false,
      },
      dataHeightLimit: {
        type: String,
        default: null,
      },
    },
    components: {
      tableHeader,
      tableBody,
    },
    data() {
      return {
        indeterminate: false,
        checkAll_c: false,
        pager: {
          current: 1,
          pageSize: 10,
          total: 1000,
        },
        columnsData: this.columns,
        dataData: this.data,
        objData: this.getObjData(),
        textAlign: this.align,
        columnsWidth: [],
        tableWidth: 0,
        fixedLeftWidth: 0,
        fixedRightWidth: 0,
        enterState: null,
      }
    },
    computed: {
      // columns left
      columnsDataLeft() {
        let cd = deepCopy(this.columns)
        return cd.sort((a, b) => {
          if (b.fixed == 'left') return 1; else return -1;
        })
      },
      // columns right
      columnsDataRight() {
        let cd = deepCopy(this.columns)
        return cd.sort((a, b) => {
          if (b.fixed == 'right') return -1; else return 1;
        })
      },
      // dataHeightLimit计算出的宽度值
      dataHeightLimitz() {

        let _this = this;
        let dl = _this.dataHeightLimit;

        if (dl == null) {
          return false;
        } else {
          let selectBool = _this.columnsData.find((v) => {
            return v.type == 'select'
          })

          let hw = 51;
          if (selectBool) hw = 85;

          let nval = null;
          if (dl.indexOf('calc') > -1) {
            nval = dl.substring(0, dl.length - 1) + ` - ${hw}px)`;
          } else if (dl.indexOf('%') > -1) {
            nval = `calc(${dl} - ${hw}px)`
          } else {
            nval = `${parseInt(dl) - hw}px`;
          }

          return nval;
        }

      },
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
      // 是否存在fixed的元素，是left还是right
      fixedType() {
        let fixed = false;
        let fixedL = false;
        let fixedR = false;
        this.columnsData.forEach((v) => {
          if (v.fixed) {
            fixed = true;
            if (v.fixed == 'left') {
              fixedL = true;
            }
            if (v.fixed == 'right') {
              fixedR = true;
            }
          }
        })

        return {
          fixed,
          fixedL,
          fixedR,
        }
      }
    },
    methods: {
      init() {
        let _this = this;

      },
      // 初始化各个column的宽度
      resetColumnHeight() {
        let _this = this;
        _this.columnsWidth = [];

        let tableWidth = _this.$el.offsetWidth - 1;
        let sumWidth = 0;
        let sumMinWidth = 0;
        let noWidthLength = 0;

        _this.columnsData.forEach((v) => {
          if (v.width) {
            sumWidth += _this.getPerWidth(v.width, tableWidth)
          } else {
            noWidthLength++;
            if (v.minWidth) sumMinWidth += _this.getPerWidth(v.minWidth, tableWidth)
          }
        })

        let diffWidth = tableWidth - sumWidth - sumMinWidth;
        let columnWidth = 0;
        if (diffWidth > 0 && noWidthLength > 0) columnWidth = parseInt(diffWidth / noWidthLength);

        let arr = [];
        let allWidth = 0;
        let fixedLeftWidth = 0;
        let fixedRightWidth = 0;
        _this.columnsData.forEach((v) => {

          let vWidth = v.width ? _this.getPerWidth(v.width, tableWidth) : 0;
          let minWidth = v.minWidth ? _this.getPerWidth(v.minWidth, tableWidth) : 0;
          let maxWidth = v.maxWidth ? _this.getPerWidth(v.maxWidth, tableWidth) : 0;

          let width = columnWidth + minWidth

          if (v.width) {
            width = vWidth;
          } else {

            if (v.minWidth && width < minWidth) width = minWidth;
            if (v.maxWidth && width > maxWidth) width = maxWidth;

          }

          let fixed = v.fixed;

          arr.push({
            key: v.key,
            width,
            fixed: fixed ? fixed : false,
          })

          allWidth += width;

          if (fixed) {
            if (fixed == 'left') fixedLeftWidth += width;
            if (fixed == 'right') fixedRightWidth += width;
          }

        })

        _this.columnsWidth = arr;
        _this.tableWidth = allWidth;
        _this.fixedLeftWidth = fixedLeftWidth;
        _this.fixedRightWidth = fixedRightWidth;

        // 存在fixed为right的列表时，右侧列表要滚动到最右侧，出现滚动条
        _this.$nextTick(() => {
          _this.scrollLeft_fixedR();
        })
      },
      // 百分比转换成宽度
      getPerWidth(v, a) {
        if (v.indexOf('%') > -1) {
          return perTopoint(v) * a;
        } else {
          return parseInt(v);
        }
      },
      // objData赋值
      getObjData() {
        let data = {};
        this.data.forEach((v, i) => {
          const nv = deepCopy(v);
          nv.isHover = false;
          data[i] = nv;
        });
        return data;
      },
      // tr的mouseenter
      trMouseEnter(index) {
        this.objData[index].isHover = true;
      },
      // tr的mouseleave
      trMouseLeave(index) {
        this.objData[index].isHover = false;
      },
      // 设置当前浮动区域
      setEnterState(state) {
        this.enterState = state
      },
      // 多级滚动的交互
      tableScroll(e) {
        let _this = this;
        let scrollTop = e.target.scrollTop;

        let es = _this.enterState;
        if (es) {
          if (_this.$refs.rightLimit && es != 'right') _this.$refs.rightLimit.scrollTop = scrollTop;
          if (_this.$refs.leftLimit && es != 'left') _this.$refs.leftLimit.scrollTop = scrollTop;
          if (_this.$refs.normalLimit && es != 'normal') _this.$refs.normalLimit.scrollTop = scrollTop;
        }
      },
      // 存在fixed为right时滚动条的滚动
      scrollLeft_fixedR() {
        let _this = this;

        if (_this.$refs.rightBody) {
          setTimeout(() => {

            let checkWidth = 0;
            if (_this.columnsData[0].type == 'selection' && !_this.columnsData[0].width && !_this.columnsData[0].minWidth) checkWidth = '60';

            _this.$refs.rightBody.scrollLeft = _this.tableWidth - _this.fixedRightWidth + checkWidth + 20;
          }, 100)
        }
      },
      // 分页的页码改变
      pageChange(val) {
        console.log(val);
      },
      // 分页的size改变
      onShowSizeChange(pageSize) {
        this.pageSize = pageSize
      },
      //- 全选
      checkAll() {
        let _this = this;

        if (_this.indeterminate) {
          _this.checkAll_c = false;
          _this.indeterminate=false;
        } else {
          _this.checkAll_c = !_this.checkAll_c;
        }

        if (_this.checkAll_c) {
          _this.dataData.forEach(v => {
            v.checked = true;
          })
        } else {
          _this.dataData.forEach(v => {
            v.checked = false;
          })
        }

      },
      delete_batch() {

      },
      scrollList() {

      },
      // data单个复选框的事件
      selectionChange(key, val) {
        let _this = this;

        let allt = false, allf = false;

        _this.dataData.forEach((v) => {
          if (v.key == key) v.checked = val

          if ((v.key==key&&val)||(v.key!=key&&v.checked))
            allt = true;
          else
            allf = true;

        })

        if(!allt){// 没有选中的
          _this.indeterminate = false;
          _this.checkAll_c = false;
          _this.columnsData[0].checked = false;
        }else if(allt&&!allf){// 全部选中
          _this.indeterminate = false;
          _this.checkAll_c = true;
          _this.columnsData[0].checked = true;
        }else{// 一半半
          _this.indeterminate = true;
          _this.checkAll_c = false;
          _this.columnsData[0].checked = false;
        }

        _this.$emit('select-change', key, val)
      },
      // 全选时的头部复选框的选择
      selectionChangeAll(val) {
        let _this = this;
        _this.dataData.forEach((v) => {
          v.checked = val;
        })

        _this.$emit('select-change-all', val)
      },
    },
    watch: {
      columns: {
        handler() {
          // setTimeout(() => {
          //   this.columnsData = deepCopy(this.columns);
          // }, 0);
          this.resetColumnHeight();
        },
        deep: true
      },
      data: {
        handler() {
          this.objData = this.getObjData();
          setTimeout(() => {
            this.dataData = deepCopy(this.data);
          }, 0);
        },
        deep: true
      }
    },
    mounted() {
      let _this = this;
      _this.init();
      _this.resetColumnHeight();

      // 页面宽度变化值触发的宽度赋值待优化 TODO
      // on(window, 'resize', _this.resetColumnHeight());

    },
    destroyed() {
      // off(window, 'resize', this.resetColumnHeight);
    }
  }
</script>

<style lang="sass">
  @import "./index"
</style>
