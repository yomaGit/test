<template>
  <div class="navbar">
    <header>
      <div class="logo">海典软件<div class="i" @click="navToogle"><div></div></div></div>
      <div class="funlist">
        <div class="search">
          <div class="sing" :class="{sel:searchInput}" @click.stop="searchToggle"><div></div></div>
          <div class="squ" v-show="searchInput" @click.stop>
            <div class="arrow"></div>
            <Input class="input" search
              placeholder="搜索..."
              @on-search="onSearch"
            />
            <div class="close" @click="searchClose"><div></div></div>
          </div>

        </div>
        <div class="menu">
          <ul>

            <template v-for="(item,index) in menulist">

              <li v-if="index<7" :class="{sel:item.sel}"><a :href="item.href"><span>{{item.name}}</span></a></li>

            </template>

            <li v-if="menulist.length>7" class="other">

              <Dropdown trigger="click">
                <a href="javascript:;">更多 <span class="icon"></span></a>
                <DropdownMenu slot="list">
                  <template v-for="(item,index) in menulist">
                    <DropdownItem v-if="index>6" :key="item.id">
                      <a :href="item.href">{{item.name}}</a>
                    </DropdownItem>
                  </template>
                </DropdownMenu>
              </Dropdown>

            </li>

          </ul>
        </div>

        <div class="otherfun">

          <ul class="oflist">
            <li><div class="i chat"><div class="num">9</div></div></li>
            <li><div class="i lock"></div></li>
          </ul>
          <div class="user">
            <img :src="usermsg.src">
          </div>

        </div>
      </div>
    </header>
    <nav>

      <div class="basicMsg">
        <div class="img"><img :src="basicmsg.src"></div>
        <div class="name"><span id="uname" :style="'margin-left:'+chainleft+'px'">{{basicmsg.name}}</span></div>
        <div class="num">{{basicmsg.num}}</div>
      </div>

      <ul class="navlist">
        <li v-for="item in navlist" :class="{sel:item.sel}">
          <a :href="item.href" @click="navClick(item.id)">
            <div class="ni">
              <div class="i" :class="item.class">
                <div></div>
              </div>
              <div class="name">{{item.name}}</div>
            </div>
            <div class="rbtn" :class="{rat:item.open}" v-if="item.list.length>0"></div>
          </a>
          <ul v-if="item.list.length>0" :style="{height : item.open ? +item.height+'px' : 0}">
            <li v-for="item_l in item.list" :class="{sel:item_l.sel}">
              <a :href="item_l.href">
                <div class="name">{{item_l.name}}</div>
              </a>
            </li>
          </ul>
        </li>
      </ul>

    </nav>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    data() {
      return {
        usermsg:{//- 用户信息
          src:'static/img/user.jpg',

        },
        basicmsg: {//- 门店信息
          src: 'static/img/logo.jpg',
          name: '上海海典智慧药店',
          num: 'no.2566566'
        },
        searchInput:false,//- search显示状态
        chainleft: 0,//- 名字过长后轮播
        resframe: '',

      }
    },
    computed:{
      menulist(){//- menu数据（1，2，3级）
        return this.$store.state.menulist
      },
      navlist(){//- 二三级菜单数据
        return this.$store.state.navlist
      }
    },
    methods: {//- 方法
      init() {
        let that = this;

        that.framename();
      },
      framename() {//- 判断商家名字的长短
        let that = this;
        let width = document.getElementById('uname').offsetWidth;
        if (width > 190) {
          let requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };

          let name = that.basicmsg.name;
          that.basicmsg.name = name + " " + name;
          let left = 0;
          let jsd = 0.6;
          loop();

          function loop() {
            left -= jsd;
            if (left + width + jsd + 3 <= 0) left = jsd;
            that.chainleft = left;
            that.resframe = requestAnimationFrame(loop);
          }
        }
      },
      navClick(id) {//- 一级菜单点击

        let that = this;
        that.$store.commit('navClick',id);

      },
      onSearch(value){//- 头部搜索框

        console.log(`检索值为：${value}`);
      },
      navToogle(){//- 头部搜索框显示隐藏
        this.$store.commit('changehidebart')
      },
      searchToggle(){//- search显示状态
        let that=this;
        that.searchInput=that.searchInput ? false:true;
      },
      searchClose(){//- search关闭
        let that=this;
        that.searchInput=false;
      },
      closeFloat(){//- 头部搜索框隐藏
        let that=this;
        that.searchInput=false;
      },


    },
    mounted() {//- 创建
      this.init();

    },
    destroyed() {
      let that = this;
      if (that.resframe) cancelAnimationFrame(that.resframe);

    }
  }
</script>

<style lang="sass">
  @import "../css/components/navbar"
</style>
