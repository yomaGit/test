
require(["vue"],function(Vue){

    Vue.component('my-component', {
        template:
            "<div>" +
            "   <div class=\"top\" v-if=\"dfhuo\">您有一个新的<span>待发货</span>订单</div><!--待发货的时候-->" +
            "   <div class=\"top\" v-if=\"dthuo\">您有一个新的<span>待提货</span>订单</div><!--待提货的时候-->" +
            "   <ul class=\"ddts_ul\">" +
            "       <li v-for=\"item in urlarr\">" +
            "           <div class=\"left\">{{item.name}}</div>" +
            "           <div class=\"right\">" +
            "               <a :href=\"'tel:'+item.val\" v-if=\"item.ja\">{{item.val}}</a>" +
            "               <template v-else>{{item.val}}</template>" +
            "           </div>" +
            "       </li>" +
            "     </ul>" +
            "     <a href=\"javascript:;\" id=\"btn_l\" class=\"ddts_btn\" v-if=\"dfhuo\"><span>顾客已付款，立即去发货</span></a><!--已付款，代发货的时候，链接的末尾是订单的id-->" +
            "     <a href=\"javascript:;\" id=\"btn_l\" class=\"ddts_btn\" v-if=\"dthuo\"><span>顾客货到付款，立即去发货</span></a><!--待提货的时候-->" +
            "     <a href=\"http://a.app.qq.com/o/simple.jsp?pkgname=com.hydee.ydjbusiness\" id=\"btn_d\" class=\"ddts_btn\"><span>还没安装药店加商户APP？现在就下载</span></a>" +
            "</div>",
        props :["dfhuo","dthuo","urlarr"]
    })

    var toApp=new Vue({
        el:"#toApp",
        data:{
            dfhuo:false,
            dthuo:false,
            urlarr:[
                {
                    name:"订单号",
                    val:"-",
                    ja:false
                },
                {
                    name:"订单金额",
                    val:"-",
                    ja:false
                },
                {
                    name:"收货人",
                    val:"-",
                    ja:false
                },
                {
                    name:"联系电话",
                    val:"-",
                    ja:true
                },
                {
                    name:"收货地址",
                    val:"-",
                    ja:false
                },
                {
                    name:"订单状态",
                    val:"-",
                    ja:false
                },
                {
                    name:"下单时间",
                    val:"-",
                    ja:false
                },
                {
                    name:"发货门店",
                    val:"-",
                    ja:false
                },
                {
                    name:"门店电话",
                    val:"-",
                    ja:false
                }
            ],
            orderId:""
        },

        created:function(){
            var that=this;
            setTimeout(function(){
                that.dfhuo=true;
                that.dthuo=false;
                that.urlarr=[
                    {
                        name:"订单号",
                        val:"2010123",
                        ja:false
                    },
                    {
                        name:"订单金额",
                        val:"22.2",
                        ja:false
                    },
                    {
                        name:"收货人",
                        val:"张三",
                        ja:false
                    },
                    {
                        name:"联系电话",
                        val:"1234567890",
                        ja:true
                    },
                    {
                        name:"收货地址",
                        val:"禹州国际",
                        ja:false
                    },
                    {
                        name:"订单状态",
                        val:"待发货",
                        ja:false
                    },
                    {
                        name:"下单时间",
                        val:"2018-11-23",
                        ja:false
                    },
                    {
                        name:"发货门店",
                        val:"金桥店",
                        ja:false
                    },
                    {
                        name:"门店电话",
                        val:"12091333978",
                        ja:true
                    }
                ];
                that.orderId="12345";
                setTimeout(function(){
                    that.getMlink();
                    document.getElementsByClassName("loadingLogin")[0].style.display="none";
                },1)
            },1000)
        },
        methods:{
            getMlink:function(){
                var orderId=this.orderId;
                new Mlink({
                    mlink : "AKIW",
                    button : document.querySelector("#btn_l"),
                    params: {
                        orderDetail:"orderDetail",
                        orderId:orderId
                    }
                });
            }
        },
        mounted:function(){

        },
        updated:function(){

        }
    })

})

require(["fastclick"],function(FastClick){
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
})