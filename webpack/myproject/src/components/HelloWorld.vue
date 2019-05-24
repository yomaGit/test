<template>
  <div class="test">
    <p>{{msg}} {{show}}</p>
    <p>
      <button class="abutton" @click="reverseMsg">点击翻转上面的数据</button>
    </p>
    <p>页面内容测试 {{content}}</p>
    <p>
      <button class="abutton" @click='toast("测试文字信息")' v-stat="{type:'click',fun:'测试toast'}">点击测试toast</button>
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
      上传的图片为：<span v-if="imguj"><img v-if="imguj" :src="imguj" class="imgup"></span>
    </p>
    <router-link to="/test0">跳转到test0的页面</router-link>
    <!--<div class="element-ui">-->
    <!--<div>-->
    <!--<el-button>默认按钮</el-button>-->
    <!--<el-button type="primary">主要按钮</el-button>-->
    <!--<el-button type="success">成功按钮</el-button>-->
    <!--<el-button type="info">信息按钮</el-button>-->
    <!--<el-button type="warning">警告按钮</el-button>-->
    <!--<el-button type="danger">危险按钮</el-button>-->
    <!--</div>-->

    <!--<div style="margin: 20px 0">-->
    <!--<el-button plain>朴素按钮</el-button>-->
    <!--<el-button type="primary" plain>主要按钮</el-button>-->
    <!--<el-button type="success" plain>成功按钮</el-button>-->
    <!--<el-button type="info" plain>信息按钮</el-button>-->
    <!--<el-button type="warning" plain>警告按钮</el-button>-->
    <!--<el-button type="danger" plain>危险按钮</el-button>-->
    <!--</div>-->

    <!--<div>-->
    <!--<el-button round>圆形按钮</el-button>-->
    <!--<el-button type="primary" round>主要按钮</el-button>-->
    <!--<el-button type="success" round>成功按钮</el-button>-->
    <!--<el-button type="info" round>信息按钮</el-button>-->
    <!--<el-button type="warning" round>警告按钮</el-button>-->
    <!--<el-button type="danger" round>危险按钮</el-button>-->
    <!--</div>-->
    <!--</div>-->

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

      <div>测试forEach
        <ul>
          <li v-for="item in testarr_new">
            {{item}}
          </li>
        </ul>
      </div>

      <div>
        测试filter
        <ul>
          <li v-for="item in testarr_new_filter">{{item}}</li>
        </ul>
      </div>

    </div>

    <!--<div>-->
    <!--<a-button type="primary">Primary</a-button>-->
    <!--<a-button>Default</a-button>-->
    <!--<a-button type="dashed">Dashed</a-button>-->
    <!--<a-button type="danger">Danger</a-button>-->
    <!--</div>-->

    测试watch的immediate<br/>
    <input type="text" v-model="testInputVal" style="border: 1px solid red;">
    <br/>
    测试input插件,Input插件的attr都会映射到子组件里<br/>
    <testInput placeholder="我是父组件的placeholder" v-model="testInputVal_$attr"></testInput>
    <br/>
    测试div的显示v-model<br/>
    <divToggle v-model="testToggle_v" ref="divToggle"></divToggle>
    <button @click="changeDiv_toggle">父组件的改变div显示状态</button>

    <hr/>

    测试directive的input focus 3s后消失 解绑 ， 再3s后 绑定
    <template v-if="testUnbind_autoFocus">
      <input type="text" v-autoFocus>
    </template>

    <br/>
    测试npm 发布的插件 pubtest_wp
    <toast></toast>
    <button @click="toastTest('i am toast1')">toast 'i am toast1'</button>
    <button @click="toastTest('i am toast2')">toast 'i am toast2'</button>

    <button @click="testerror">点击触发同步报错</button>
    <button @click="testerror_promise">点击触发异步promise报错</button>
    <button @click="testerror_async">点击触发异步async报错</button>


  </div>
</template>

