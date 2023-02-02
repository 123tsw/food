// 用户相关的状态管理

import http from '@/utils/http.js'

const state = {
  token: '',
  username: ''
}
const actions = {
  yzm(context, data){
    return http.get('/users/yzm', data)
  },
  login(context, data){
    return http.post('/users/login', data)
  },
  info(context, data){
    return http.get('users/info', data)
  }
}
const getters = {}
const mutations = {
  updateToken(state, payload){
    state.token = payload;
  },
  //清除token
  clearToken(state){
    state.token = '';
  },
  updateUsername(state, payload){
    state.username = payload;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}