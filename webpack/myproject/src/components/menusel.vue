<template>
  <div class="menulist">

    <div class="name">可选列表:</div>
    <ul>
      <li v-for="item in menulist">
        {{item.name}}
        <span @click="deletelist(item.id)">×</span>
      </li>
    </ul>
    <div class="add">
      添加一个？
      <input type="text" v-model="menuadd" style="border: 1px solid gray;">
      <button @click="addlist">添加</button>
    </div>
    <div class="select">
      <button @click="changeMenu">随机一个</button>
      <br />
      就吃这个吧：
      {{menuval==='' ? '-------':menuval}}
    </div>

  </div>
</template>

<script>
  export default {
    name: "menusel",
    data() {
      return {
        menuadd:'',
        menulist:[
          {
            id:this.$v4(),
            name:'疯狂的鸭脑壳'
          },
          {
            id:this.$v4(),
            name:'火焰山烧烤'
          },
          {
            id:this.$v4(),
            name:'宽窄巷子'
          },
          {
            id:this.$v4(),
            name:'百素酸菜鱼'
          },
          {
            id:this.$v4(),
            name:'酸菜鱼楼下的牛蛙'
          },
          {
            id:this.$v4(),
            name:'济州岛烤肉'
          },
          {
            id:this.$v4(),
            name:'长泰高老九火锅'
          },
          {
            id:this.$v4(),
            name:'金桥蜀将火锅'
          },
          {
            id:this.$v4(),
            name:'金桥太茂回乡缘'
          },
         ],
        menuval:''
      }
    },
    methods:{
      changeMenu(){
        let _this=this;

        let menulistarr=_this.menulist;
        _this.menuval=menulistarr[Math.round(Math.random()*(menulistarr.length-1))].name

      },
      deletelist(id){
        let _this=this;
        let mlistarr=_this.menulist;
        _this.menulist.splice(mlistarr.find((v)=>{
          v.id===id;
        }),1)
      },
      addlist(){
        let _this=this;
        let name=_this.menuadd;
        if(name.match(/^\s*$/))
          alert('不能啥都不吃')
        else{
          _this.menulist.push({
            id:_this.$v4(),
            name
          })
        }
      }
    }
  }
</script>

<style>
  .menulist{
    padding: 0 15px;
  }
  .menulist .name{
    text-align: left;
    width: 100%;
  }
  .menulist ul{
    padding: 0 15px;
    border-bottom: 1px solid red;
  }
  .menulist li {
    padding: 2px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .menulist li span{
    display: inline-block;
    margin-left: 15px;
  }
  .menulist .add,.menulist .select{
    padding: 5px;
    border-bottom: 1px solid red;
    text-align: left;
  }

</style>
