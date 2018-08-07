<template>
  <div class="test">
    <p>{{msg}} {{show}}</p>
    <p>
      <button class="abutton" @click="reverseMsg">点击翻转上面的数据</button>
    </p>
    <p>页面内容测试 {{content}}</p>
    <p>
      <button class="abutton" @click='toast("测试文字信息")'>点击测试toast</button>
      <button class="abutton" @click='toast("测试文字信息 1")'>点击测试toast 1</button>
    </p>
    <p>
      ajax获取上海市下的区：{{ areasnote }}
      <select v-if="areasj">
        <option v-for="items in areas" :value="items.id">
          {{items.name}}
        </option>
      </select>
    </p>
    <p>
      <input type="file" @change='imguploadtest'>
    </p>
    <p>
      上传的图片为：<span v-if="imguj"><img v-if="imguj" :src="imgur" class="imgup"></span>
    </p>
    <router-link to="/test0">跳转到test0的页面</router-link>
    <div class="element-ui">
      <div>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>

      <div style="margin: 20px 0">
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </div>

      <div>
        <el-button round>圆形按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </div>
    </div>

    <div class="lesstest">
      <div class="tb">测试文字</div>

      <div class="exbor">我是测试</div>

      <div class="testafter">测试after</div>

      <div class="testfontsize">测试文字大小计算 20px</div>

      <div class="extent">
        <div class="test">test</div>
        <div class="test1">test1</div>
      </div>

      <div class="radiustest"></div>

      <div class="border-radius"></div>

      <div class="testimport">测试引入</div>

    </div>

    <div class="sasstest">

      <div class="stest">我是文字</div>

    </div>

    <div class="sasstest_e">

      <div class="stest_e">测试文本</div>

      <div class="testhover">测试hover
        <div class="testhover-test">t</div>
      </div>

      <div class="testfont">测试font</div>

      <div class="testimport_ee">测试testimport</div>

      <div class="testextent0">测试extent0</div>

      <div class="testextent1">测试extent1</div>

      <div class="test">test 123 @warn</div>

      <div class="testif">test if</div>

      <div class="testaif">test @if</div>

      <ul>
        <li class="item-1">item1</li>
        <li class="item-2">item2</li>
        <li class="item-3">item3</li>
      </ul>

      <ul>
        <li class="a-test">a-test</li>
        <li class="b-test">b-test</li>
        <li class="c-test">c-test</li>
      </ul>

      <div class="testmodel">testmodel</div>

      <div id="sidebar">测试function</div>

      <div class="testimps">测试引入</div>

    </div>

    <div>
      测试koa接口
      <ul>
        <li v-for="item in koadata">
          {{item.id}}-{{item.date}}-{{item.name}}-{{item.address}}
        </li>
      </ul>
      <div>测试koa get接口 {{koadata_get.wname}}:{{koadata_get.wage}}</div>
      <div>测试静态json返回数据 name:{{koadata_tjson.name}},age:{{koadata_tjson.age}}</div>
    </div>

  </div>
</template>