<script>
  import testInput from './input'
  import divToggle from './divtoggle'
  import mixin from '../mixins/mixin_0'
  import autoFocus from '../directives/autoFocus'
  import stat from '../directives/stat'

  import {getAttrList, postError} from '../ajax/getData'

  export default {//- 为模块指定默认输出
    name: 'HelloWorld',
    components: {testInput, divToggle},
    mixins: [mixin],
    directives: {autoFocus, stat},
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
        testarr_new: [
          "yellow",
          "blue",
          "red"
        ],
        testgenter: '',
        testInputVal: '111',
        testInputVal_$attr: '223',
        testToggle_v: true,
        testUnbind_autoFocus: true
      }
    },
    computed: {//- 计算属性
      testarr_new_filter: function () {
//        return this.testarr_new.sort(function(a,b){
//          return a.length>b.length;
//        })
        return this.testarr_new.filter(function (v) {
          return v == 'red'
        })

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

          that.$imgupload(file, "", function (d) {
            if (d == "") {
              that.$toast("上传失败");
            } else {
//              var nd=JSON.parse(d);
              var imgUrl = d.imgartwork;//- 原图
              that.imguj = true;
              that.imgur = imgUrl;
              that.$toast("上传成功");
            }
          }, function () {
            that.$toast("上传失败");
          })
        }
      },
      init() {
        var that = this;
        //      console.log(this._props.show);//- 获取传入参数

        setTimeout(() => {
          that.testUnbind_autoFocus = false;
        }, 3000)

        setTimeout(() => {
          that.testUnbind_autoFocus = true;
        }, 6000)

        var imgb = that.$baseurl.imgupload;
        console.log("图片上传地址为 " + imgb);

        // const getattr = function(){
        //   let tpromise=new Promise(function(resolve,reject){
        //
        //     let data=that.$qs.stringify({ parentid:"310100" });
        //
        //     that.$axios({
        //       url: 'http://ydjcs.hydee.cn:80/ydj-platform/area/queryareaa',
        //       method: 'post',
        //       data: data
        //     }).then(function (d) {
        //       resolve(d)
        //     }).catch(function () {
        //       reject()
        //     })
        //
        //   });
        //
        //   return tpromise;
        // }

        // new Promise(function(resolve,reject){
        //   let a=undefined;
        //   let b=a.length;
        //   let data=that.$qs.stringify({ parentid:"310100" });
        //
        //   that.$axios({
        //     url: 'http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea',
        //     method: 'post',
        //     data: data
        //   }).then(function (d) {
        //
        //     if(d.status===200){
        //       resolve(d.data)
        //     }else{
        //       reject()
        //     }
        //
        //   }).catch(function () {
        //     reject()
        //   })
        //
        // }).then(function(d){
        //
        //   try{
        //     console.log("地址获取成功了 返回数据为上海市的区");
        //     that.areasnote="";
        //     that.areas=d.data;
        //     that.areasj=true;
        //
        //     let a=undefined;
        //     let b=a.length;
        //
        //   }catch(e){
        //     console.log('%ccatch error','color:blue');
        //   }
        //
        //
        // },function(){
        //   console.log("%c地址获取失败了","color:blue");
        // }).catch(()=>{
        //   console.log('%cpromise error','color:blue');
        // })
        // let aa=undefined;
        // let bb=aa.length;
        // new Promise((resolve,reject)=>{
        //
        //   that.$Ajaxy("post","http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea1",{ parentid:"310100" },function(d){
        //     resolve(d);
        //   },function(){
        //     reject();
        //   });
        // }).then((d)=>{
        //   console.log("地址获取成功了 返回数据为上海市的区");
        //   console.log(d);
        //   that.areasnote="";
        //   that.areas=d.data.data;
        //   that.areasj=true;
        //
        //   let a=undefined;
        //   let b=a.length;
        //
        // },()=>{
        //   console.log("%c地址获取失败了 reject",'color:blue');
        // }).catch((e)=>{
        //   console.log('%cpromise then里的 error','color:blue');
        // })

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

        console.log("reflect:" + Reflect.get(testobj, 'tfun', testobj1));
        console.log("reflect:" + Reflect.get(testobj, 'tfun'));
        console.log("reflect:" + Reflect.get(testobj, 'test0'));

        Reflect.set(testobj, 'test1', '234_set')
        console.log(Reflect.get(testobj, 'test1'))

        console.log('test0' in testobj1)
        console.log(Reflect.has(testobj1, 'test0'))

        for (let i = 0; i < 10; i++) {
          if (i == 5) break;
          console.log(i)
        }

        let testarr_new = that.testarr_new;
        for (let i of testarr_new) {
          console.log(i)
        }
        testarr_new.forEach(function (v, i) {
          console.log(i + " " + v)
          if (i == 1) testarr_new[i] = "testchange";
        })
        for (let j in testarr_new) {
          console.log(j + " " + testarr_new[j])
        }

        let tgn = that.testgen();
        console.log(tgn.next())
        console.log(tgn.next())
        console.log(tgn.next())
        console.log(tgn.next())

        let testarrfilter = [1, 2, 3, 4, 6, 7, 8, 9];
        let conarr = testarrfilter.filter(function (element, index, self) {
          return element % 2 === 0;
        })
        console.log("filter arr:" + conarr);

        let testarrsort = [1, 2, 5, 3, 9, 7, 6];
        testarrsort.sort(function (x, y) {
          if (x > y) {
            return -1;
          } else if (x < y) {
            return 1;
          }
          return 0;
        })
        console.log("sort arr:" + testarrsort);

        let testarrmap = [1, 2, 3, 4, 5, 6, 7, 8];
        let conarr_map = testarrmap.map(function (x) {
          return x * x;
        })
        console.log("map arr:" + conarr_map);

        let conarr_reduce = testarrmap.reduce(function (x, y) {
          return x + y;
        })
        console.log("reduce arr:" + conarr_reduce);

        function* helloWorldGenerator() {
          yield 'hello';
          yield 'world';
          return 'ending';
        }

        let hw = helloWorldGenerator();
        console.log(hw.next())
        console.log(hw.next())
        console.log(hw.next())
        console.log(hw.next())

        function* fibonacci() {
          let [prev, curr] = [0, 1];
          for (; ;) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
          }
        }

        for (let n of fibonacci()) {
          if (n > 1000) break;
          console.log(n);
        }


        let farr = ['11', '22', '33'];
        let filelength = 3;

        function* test_fa() {
          for (let i = 0; i < filelength; i++) {
            console.log(farr[i]);
            yield i;
          }
        }

        let testfa_l = test_fa();
        for (let i = 0; i < filelength; i++) {
          testfa_l.next();
        }

        let requestAnimationFrame =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };

        let testframe;
        console.log("开始animationframe");
        loop();

        function loop() {
          console.log("loop");
          testframe = requestAnimationFrame(loop)
        }

        setTimeout(function () {
          console.log("取消了animationframe");
          cancelAnimationFrame(testframe);
        }, 1)


        that.testgenter = that.resetfl_sel();
        that.testgenter.next();
        that.testgenter.next();

        new Promise(function (resolve, reject) {
          resolve('123');
        }).then(function (d) {
          console.log(d)
//          return new Promise(function (resolve,reject) {
//            resolve('234')
//          })
        }).then(function (d) {
          console.log(d);
        })

        let testjg = [1, 2];
        let [testjg_0, testjg_1, testjg_2] = testjg;
        console.log(testjg_0 + " " + testjg_1 + " " + testjg_2)

        //- 变量常量输出调试
        let divtdom;
        for (var tti = 0; tti < 5; tti++) {
          divtdom = document.createElement('div');
          divtdom.innerText = tti;
          divtdom.onclick = function () {
            console.log("tti test:" + tti);
          }
          document.body.appendChild(divtdom);
        }

        let divtdom_let;
        for (let tti_ = 0; tti_ < 5; tti_++) {
          divtdom_let = document.createElement('div');
          divtdom_let.innerText = tti_ + 'let';
          divtdom_let.onclick = function () {
            console.log("tti test:" + tti_);
          }
          document.body.appendChild(divtdom_let);
        }

        //- 测试 {}
        let tenyf = 'test {}';
        console.log(`test ${tenyf}`);

        async function timeout(ms) {
          await new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }

        async function asyncPrint(value, ms) {
          await timeout(ms);
          console.log(value);
        }

        asyncPrint('hello world', 1000);

        console.log('%cObject assign对象合并，浅拷贝测试', 'color:red');
        const assign_a = {a: 1, b: 2}
        const assign_b = {c: 3, d: 4}
        console.log(Object.assign(assign_a, assign_b));

        const assign_deep_a = {a: 1, b: {b0: 3, b1: 4}}
        const assign_deep_b = {a: 2, b: {b3: 5}}
        console.log(Object.assign(assign_deep_a, assign_deep_b));

        let objectJX = {
          method: function () {
            console.log('i am objectJX');
          },
          methodn() {
            console.log('i am objectJXn');
          },
          methodn_n: () => {
            console.log('i am objectJXn_n');
          }
        }

        console.log(objectJX.method());
        console.log(objectJX.methodn());
        console.log(objectJX.methodn_n());

        let setArr = [1, 2, 3, 4, 4, {a: 1}, {a: 1}]
        console.log(`%c输出set结构`, 'color:red');
        console.log(new Set(setArr));
        let setArr_n = [...new Set(setArr)];
        console.log('%c输出新的数组，去重', 'color:red');
        console.log(setArr_n);

        async function test_await_promise() {
          await Promise.reject('出错了');
          await Promise.resolve('测试await是否执行 hello world'); // 不会执行
        }

        test_await_promise().then(() => {

        }).catch((e) => {
          console.log('监听到了 ' + e);
        })

        var anum = 10000, aarr = []
        for (let i = 0; i < anum; i++) {
          aarr.push(i);
        }
        console.time('string');
        let bbb = aarr + '';
        console.timeEnd('string');

        console.time('string');
        let aa = 121213123123123123123;
        let bb = aarr.toString();
        console.timeEnd('string');

        // that.getAttr().catch((e)=>{
        //   //- 方法内逻辑报错
        //   console.log(`%c监听到了getAttr的error`,'color:blue');
        //   console.log(`%c error name:${e.name} ; message:${e.message}`,'color:blue');
        //
        // })

        this.getAttr_method();
      },
      * testgen() {
        yield 'test0'
        yield 'test1'
      },
      * resetfl_sel() {
        yield 1;
        console.log("run");
      },
      getAttr_method() {
        const _this = this;

        _this.promiseMethod(() => {
            return getAttrList('310100')
          }, (d) => {
            _this.areasnote = "";
            _this.areas = d.data;
            _this.areasj = true;

          }, () => {
            console.log('err 了');
          }, 'getAttr_method'
        )

        // return new Promise((s,j)=>{
        //   let res=getAttrList('310100');
        //   s(res)
        // }).then((res)=>{
        //   _this.areasnote="";
        //   _this.areas=res.data;
        //   _this.areasj=true;
        // }).catch((e)=>{
        //   console.log(`%cgetAttr的promise catch监听到了`,'color:red');
        //   console.log(e);
        // })

      },

      async getAttr() {

        // let aa=undefined;
        // let bb=aa.length;

        // let res=await $axios_t('http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea',{ parentid:"310100" })
        let res = await getAttrList('310100');

        // throw new Error('出错了');

        if (res) {

          this.areasnote = "";
          this.areas = res.data;
          this.areasj = true;

          // let aa=undefined;
          // let bb=aa.length;

          // let res1=await $axios_t('http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea',{ parentid:"310100" })
          // throw new Error('出错了1');

          // if(res1){
          //
          //   console.log(`%carea/queryarea1 结果出来了`,'color:blue');
          //
          //   let aa1=undefined;
          //   let bb1=aa1.length;
          //
          //
          // }else{
          //   //- 接口报错
          //   console.log(`%cHelloWorld 1 的async结果出来了error`,'color:red');
          // }


        } else {
          //- 接口报错
          console.log(`%cHelloWorld 的async结果出来了error`, 'color:red');
        }

      },
      testinputval_$attr(v) {
        console.log(`子组件input值改变触发了父组件的方法，value值为:${v}`);
      },
      changeDiv_toggle() {
        this.testToggle_v = !this.testToggle_v;

        this.$refs.divToggle.changeState();
      },
      toastTest(str) {//- 自编写的插件
        this.$toast(str);

        this.testerror();
      },
      testerror() {
        let aa = undefined;
        let bb = aa.length;
      },
      testerror_promise() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 500)
        }).then(() => {
          let a = undefined;
          let b = a.length;
        }).catch((e) => {
          e.errorOther = {
            page: 'HelloWorld.vue',
            method: 'testerror_promise'
          }

          postError(e)
        })
      },
      testerror_async() {

        let _this = this;

        // async的报错监听
        _this.testerror_async_next().catch((e) => {

          e.errorOther = {
            page: 'HelloWorld.vue',
            method: 'testerror_async'
          }

          postError(e)

        })

      },
      async testerror_async_next() {
        let res = await getAttrList('310100');
        let res_next = await this.testerror_async_next_next();
        if (res) {
          let a = undefined;
          let b = a.length;

        } else {

        }
      },
      async testerror_async_next_next() {
        let res = await getAttrList('310100')
        if (res) {
          // let a=undefined;
          // let b=a.length;
        } else {

        }
      }
    },
    watch: {//- watch 监测
      msg(val) {
        console.log("watch 监听到msg发生了变化 变化后的值为'" + val + "'");
      },
      testInputVal: {
        handler(v) {
          console.log(`测试input的watch变化，input值为${v}`);
        },
        immediate: true
      },
      testInputVal_$attr(v) {
        console.log(`子组件input触发了父组件的v-model，值为${v}`);
      },
      testToggle_v(v) {

        console.log(`divToggle的v-model值变了，值为${v}`);
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
<style lang="scss">

  p {
    color: #333333;
  }

  abutton {
    padding: 3px 5px;
    cursor: pointer;
    background: #e0e0e0;

    &:hover {
      background: #eeeeee;
    }
  }

  /*abutton:hover {*/
  /*background: #eeeeee;*/
  /*}*/

  .imgup {
    width: 200px;
    height: auto;
  }
</style>
