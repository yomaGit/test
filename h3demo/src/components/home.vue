<template>
  <div class="body">
    <div class="menu_con">
      <ul>
        <li>其他操作(Q)</li>
        <li>邮件(F8)</li>
      </ul>
      <div class="clear"></div>
    </div>
    <div class="main_con">
      <div class="main_con_bg">
      <div class="time_con">
        <div class="time_left">当前时间: 2018-4-3 16:22:23</div>
        <div class="vip_right_con">
          <div class="score">会员积分：112345</div>
          <div class="tel">电话：13977998683</div>
        </div>
      </div>
      <div class="mx_con">
        <div class="list_con">
          <ul>
            <li>特组</li>
            <li>编码</li>
            <li style="width: 20%">品名</li>
            <li>单位</li>
            <li>数量</li>
            <li>标价</li>
            <li>折扣</li>
            <li>实价</li>
            <li>库存</li>
            <li>小计</li>
            <li>营业员</li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="goods_con">
            <ul v-for="(item,index) in buyList" @click="goodsClick(item.bm)" :style="{background:item.isSelected?'#0E83E5':'#ffffff',color:item.isSelected?'#ffffff':'#333333'}">
            <li>{{index+1}}</li>
            <li>{{item.bm}}</li>
            <li style="width: 20%">{{item.pm}}</li>
            <li>{{item.dw}}</li>
            <li style="display: flex">{{item.sl}}<div v-if="parseInt(item.sl)>parseInt(item.kc)">缺</div></li>
            <li>{{item.bj}}</li>
            <li>{{item.zk}}</li>
            <li>{{item.sj}}</li>
            <li>{{item.kc}}</li>
            <li>{{item.xj}}</li>
            <li>{{item.yyy}}</li>
            </ul>
        </div>

      </div>
        <div class="bottom_total_con">
          <div class="bottom_total">
            <div class="left">共{{buyList.length}}个商品</div>
            <div class="center">共{{buyList.length}}行</div>
            <div class="right">合计：{{xiaoji}}</div>
          </div>
        </div>
        <div class="manufacturer_con"></div>
      </div>
    </div>
    <div class="cz_bottom_con">
      <div class="kjfs_left_con">
        <div style="margin-left: 10px;font-size: 13px">快捷方式</div>
        <table>

          <tr>
            <td><div @click="shortcut(1)">数量/</div></td>
            <td><div @click="shortcut(2)">加入组J</div></td>
            <td><div @click="shortcut(3)">收款*</div></td>
          </tr>

          <tr>
            <td><div>实价R</div></td>
            <td><div>退出组O</div></td>
            <td><div>存取处方-</div></td>
          </tr>

          <tr>
            <td><div>单品折率S</div></td>
            <td><div>组剂数T</div></td>
            <td><div>拆零C</div></td>
          </tr>

          <tr>
            <td><div  @click="shortcut(10)">删除Del</div></td>
            <td><div>会员M</div></td>
            <td><div>营业员Y</div></td>
          </tr>

          <tr>
            <td><div @click="deleteAll">清除W</div></td>
            <td><div>整单折率A</div></td>
            <td><div @click="shortcut(15)">结账+</div></td>
          </tr>

        </table>
      </div>
      <div class="tj_right_con">
        <div class="shoukuan_con">
          <div style="font-size: 13px">收款方式</div>
          <div class="zonger">
            <div class="left">总额：</div>
            <div class="zonger_right">{{xiaoji.toFixed(2)}}</div>
          </div>
          <div class="zonger">
            <div class="left">已收：</div>
            <div  class="yishou_right">{{(parseFloat(ss_cash)+parseFloat(ss_czk)+parseFloat(ss_lqb)+parseFloat(ss_zfb)+parseFloat(ss_jfdx)+parseFloat(ss_djq)+parseFloat(ss_wechat_jfdx)).toFixed(2)}}</div>
          </div>
          <div class="cash_mind_con">
            <div class="left">其中：</div>
            <div class="center">现金</div>
            <div class="right">{{parseFloat(ss_cash).toFixed(2)}}</div>
          </div>
          <div class="ysk_con" v-if="(xiaoji-ss_cash-ss_czk-ss_lqb-ss_zfb-ss_jfdx-ss_djq-ss_wechat_jfdx)>0"><div>应收：</div><div>{{(xiaoji-(parseFloat(ss_cash)+parseFloat(ss_czk)+parseFloat(ss_lqb)+parseFloat(ss_zfb)+parseFloat(ss_jfdx)+parseFloat(ss_djq)+parseFloat(ss_wechat_jfdx))).toFixed(2)}}</div></div>
          <div class="ysk_con" v-else><div>找零：</div><div>{{Math.abs(xiaoji-(parseFloat(ss_cash)+parseFloat(ss_czk)+parseFloat(ss_lqb)+parseFloat(ss_zfb)+parseFloat(ss_jfdx)+parseFloat(ss_djq)+parseFloat(ss_wechat_jfdx))).toFixed(2)}}</div></div>
        </div>

        <div class="dqzt_con">
          <div style="font-size: 13px;margin-left: 4px">当前状态</div>
          <div class="dqzt">
            <div class="left">会计日：</div>
            <input type="text" v-model="kjr_time" ref="kjr_input"/>
          </div>
          <div class="dqzt">
            <div class="left">POS机号：</div>
            <input type="text" value="0001"/>
          </div>
          <div class="dqzt">
            <div class="left">收银员：</div>
            <input type="text"value="管理员/早班/晴"/>
          </div>
          <div class="dqzt">
            <div class="left">连接方式：</div>
            <input type="text"value="联机 销售"/>
          </div>
          <div class="spbm">{{spbm_msg}}</div>
          <input class="ss" v-model="input_value" @keyup="whichClick" @keyup.shift.56="shoukuanClick" v-focus v-select="{need:isNeedSelected_num}"  ref="spnm_input" @focus="inputFocus" value=""/>
        </div>
      </div>
    </div>
    <div v-if="shoukuan_bool" class="sk_tankuang_con">
      <div class="sk_con_absolute">
        <div class="sk_con">
          <div class="title_con"><div style="margin-left: 10px">上海海典软件股份有限公司</div><span @click="close"><img src="../assets/close_chahao.png"/></span></div>
          <div class="bor_con">
            <div class="buttons_con">
              <div class="fq">付清(空格)</div>
              <div class="sczk button_comm">刷储值卡(F5)</div>
              <div class="bjsz button_comm">本机设置(S)</div>
              <div class="qd button_comm">确定(Enter)</div>
              <div class="qx button_comm" @click="close">取消</div>
            </div>
            <div class="table_bg">
              <table>
                <tr class="align_center">
                  <td class="first width25"></td>
                  <td class="first width120"><div>收款方式</div></td>
                  <td class="first width120"><div>实收金额</div></td>
                  <td class="first width130"><div>卡号</div></td>
                  <td class="first width80"><div>卡类型</div></td>
                  <td class="first"><div>储值卡消费号</div></td>
                </tr>

                <tr>
                  <td class="width25 padding_left_3">1</td>
                  <td class="width120 padding_left_3"><div>现金</div></td>
                  <td class="width120"><input type="text" class="table_input padding_right_3 align_right" @focus="inputFocus" v-model="ss_cash" @keyup="keybClick($event,1)" v-focus ref="input_1"/></td>
                  <td class="width130"><input type="text" class="table_input padding_left_3" value=""></td>
                  <td class="width80"><input type="text" class="table_input padding_left_3" value=""></td>
                  <td><input type="text" class="table_input padding_left_3" value=""></td>
                </tr>

                <tr>
                  <td class="width25 padding_left_3">2</td>
                  <td class="width120 padding_left_3"><div>储值卡</div></td>
                  <td class="width120"><input type="text" class="table_input padding_right_3 align_right" @focus="inputFocus" v-model="ss_czk" @keyup="keybClick($event,2)" ref="input_2"/></td>
                  <td class="width130"><input type="text" class="table_input padding_left_3" value=""></td>
                  <td class="width80"><input type="text" class="table_input padding_left_3" value=""></td>
                  <td><input type="text" class="table_input padding_left_3" value=""></td>
                </tr>

                <tr>
                  <td class="padding_left_3">41</td>
                  <td class="width120 padding_left_3"><div>会员零钱包</div></td>
                  <td><input type="text" class="table_input padding_right_3 align_right" @focus="inputFocus" v-model="ss_lqb" @keyup="keybClick($event,41)" ref="input_41"/></td>
                  <td><div></div></td>
                  <td><div></div></td>
                  <td><div></div></td>
                </tr>

                <tr>
                  <td class="padding_left_3">50</td>
                  <td class="width120 padding_left_3"><div>支付宝</div></td>
                  <td><input type="text" class="table_input padding_right_3 align_right" @focus="inputFocus" v-model="ss_zfb" @keyup="keybClick($event,50)" ref="input_50"/></td>
                  <td><div></div></td>
                  <td><div></div></td>
                  <td><div></div></td>
                </tr>
                <tr>
                  <td class="padding_left_3">51</td>
                  <td class="width120 padding_left_3"><div>微信支付</div></td>
                  <td><input class="table_input padding_right_3 align_right" value="0.00" disabled /></td>
                  <td><div></div></td>
                  <td><div></div></td>
                  <td><div></div></td>
                </tr>

                <tr>
                  <td class="width25 padding_left_3">53</td>
                  <td class="width120 padding_left_3"><div>积分抵现</div></td>
                  <td class="width120"><input type="text" class="table_input padding_right_3 align_right" @focus="inputFocus" v-model="ss_jfdx" @keyup="keybClick($event,53)" ref="input_53"/></td>
                  <td class="width130"><input class="table_input padding_left_3" value=""></td>
                  <td class="width80"><input class="table_input padding_left_3" value=""></td>
                  <td><input class="table_input padding_left_3" value=""></td>
                </tr>

                <tr>
                  <td class="width25 padding_left_3">59</td>
                  <td class="width120 padding_left_3"><div>代金券</div></td>
                  <td class="width120"><input type="text" class="table_input padding_right_3 align_right"  @focus="inputFocus" v-model="ss_djq" @keyup="keybClick($event,59)" ref="input_59"/></td>
                  <td class="width130"><input class="table_input padding_left_3" value=""/></td>
                  <td class="width80"><input class="table_input padding_left_3" value="" /></td>
                  <td><input class="table_input padding_left_3" value=""></td>
                </tr>
                <tr>
                  <td class="padding_left_3">62</td>
                  <td class="width120 padding_left_3"><div>微信平台礼品券</div></td>
                  <td><input class="table_input padding_right_3 align_right" value="0.00" disabled/></td>
                  <td><div></div></td>
                  <td><div></div></td>
                  <td><div></div></td>
                </tr>

                <tr>
                  <td class="padding_left_3">63</td>
                  <td><div>微信平台积分抵现</div></td>
                  <td><input type="text" class="table_input padding_right_3 align_right" @focus="inputFocus" v-model="ss_wechat_jfdx" @keyup="keybClick($event,63)" ref="input_63"/></td>
                  <td><div></div></td>
                  <td><div></div></td>
                  <td><div></div></td>
                </tr>

                <tr>
                  <td class="padding_left_3">64</td>
                  <td class="width120 padding_left_3"><div>微信平台优惠券</div></td>
                  <td><input class="table_input padding_right_3 align_right" value="0.00" disabled /></td>
                  <td><div></div></td>
                  <td><div></div></td>
                  <td><div></div></td>
                </tr>

              </table>
            </div>
            <div class="table_bottom">
              <div style="margin-left: 20px">销售额：{{xiaoji.toFixed(2)}}</div>
              <div style="margin-left: 30px">已收：{{(parseFloat(ss_cash)+parseFloat(ss_czk)+parseFloat(ss_lqb)+parseFloat(ss_zfb)+parseFloat(ss_jfdx)+parseFloat(ss_djq)+parseFloat(ss_wechat_jfdx)).toFixed(2)}}</div>
              <div style="margin-left: 15px" v-if="(xiaoji-ss_cash-ss_czk-ss_lqb-ss_zfb-ss_jfdx-ss_djq-ss_wechat_jfdx)>0">应付余额：{{(xiaoji-ss_cash-ss_czk-ss_lqb-ss_zfb-ss_jfdx-ss_djq-ss_wechat_jfdx).toFixed(2)}}</div>
              <div style="margin-left: 15px" v-else>找零：{{Math.abs(xiaoji-ss_cash-ss_czk-ss_lqb-ss_zfb-ss_jfdx-ss_djq-ss_wechat_jfdx).toFixed(2)}}</div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="delSingle_bool" class="sk_tankuang_con">
      <div class="del_select_con">
        <div class="del_select_relative">
          <div style="text-align: center;padding-top: 8px;background: white;width: 198px">提示</div>
          <div style="padding-left: 10px;padding-top: 10px;">确定删除本条数据？</div>
          <div class="yn_con"><div class="y_div" @click="delRow">是(Y)</div><div class="n_div" @click="cancelDelRow">否(N)</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "home",
      data () {
        return {
          isNeedSelected_num:false,
          ss_cash:"0.00",//现金
          ss_czk:"0.00",//储值卡
          ss_lqb:"0.00",//零钱包
          ss_zfb:"0.00",//支付宝
          ss_jfdx:"0.00",//积分抵现
          ss_djq:"0.00",//代金券
          ss_wechat_jfdx:"0.00",//微信平台积分抵现
          spbm_msg:"商品编码",
          kjr_time:"",
          input_value:"",
          tempCode:13,//临时code 用于点enter键时区别是不是改数量、实价等
          selected_goods_code:"",
          shoukuan_bool:false,//收款弹窗
          delSingle_bool:false,//删除本条数据弹框
          goodsList: [
            {bm:"000123",pm:"金银花",dw:"盒",sl:"1",bj:"0.50",zk:"100.0",sj:"0.50",kc:"57",xj:"0.50",yyy:"",isSelected:false},
            {bm:"000124",pm:"清火片",dw:"盒",sl:"1",bj:"5.00",zk:"100.0",sj:"5.00",kc:"7",xj:"5.00",yyy:"",isSelected:false},
            {bm:"000125",pm:"菊花茶",dw:"盒",sl:"1",bj:"5.00",zk:"100.0",sj:"5.00",kc:"20",xj:"5.00",yyy:"",isSelected:false},
            {bm:"000126",pm:"999感冒灵",dw:"盒",sl:"1",bj:"15.00",zk:"100.0",sj:"15.00",kc:"10",xj:"15.00",yyy:"",isSelected:false},
            {bm:"000127",pm:"阿莫西林",dw:"盒",sl:"1",bj:"100.00",zk:"100.0",sj:"100.00",kc:"3",xj:"100.00",yyy:"",isSelected:false},
            {bm:"000128",pm:"儿童咀嚼片",dw:"瓶",sl:"1",bj:"35.00",zk:"100.0",sj:"35.00",kc:"57",xj:"35.00",yyy:"",isSelected:false},
            {bm:"000129",pm:"黄连口服液",dw:"盒",sl:"1",bj:"43.00",zk:"100.0",sj:"43.00",kc:"75",xj:"43.00",yyy:"",isSelected:false},
            {bm:"000130",pm:"桂林西瓜霜",dw:"盒",sl:"1",bj:"14.00",zk:"100.0",sj:"14.00",kc:"205",xj:"14.00",yyy:"",isSelected:false},
            {bm:"000131",pm:"碧生源减肥茶",dw:"盒",sl:"1",bj:"75.00",zk:"100.0",sj:"75.00",kc:"19",xj:"75.00",yyy:"",isSelected:false},
            {bm:"000132",pm:"西地碘含片",dw:"盒",sl:"1",bj:"50.00",zk:"100.0",sj:"50.00",kc:"35",xj:"50.00",yyy:"",isSelected:false}
          ],
          buyList:[],
          xiaoji:0.00

        }
      },
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          }
        },
        select:{
          update:function (el,binding) {
              if (binding.value.need){
                el.select();
              }
          }
        }
      },
      methods:{
        whichClick:function (e) {//监听商品编码输入框
          console.log(e.keyCode);
          var that=this;
          var keyCode=e.keyCode;
          if(keyCode==106){//收款*
            that.shoukuanClick();
          }else if(keyCode==191||keyCode==111){//数量/
            that.spbm_msg="单品数量";
            that.input_value="";
            that.tempCode=111;
            var buy=that.buyList;
            for (let i in buy) {
              if(buy[i].isSelected){
                that.input_value=buy[i].sl;
                that.isNeedSelected_num=true;
                break;
              }
            }

          }else if(keyCode==13){//enter
            // console.log(that.tempCode);
            var value = that.input_value;
            var data = that.goodsList;
            var buy = that.buyList;
             if (that.tempCode==13) {

               if (value.length == 0) {
                 return;
               }
               for (let j in buy) {
                 if (value == buy[j].bm) {//输入已存在商品
                   alert("已存在")
                   return;
                 }
               }
               for (let i in data) {
                 if (value == data[i].bm) {
                   that.buyList.push(data[i]);
                   that.xiaoji += parseFloat(data[i].xj);
                   break;
                 }
               }
               for (let j in buy) {
                 if (value == buy[j].bm) {
                   that.buyList[j].isSelected = true;
                   that.orginal_xj = buy[j].xj;
                 } else {
                   if (buy.length > 1) {
                     that.buyList[j].isSelected = false;
                   }
                 }
               }
             }else if(that.tempCode==111||that.tempCode==191){//修改数量后enter
               var selectCode;
               for (let i in buy) {
                 if(buy[i].isSelected){
                   selectCode=buy[i].bm;
                   break;
                 }
               }

               if(Number.isInteger(Number(value))&&buy.length>0){
                 for (let j in buy) {
                   if (selectCode == buy[j].bm) {
                     let orginal_xj=buy[j].xj/buy[j].sl;
                     // console.log("orginal_xj ="+orginal_xj)
                     buy[j].xj=Number(value)*orginal_xj;
                     that.xiaoji-=parseFloat(buy[j].sl)*orginal_xj;
                     buy[j].sl=value;
                     that.xiaoji+=parseFloat(buy[j].xj)
                     break;
                   }
                 }
               }
             }else if(that.tempCode==82){//实价R后 enter
               var selectCode;
               for (let i in buy) {
                 if(buy[i].isSelected){
                   selectCode=buy[i].bm;
                   break;
                 }
               }
                let temp_xj=0;
               for (let j in buy) {
                 if (selectCode == buy[j].bm) {
                   buy[j].sj=value;
                   buy[j].zk=((parseFloat(buy[j].sj)/parseFloat(buy[j].bj))*100).toFixed(2);
                   buy[j].xj=parseFloat(buy[j].sl)*parseFloat(buy[j].sj);
                 }
                 temp_xj+=parseFloat(buy[j].xj);
               }
               that.xiaoji=temp_xj;
             }
            // 重置默认值
            that.spbm_msg="商品编码";
            that.input_value="";
            that.tempCode=13;
          }else if(keyCode==87&&that.tempCode==13){//清除w
            that.input_value="";
            that.deleteAll();
          }else if(keyCode==46){//删除选中Del(不可用笔记本，因为笔记本del与键盘backspace keycode一致为8)
            if (this.buyList.length>0) {
              that.delSingle_bool = true;
            }
          }else if(keyCode==107){//结账+
            var ys_money=parseFloat(that.ss_cash)+parseFloat(that.ss_czk)+parseFloat(that.ss_lqb)+parseFloat(that.ss_zfb)+parseFloat(that.ss_jfdx)+parseFloat(that.ss_djq)+parseFloat(that.ss_wechat_jfdx);
            if(ys_money!=0){
              that.payMonery();
            }else {
              that.spbm_msg="付款不足"
              setTimeout(function () {
                that.spbm_msg="商品编码"
              },1000)
            }
             that.input_value="";
          }else if(keyCode==38){//上箭头
            var buy=that.buyList;
            var length=buy.length;
            var index=0;
            for (let i in buy) {
              if(buy[i].isSelected){
                index=parseInt(i);
                break;
              }
            }
            if(index!=0){
              that.buyList[index].isSelected=false;
              that.buyList[index-1].isSelected=true;
            }else {
              that.buyList[0].isSelected=true;
              that.buyList[1].isSelected=false;
            }
          }else if(keyCode==40) {//下箭头
            var length=that.buyList.length;
            var indx=0;
            for (let i in that.buyList) {
              if(that.buyList[i].isSelected){
                indx=parseInt(i);
                break;
              }
            }
            if(indx!=length-1){
              that.buyList[indx].isSelected=false;
              that.buyList[indx+1].isSelected=true;
            }else {
              that.buyList[length-2].isSelected=false;
              that.buyList[length-1].isSelected=true;
            }
          }else if(keyCode==89) {//Y
            that.delRow();
          }else if(keyCode==78) {//N
            that.cancelDelRow();
          }else if(keyCode==82){//实价R
            that.spbm_msg="实价：";
            that.input_value="";
            that.tempCode=82;
            var buy=that.buyList;
            for (let i in buy) {
              if(buy[i].isSelected){
                that.input_value=buy[i].sj;
                that.isNeedSelected_num=true;
                break;
              }
            }
          }
        },
        crtTimeFtt: function (){
          var d=new Date();
          var year=d.getFullYear();
          var month=change(d.getMonth()+1);
          var day=change(d.getDate());
          var hour=change(d.getHours());
          var minute=change(d.getMinutes());
          var second=change(d.getSeconds());
          function change(t){
            if(t<10){
              return "0"+t;
            }else{
              return t;
            }
          }
          this.kjr_time=year+'-'+month+'-'+day;
          return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    },

          //快捷键 收款*
        shoukuanClick:function () {
            this.shoukuan_bool=true;
          },
        goodsClick:function (code) {
          var that=this;
          var buy = that.buyList;
          for(let i in that.buyList){
            if(buy[i].bm==code){
              buy[i].isSelected=true;
            }else {
              buy[i].isSelected=false
            }
          }
        },

        //快捷方式点击
        shortcut:function (tag) {
          switch(tag)
          {
            case 1:
              break;
            case 2:
              break;
            case 3://收款
              this.shoukuan_bool=true;
              break;
            case 10://删除一条数据
              if (this.buyList.length>0){
                this.delSingle_bool=true;
              }
              break;
            case 15://结账
             this.payMonery();
              break;
            default:

          }

        },
        close:function () {
          this.shoukuan_bool=false;
          this.$refs.spnm_input.select();
          this.input_value="";
        },
      //  全部清除
        deleteAll:function () {
          var that=this;
          that.buyList=[];
          that.xiaoji=0.00
        },
        //删除单行 确定键
        delRow:function () {
          var that=this;
          var buy = that.buyList;
          for (let i in buy) {
            i=parseInt(i);
            if(buy[i].isSelected){
              that.xiaoji-=buy[i].xj;
              that.buyList.splice(i,1);
              let length=that.buyList.length;
              length=parseInt(length);
              if(i==length){
                let index=parseInt(i-1);
                 if(index>=0){
                   that.buyList[index].isSelected = true;
                 }

              }else {
                that.buyList[i].isSelected = true;
              }
              that.delSingle_bool=false;
              that.input_value="";
              break;
            }
          }
        },
        //删除单行，取消键
        cancelDelRow:function () {
          this.delSingle_bool=false;
          this.input_value="";
        },
        // 结账
        payMonery:function () {
          this.buyList=[];
          this.xiaoji=0.00;
          this.ss_cash="0.00";//现金
          this.ss_czk="0.00";//储值卡
          this.ss_lqb="0.00";//零钱包
          this.ss_zfb="0.00";//支付宝
          this.ss_jfdx="0.00";//积分抵现
          this.ss_djq="0.00";//代金券
          this.ss_wechat_jfdx="0.00";//微信平台积分抵现
        },
        //收款弹出框 键盘快捷键
        keybClick:function (e,tag) {

          var that=this;
          var code=e.keyCode
          // console.log(code,tag)
          if(code==32){//space
            if (tag==1){
              //注意：这里没有处理其他叠加方式支付钱数，只是简单将小计赋值给ss_cash
              that.ss_cash=that.xiaoji
            }else if(tag==2){
              that.ss_czk=that.xiaoji
            }else if(tag==41){
              that.ss_lqb=that.xiaoji
            }else if(tag==50){
              that.ss_zfb=that.xiaoji
            }else if(tag==53){
              that.ss_jfdx=that.xiaoji
            }else if(tag==59){
              that.ss_djq=that.xiaoji
            }else if(tag==63){
              that.ss_wechat_jfdx=that.xiaoji
            }
          }else if(code==40) {//下箭头
            switch (tag) {
              case 1:
                that.$refs.input_2.select();
                break;
              case 2:
                that.$refs.input_41.select();
                break;
              case 41:
                that.$refs.input_50.select();
                break;
              case 50:
                that.$refs.input_53.select();
                break;
              case 53:
                that.$refs.input_59.select();
                break;
              case 59:
                that.$refs.input_63.select();
                break;
              case 63:
                that.$refs.input_63.select();
                break;
            }
          }else if(code==38) {//下箭头
            switch (tag) {
              case 1:
                that.$refs.input_1.select();
                break;
              case 2:
                that.$refs.input_1.select();
                break;
              case 41:
                that.$refs.input_2.select();
                break;
              case 50:
                that.$refs.input_41.select();
                break;
              case 53:
                that.$refs.input_50.select();
                break;
              case 59:
                that.$refs.input_53.select();
                break;
              case 63:
                that.$refs.input_59.select();
                break;
            }
          } else if(code==13||code==27){// enter||esc
            that.close();
          }//还差刷储值卡F5 本级设置S 快捷键未完成
        },

        inputFocus:function (e) {
          e.currentTarget.select();
        }
      },
      watch:{//- 监听
        input_value:function (new_value, old_value) {
          if(this.isNeedSelected_num&&(old_value!="/"&&old_value!="r"&&old_value!="R")){
            this.isNeedSelected_num=false;
          }
        },
         kjr_time:function(new_value, old_value){
           this.$refs.kjr_input.value=new_value;
        },
        ss_cash: function (new_value, old_value) {
         this.ss_cash=new_value;
        },
        ss_czk: function (new_value, old_value) {
         this.ss_czk=new_value;
       },
        ss_lqb: function (new_value, old_value) {
        this.ss_lqb=new_value;
       },
        ss_zfb: function (new_value, old_value) {
        this.ss_zfb=new_value;
       },
        ss_jfdx: function (new_value, old_value) {
        this.ss_jfdx=new_value;
       },
        ss_djq: function (new_value, old_value) {
        this.ss_djq=new_value;
       },
        ss_wechat_jfdx: function (new_value, old_value) {
        this.ss_wechat_jfdx=new_value;
        },

      },
      created(){//- 创建 常用
       this.crtTimeFtt();
      },
      mounted(){
        // console.log("mounted")
      },
      updated(){//- 组件更新之后
        // console.log("updated")
      },

      destroyed(){//- 销毁
        // console.log("destroyed")
      },
      beforeRouteEnter(to, from, next){//- 进入路由，无this

        next(true);
      },
      beforeRouteUpdate(to, from, next){//- 路由改变，可this

        next(true);
      },
      beforeRouteLeave(to, from, next){//- 离开路由，可this

        next(true);
      }
    }
</script>

<style scoped>
  @import "../css/home.css";

</style>
