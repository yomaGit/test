import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cbgshow:false,
    hidebart:false,
  },
  mutations: {
    changehidebart (state) {
      state.hidebart=!state.hidebart;
    },
    changecbg (state,value) {
      state.cbgshow=value;
    },
  },
  actions: {
    changecbg_async (context) {
      context.commit('changecbg',false)
    }
  }
})
