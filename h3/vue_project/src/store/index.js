import Vue from 'vue'
import Vuex from 'vuex'
import v4 from 'uuid'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cbgshow:false,
    hidebart:false,
    processbar:false,
    processbar_show:false,
    processbar_width:0,
    processbar_inter:'',
    chainname:'药店加商户',
    chainimg:'static/img/noImg.png',
    chainmsgstate:false,

    menulist:[
      {
        id:v4(),
        class:'index',
        name:'首页',
        href:'javascript:;',
        sel:false,
        secMenu:[
          {
            id: v4(),
            class: 'orderManager',
            name: '订单管理',
            href: 'javascript:;',
            sel: false,
            open: false,
            height: 0,
            list: [
              {
                id: v4(),
                class: 'wantBook',
                name: '缺货登记',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'goodReport_dx',
                name: '动销商品报表',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'checkSotck_duoble',
                name: '出库双人复核',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'compareReport_cg',
                name: '采购进价对比报表',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'supplyShort',
                name: '紧缺商品',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'processingForm',
                name: '加工单',
                sel: false,
                href: 'javascript:;'
              }
            ]
          },
          {
            id: v4(),
            class: 'businessEvents',
            name: '企业业务',
            href: 'javascript:;',
            sel: false,
            open: false,
            height: 0,
            list: [
              {
                id: v4(),
                class: 'initialValue',
                name: '基础资料',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'memberManager',
                name: '会员管理',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'resaleManager',
                name: '零售管理',
                sel: false,
                href: 'javascript:;'
              }
            ]
          },
          {
            id: v4(),
            class: 'systemManagement',
            name: '系统管理',
            href: 'javascript:;',
            sel: false,
            open: false,
            height: 0,
            list: [
              {
                id: v4(),
                class: 'personnelSet',
                name: '人事部门设置',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'reservoirAreaSet',
                name: '库区设置',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'allocationSet',
                name: '货位设置',
                sel: false,
                href: 'javascript:;'
              },
            ]
          },
          {
            id: v4(),
            class: 'pharmacy',
            name: '院内药房',
            href: 'javascript:;',
            sel: false,
            open: false,
            height: 0,
            list: [
              {
                id: v4(),
                class: 'patientRecord',
                name: '院内病人档案',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'prescriptionRecord',
                name: '院内处方开立',
                sel: false,
                href: 'javascript:;'
              },
              {
                id: v4(),
                class: 'auditRecord',
                name: '院内处方审核',
                sel: false,
                href: 'javascript:;'
              }
            ]
          }
        ]
      },
      {
        id:v4(),
        class:'goods',
        name:'商品',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      },
      {
        id:v4(),
        class:'orders',
        name:'订单',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      },
      {
        id:v4(),
        class:'stocks',
        name:'库存',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      },
      {
        id:v4(),
        class:'merchant',
        name:'营销',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      },
      {
        id:v4(),
        class:'teamwork',
        name:'合作',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      },
      {
        id:v4(),
        class:'count',
        name:'结算',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      },
      {
        id:v4(),
        class:'report',
        name:'报表',
        href:'javascript:;',
        sel:false,
        secMenu:[

        ]
      }
    ],
    navlist: [],

  },
  mutations: {
    changehidebart (state) {
      state.hidebart=!state.hidebart;
    },
    changecbg (state,value) {
      state.cbgshow=value;
    },
    changeuser(state,value){
      state.chainname=value.name;
      state.chainmsgstate=true;
      if(value.img) state.chainimg=value.img;
    },
    openprocessbar(state){
      state.processbar_width=0;
      state.processbar=true;
      state.processbar_show=true;
      state.processbar_inter=setInterval(function(){
        let sj=Math.floor(Math.random()*10+5);
        let nw=state.processbar_width+sj;
        if(nw>96) {
          nw=96;
          state.processbar_width=nw;
          clearInterval(state.processbar_inter);
        }else{
          state.processbar_width=nw;
        }
      },300)

    },
    completeproceccbar(state){
      clearInterval(state.processbar_inter);
      state.processbar_width=100;
      setTimeout(function(){
        state.processbar=false;
        setTimeout(function(){
          state.processbar_show=false;
        },300)
      },300)

    },
    resetHeight(state){

      state.menulist=state.menulist.map((val)=>{

        let menusec=val.secMenu;

        if(menusec.length>0){
          menusec = menusec.map((vs) => {
            let nv = {...vs};

            if (vs.list.length > 0)
              nv = {
                ...nv,
                height: vs.list.length * 50
              }

            return nv;
          })
        }

        return {
          ...val,
          secMenu:menusec
        }

      })

    },
    navClick(state,id){

      state.navlist = state.navlist.map((val) => {
        let nv = {
          ...val,
          open:false
        }

        if (val.id == id)
          nv = {
            ...val,
            open: val.open ? false : true
          }
        return nv;
      })

    },
    changeNavbar(state,value){

      let menu=value.menu;
      let navFirst=value.navFirst;
      let navSecond=value.navSecond;

      let menulist=state.menulist.map((val)=>{
        let vi={
          ...val,
          sel:false
        }
        if(val.class==menu){

          let menusec=val.secMenu;
          if(menusec.length>0){
            menusec = menusec.map((vs) => {
              let nv = {
                ...vs,
                sel: false,
                open: false
              }
              if (nv.class == navFirst) {
                nv = {
                  ...nv,
                  sel: true,
                  open: true
                }

                if (nv.list.length > 0) {

                  nv.list=nv.list.map((nvi) => {
                    let nvin = {
                      ...nvi,
                      sel: false
                    }
                    if (nvi.class == navSecond)
                      nvin = {
                        ...nvi,
                        sel: true
                      }

                    return nvin;
                  })

                }

              }

              return nv;
            })
          }

          vi={
            ...val,
            sel:true,
            secMenu:menusec
          }
        }

        return vi;
      })
      state.menulist=menulist;

      state.navlist=menulist.find((v)=>{
        return v.class=value.menu;
      }).secMenu;

    }

  },
  actions: {

  }
})