<script>

  export default {//- 为模块指定默认输出
    name: 'HelloWorld',
    props: {
      //- 要传递的参数
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        msg: '这里是第一个.vue的页面 hello',
        content: "这里显示数据",
        areasnote: "上海市下的区获取中......",
        areasj: false,
        areas: [],
        imguj: false,
        imgur: "",
        koadata:'',
        koadata_get:{},
        koadata_tjson:{}
      }
    },
    methods: {//- 方法
      reverseMsg() {
        this.msg = this.msg.split("").reverse().join("");
      },
      toast(message) {
        this.$toast(message);
      },
      imguploadtest(event) {
        var that = this;
        var files = event.target.files || event.dataTransfer.files;
        if (files.length > 0) {
          let file = files[0];//- 单张上传

          that.$imgupload(file,"",function(d){
            if(d=="") {
              that.$toast("上传失败");
            }else{
//              var nd=JSON.parse(d);
              var imgUrl = d.imgartwork;//- 原图
              that.imguj=true;
              that.imgur=imgUrl;
              that.$toast("上传成功");
            }
          },function(){
            that.$toast("上传失败");
          })
        }
      },
      init() {
        var that = this;
        //      console.log(this._props.show);//- 获取传入参数

        var imgb = that.$baseurl.imgupload;
        console.log("图片上传地址为 " + imgb);

        that.$Ajaxy("post","http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea",{ parentid:"310100" },function(d){
          console.log("地址获取成功了 返回数据为上海市的区");
          that.areasnote="";
          that.areas=d.data;
          that.areasj=true;
        },function(){
          console.log("地址获取失败了");
        });

//        that.$Ajaxy("POST","http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea",{ parentid:"310100" },"json",function(d){
//          console.log("地址获取成功了 返回数据为上海市的区");
//          that.areasnote="";
//          that.areas=JSON.parse(d).data;
//          that.areasj=true;
//        },function(){
//          console.log("地址获取失败了");
//        });

        that.content = "页面初始化ajax，模拟数据获取，2s......";
        setTimeout(function () {
          that.content = "数据更新了";
        }, 2000)

//        测试es6

        let [a, b, c] = [1, 2, 3];
        console.log(a + " " + b + " " + c);

        let {foo, bar} = {foo: "aaa", bar: "bbb"};
        console.log(foo) // "aaa"
        console.log(bar) // "bbb"

        let obj = {};
        let arr = [];

        ({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});
        console.log(obj)
        console.log(arr);

        let {length: len} = 'hello';
        console.log(len)

        function add([x = 3, y = 4]) {
          console.log(x + y)
        }

        add([1, 2]); // 3
        add([]);

        let x = 1;
        let y = 2;

        [x, y] = [y, x];
        console.log(x + " " + y)

        var arr1 = ['a', 'b'];
        var arr2 = ['c'];
        var arr3 = ['d', 'e'];

        console.log([...arr1, ...arr2, ...arr3])

        for (let [index, elem] of ['a', 'b'].entries()) {
          console.log(index, elem);
        }

        let ta = [1, 2, 3]
        console.log(ta.includes(2))

        console.log([1, 2].includes(4))

        let testarr = [11, 22, 33, 44];
        testarr.forEach(function (a, b, c) {
          console.log(a + " " + b + " " + c);
        })

        let settest = new Set([1, 2, 3, 3, 4, 4, 5, 6])
        console.log(...settest)

        let testobj = {
          test0: '123',
          test1: '234',
          get tfun() {
            return this.test0 + this.test1
          }

        }
        let testobj1 = {
          test0: '123_t',
          test1: '234_t'
        }

        console.log(Reflect.get(testobj, 'tfun', testobj1));
        console.log(Reflect.get(testobj, 'tfun'));
        console.log(Reflect.get(testobj, 'test0'));

        Reflect.set(testobj, 'test1', '234_set')
        console.log(Reflect.get(testobj, 'test1'))

        console.log('test0' in testobj1)
        console.log(Reflect.has(testobj1, 'test0'))

        for (let i = 0; i < 10; i++) {
          if (i == 5) break;
          console.log(i)
        }

        let testarr_new = ['red', 'blue', 'yellow']
        for (let i of testarr_new) {
          console.log(i)
        }
        testarr_new.forEach(function (v, i) {
          console.log(i + " " + v)
        })
        for (let j in testarr_new) {
          console.log(j + " " + testarr_new[j])
        }

        let tgn = that.testgen();
        console.log(tgn.next())
        console.log(tgn.next())
        console.log(tgn.next())
        console.log(tgn.next())

        var tformd={
          name:'linda',
          age:12
        }
        that.$Ajaxy('POST','http://192.168.10.65:3000/getJson',tformd,function(d){
          that.koadata=d;
        },function(){

        })

        var tformd_get={
          name:'bob',
          age:12
        }
        that.$Ajaxy('GET','http://192.168.10.65:3000/get',tformd_get,function(d){
          that.koadata_get=d;
        },function(){

        })

        var tformd_pd0={
          mercode:123
        }
        that.$Ajaxy('POST','http://192.168.10.65:3000/getdata/post1',tformd_pd0,function(d){
          that.koadata_tjson=d;
        },function(){

        })

//        -测试ajax中转
        var tformd_pd_zz={

        }
        that.$Ajaxy('POST','http://192.168.10.65:3000/getzzb2c',tformd_pd_zz,function(d){
          console.log("中转返回值");
        },function(){

        })

//        that.$axios.post('http://192.168.10.65:3000/getJson', {
//          method: 'post',
//          headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json',
//          },
//        }).then(function (res) {
//
//          that.koadata=res;
//
//        }).then(function (json) {
//
//        })

      },
      * testgen() {
        yield 'test0'
        yield 'test1'
      }
    },
    watch: {//- watch 监测
      msg(val) {
        console.log("watch 监听到msg发生了变化 变化后的值为'" + val + "'");
      }
    },
    created() {//- vue创建后，进入页面执行一次
      console.log("created vue节点创建后，进入页面后执行（一次），页面初始化");
      this.init();
    },
    updated() {//- 组件更新之后
      console.log("updated 组件data参数更新之后");
    },
    destroyed() {
      console.log("destroyed 销毁");
    },
    beforeRouteEnter(to, from, next) {
      console.log("helloworld beforeRouteEnter 进入了路由");
      next(true);
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate(to, from, next) {
      console.log("helloworld beforeRouteUpdate 路由改变，组件被复用");
      next(true);
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from, next) {
      console.log("helloworld beforeRouteLeave 离开了路由");
      next(true);
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    }
  }
</script>

<style lang="less">
  @import "../lesstest.less";
</style>

<style lang="sass">
  @import "../sasstest.scss"
  @import "../sasstest_e.sass"
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  p {
    color: #333333;
  }

  abutton {
    padding: 3px 5px;
    cursor: pointer;
    background: #e0e0e0;
  }

  abutton:hover {
    background: #eeeeee;
  }

  .imgup {
    width: 200px;
    height: auto;
  }
</style>
