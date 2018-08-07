<template>
  <div>
    <header class="header">
      <div class="comp">
        <div class="name">{{platname}}</div>
        <div class="vers">{{version}}</div>
      </div>
      <ul class="ofun">
        <li class="l"><a href="javascript:;" class="a" @click="spreadscreen()"><span></span></a></li>
        <!--<li class="m"><a href="javascript:;" class="a"><span></span></a></li>-->
      </ul>
      <ul class="ofun fun">
        <li class="notice">
          <a href="javascript:;" class="a" @click.stop='notifiboxf'><span><em></em></span></a>
          <div class="noticebox" id="noticebox">
            <div class="name">消息中心</div>
            <ul>
              <li v-for="item in notifilist" @click='notificlick(item.id)'>
                <div class="img" :class="item.id"><span></span></div>
                <div class="tx">{{item.name}}</div>
                <div class="num" v-if="item.num>0">{{item.num}}</div>
              </li>
            </ul>
          </div>
        </li>
        <li class="help"><a :href="helpurl" class="a" target="_blank"><span></span></a></li>
        <li class="msg"><a :href="webchaturl" class="a" target="_blank"><span></span></a></li>
        <li class="quit"><a href="javascript:;" class="a"><span></span></a></li>
      </ul>
    </header>
    <nav class="navbar">
      <div class="username">
        <div class="img"><img :src="chainimg" class="img"></div>
        <div class="uname">{{chainname}}</div>
      </div>
      <div class="nav">
        <ul class="list">
          <li v-for="item in navlist" :class={res:item.clicked,active:item.selected,on:item.selected}>
            <a :href="item.url" class="a er" @click="navfirstclick(item.id)"><div class="abtn"><span :class="item.id"></span></div>{{item.name}}</a>
            <ul v-if="item.secondmenu">
              <li v-for="i in item.secondlist" :class={on:i.selected}><a :href="i.url" class="a">{{i.name}}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
