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
  </div>
</template>

<script>

  export default {//- 为模块指定默认输出
    name: 'HelloWorld',
    props:{
      //- 要传递的参数
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        msg: '这里是第一个.vue的页面 hello',
        content:"这里显示数据",
        areasnote:"上海市下的区获取中......",
        areasj:false,
        areas:[],
        imguj:false,
        imgur:""
      }
    },
    methods: {//- 方法
      reverseMsg(){
        this.msg=this.msg.split("").reverse().join("");
      },
      toast(message){
        this.$toast(message);
      },
      imguploadtest(event){
        var that=this;
        var files = event.target.files || event.dataTransfer.files;
        if(files.length>0){
          let file=files[0];//- 单张上传
          that.$imgupload(file,"",function(d){
            if(d=="") {
              that.$toast("上传失败");
            }else{
              var nd=d;
              var imgUrl = nd.imgartwork;//- 原图
              that.imguj=true;
              that.imgur=imgUrl;
              that.$toast("上传成功");
            }
          },function(){
            that.$toast("上传失败");
          })
        }
      },
      init(){
        var that=this;
        //      console.log(this._props.show);//- 获取传入参数

        var imgb=that.$baseurl.imgupload;
        console.log("图片上传地址为 "+imgb);

        that.$Ajaxy("post","http://ydjcs.hydee.cn:80/ydj-platform/area/queryarea",{ parentid:"310100" },function(d){
          console.log("地址获取成功了 返回数据为上海市的区");
          that.areasnote="";
          that.areas=d.data;
          that.areasj=true;
        },function(){
          console.log("地址获取失败了");
        });

        that.content="页面初始化ajax，模拟数据获取，2s......";
        setTimeout(function(){
          that.content="数据更新了";
        },2000)
      }
    },
    watch:{//- watch 监测
      msg(val){
        console.log("watch 监听到msg发生了变化 变化后的值为'"+val+"'");
      }
    },
    created(){//- vue创建后，进入页面执行一次
      console.log("created vue节点创建后，进入页面后执行（一次），页面初始化");
      this.init();
    },
    updated(){//- 组件更新之后
      console.log("updated 组件data参数更新之后");
    },
    destroyed(){
      console.log("destroyed 销毁");
    },
    beforeRouteEnter(to, from, next){
      console.log("helloworld beforeRouteEnter 进入了路由");
      next(true);
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate(to, from, next){
      console.log("helloworld beforeRouteUpdate 路由改变，组件被复用");
      next(true);
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from, next){
      console.log("helloworld beforeRouteLeave 离开了路由");
      next(true);
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
    color: #333333;
  }
  abutton{
    padding:3px 5px;
    cursor: pointer;
    background: #e0e0e0;
  }
  abutton:hover{
    background: #eeeeee;
  }
  .imgup{
    width: 200px;
    height:auto;
  }
</style>
