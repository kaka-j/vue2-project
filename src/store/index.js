import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { initUser } from './typoes'

export default new Vuex.Store({
  state:{
    userInfo:initUser(),
  } ,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