<!--系统消息-->
    <div class="systemInfo systemInfo2" :class={hover:notifishow}>
      <div class="top">
        <ul>
          <li v-for="item in notifilist" :class={on:item.show} @click='changemsg(item.id)'><a href="javascript:;">{{item.name}}</a></li>
        </ul>
        <div class="closeSystemInfo" @click='notificlose'>×</div>
      </div>
      <div class="center">
        <ul class="systemInfoMsg_detail">
          <div class="dataLoading"><img src="../assets/loading.gif">数据加载中……</div>
          <li>
            <div class="systemInfoD_top">
              <div class="name floatLeft">9月22日药店加系统更新通知</div>
              <div class="res floatright"></div>
              <div class="clear"> </div>
            </div>
            <div class="systemInfoD_center"><pre>1、为符合《广告法》相关规定，药店加微信商城首页的banner栏，所有图片加上“广告”标识。  2、为符合《广告法》相关规定，1、为符合《广告法》相关规定，药店加微信商城首页的banner栏，所有图片加上“广告”标识。  2、为符合《广告法》相关规定，1、为符合《广告法》相关规定，药店加微信商城首页的banner栏，所有图片加上“广告”标识。  2、为符合《广告法》相关规定，1、为符合《广告法》相关规定，药店加微信商城首页的banner栏，所有图片加上“广告”标识。  2、为符合《广告法》相关规定，1、为符合《广告法》相关规定，药店加微信商城首页的banner栏，所有图片加上“广告”标识。  2、为符合《广告法》相关规定，</pre></div>
            <div class="systemInfoD_down">管理员发送于 2016-09-22 14：26：22<span class="dbtn"></span></div>
          </li>
          <li>
            <div class="systemInfoD_top">
              <div class="name floatLeft">这是商品名称</div>
              <div class="res floatright">审核不通过</div>
              <div class="clear"> </div>
            </div>
            <div class="systemInfoD_center">
              <div class="system_layer">
                <div class="sysLeft floatleft">产品编码：</div>
                <div class="sysRight floatleft">123456</div>
                <div class="clear"> </div>
              </div>
              <div class="system_layer">
                <div class="sysLeft floatleft">申请修改：</div>
                <div class="sysRight floatleft">
                  <table>
                    <thead>
                      <tr>
                        <td>修改前</td>
                        <td>修改内容</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>不良反应：无</td>
                        <td>不良反应：用于普通感冒或流行性 感冒引起的发热，也用于缓解轻至 中度疼痛如头痛，偏头痛，牙痛， 肌肉痛，神经痛，痛经。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="clear"> </div>
              </div>
            </div>
            <div class="systemInfoD_down">系统推送于 2016-09-22 14：26：22<span class="dbtn"></span></div>
          </li>
          <li>
            <div class="systemInfoD_top">
              <div class="name floatLeft">这是商品名称</div>
              <div class="res floatright">审核不通过</div>
              <div class="clear"> </div>
            </div>
            <div class="systemInfoD_center">
              <div class="system_layer">
                <div class="sysLeft floatleft">产品编码：</div>
                <div class="sysRight floatleft">123456</div>
                <div class="clear"> </div>
              </div>
              <div class="system_layer">
                <div class="sysLeft floatleft">失败图片：</div>
                <div class="sysRight floatleft">
                  <div class="imglayer">
                    <img src="../assets/test.jpg">
                    <div class="yx">这里是失败原因</div>
                  </div>
                  <div class="imglayer">
                    <img src="../assets/test.jpg">
                    <div class="yx">这里是失败原因</div>
                  </div>
                  <div class="imglayer">
                    <img src="../assets/test.jpg">
                    <div class="yx">这里是失败原因</div>
                  </div>
                  <div class="imglayer">
                    <img src="../assets/test.jpg">
                    <div class="yx">这里是失败原因</div>
                  </div>
                  <div class="imglayer">
                    <img src="../assets/test.jpg">
                    <div class="yx">这里是失败原因</div>
                  </div>
                  <div class="clear"> </div>
                </div>
                <div class="clear"> </div>
              </div>
            </div>
            <div class="systemInfoD_down">系统推送于 2016-09-22 14：26：22<span class="dbtn"></span></div>
          </li>
          <li>
            <div class="systemInfoD_center">
              <ul class="ts_top">
                <li>
                  <span class="left">用户昵称：</span>
                  <span class="right">微信昵称</span>
                </li>
                <li>
                  <span class="left">是否会员：</span>
                  <span class="right">是</span>
                </li>
                <li>
                  <span class="left">手机号：</span>
                  <span class="right">13256231245</span>
                </li>
                <li>
                  <span class="left">用户姓名：</span>
                  <span class="right">未知</span>
                </li>
                <li>
                  <span class="left">会员卡号：</span>
                  <span class="right">23123212123</span>
                </li>
                <li>
                  <span class="left">投诉时间：</span>
                  <span class="right">2017-08-03 15:34:56</span>
                </li>
                <div class="clear"> </div>
              </ul>
              <div class="ts_note">
                <div class="ts_notem">
                  <!--<div class="floatLeft left">该用户选择匿名留言，请不要打电话骚扰</div>&lt;!&ndash;匿名的时候&ndash;&gt;-->
                  <div class="floatLeft left">该用需要反馈，请看到后及时电话联系该顾客</div><!--需要反馈的时候-->
                  <div class="right floatRight">
                    <span class="ts_h">回访完请点击这里</span><!--回访-->
                    <!--<span class="ts_y">已于2017-09-22 12:23:34回访</span>&lt;!&ndash;回访完的时候&ndash;&gt;-->
                  </div>
                  <div class="clear"> </div>
                </div>
              </div>
              <div class="ts_down">
                <div class="left">投诉内容：</div>
                <div class="right">这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容这里是投诉内容</div>
                <div class="clear"> </div>
              </div>
            </div>
            <div class="systemInfoD_down">系统推送于 2016-09-22 14：26：22<span class="dbtn"></span></div>
          </li>
        </ul>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'navbar',
  props: ['navfirst','navsecond'],
  data(){
    return {
      navfirst_d:"",
      navsecond_d:"",
      platname:'药店加商户中心',
      version:'3.1.6',
      chainname:'我是连锁名称',
      chainimg:'http://ydjia.hydee.cn:8090/hwimg/static/images/goods/31/16B1BEAC82D340454AEE1B2C213682FC/120/1516678781889.jpg',
      helpurl:'ydjhelp/getfolderfile',//- 帮助中心链接
      webchaturl:'webchat/login.html',//- web通讯链接
      navlist:[
        {
          id:'gl',
          name:'概览',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:false,
          secondlist:[]
        },
        {
          id:'sp',
          name:'商品',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'dml',
              name:'产品对码',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'xpl',
              name:'新品申请',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'fzl',
              name:'商品分组',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'cpl',
              name:'我的产品库',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'mdl',
              name:'多门店商品',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'b2cl',
              name:'B2C商品',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'hszl',
              name:'回收站',
              url:'javascript:;',
              selected:false,
            }
          ]
        },
        {
          id:'dd',
          name:'订单',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'wppl',
              name:'未匹配发货门店的订单',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'syl',
              name:'所有订单',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'wscl',
              name:'微商城订单',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'syjl',
              name:'售药机订单',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'cfl',
              name:'处方需求',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'yx',
          name:'营销',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'yhql',
              name:'优惠券',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'dml',
              name:'电子DM单',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'xsl',
              name:'限时优惠(仅B2C可用)',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'lhl',
              name:'联合用药',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'sc',
          name:'H5商城',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'jsl',
              name:'介绍',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'jcl',
              name:'商城基础设置',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'mdl',
              name:'多门店商城',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'b2cl',
              name:'B2C商城',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'xcx',
          name:'微信小程序',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'sql',
              name:'小程序授权与发布',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'zfl',
              name:'支付设置',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'shxl',
              name:'B2C商城版小程序',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'yh',
          name:'用户',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'hyl',
              name:'会员列表',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'dxfl',
              name:'定向发券记录',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'sj',
          name:'数据',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'psl',
              name:'配送统计',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'sz',
          name:'设置',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:true,
          secondlist:[
            {
              id:'shl',
              name:'商户信息',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'wxl',
              name:'微信设置',
              url:'javascript:;',
              selected:false,
            },
            {
              id:'nbl',
              name:'内部链接',
              url:'javascript:;',
              selected:false,
            },
          ]
        },
        {
          id:'syj',
          name:'自动售药机',
          url:'javascript:;',
          clicked:false,
          selected:false,
          secondmenu:false,
          secondlist:[]
        },
      ],
      notifilist:[
        {
          id:'sm',
          name:'系统通知',
          num:0,
          show:false
        },
        {
          id:'cm',
          name:'审核消息',
          num:1,
          show:false
        },
        {
          id:'fm',
          name:'用户反馈',
          num:2,
          show:false
        }
      ],
      notifishow:false
    }
  },
  methods:{//- 方法
    init(){
      var that=this;
      var _props=that._props;//- 获取传入参数
      var navfirst=_props.navfirst;
      var navsecond=_props.navsecond;

      that.navfirst_d=_props.navfirst;
      that.navseconds_d=_props.navsecond;

      //- 初始化公共菜单
      if(navfirst&&navsecond){
        var navlist=that.navlist;
        for(let i=0;i<navlist.length;i++){
          let ni=navlist[i];
          if(ni.id==navfirst){
            ni.selected=true;
            ni.clicked=true;
            var nism=ni.secondmenu;
            if(nism){
              var nis=ni.secondlist;
              for(let j=0;j<nis.length;j++){
                var nisi=nis[j];
                if(nisi.id==navsecond){
                  nisi.selected=true;
                }
              }
            }
          }
        }
        that.navlist=navlist;
      }
    },

    quit(){
      //todo 退出的方法
      alert("退出的方法还没写");
//      location.href="merchant/login";
    },
    navfirstclick(id){
      var argid=id;
      var that=this;
      var navlist=that.navlist;
      for(let i=0;i<navlist.length;i++){
        let ni=navlist[i];
        ni.id==argid&&ni.secondmenu&&(ni.selected?ni.selected=false:ni.selected=true)
      }
    },
    spreadscreen(){
      var cla=document.getElementById("body").className;
      if(cla.indexOf("hidebar")>-1){
        cla=cla.replace(" hidebar","");
      }else{
        cla=cla.concat(" hidebar");
      }
      document.getElementById("body").setAttribute("class",cla);
    },
    notifiboxf(){
      var cla=document.getElementById("noticebox").className;
      if(cla.indexOf("slideDown")>-1){//- 系统通知弹框隐藏
        cla=cla.replace(" slideDown","");
      }else{
        cla=cla.concat(" slideDown");
      }
      document.getElementById("noticebox").setAttribute("class",cla);
    },
    notificlick(id){
      var that=this;

      var notifilist=that.notifilist;
      for(var i in notifilist){
        var ni=notifilist[i];
        ni.show=false;
        if(ni.id==id){
          ni.show=true;
        }
      }
      that.notifilist=notifilist;

      document.getElementById('cbg').style.display='block';
      that.notifishow=true;
    },
    changemsg(id){
      var that=this;

      var notifilist=that.notifilist;
      for(var i in notifilist){
        var ni=notifilist[i];
        ni.show=false;
        if(ni.id==id){
          ni.show=true;
        }
      }
      that.notifilist=notifilist;

      //todo 系统消息的数据处理
    },
    notificlose(){
      var that=this;
      that.notifishow=false;
      document.getElementById('cbg').style.display='none';
    }
  },
  watch:{//- 监听

  },
  created(){//- 创建
    this.init();
  },
  updated(){//- 组件更新之后

  },
  destroyed(){//- 销毁

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

<style>
  @import "../css/navbar.css";
</style>
