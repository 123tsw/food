// 用户相关的状态管理

import http from '@/utils/http.js'

const state = {
  infos: {}
}
const actions = {
  update(context, data){
    // return http.post('/shops/update',data)
    // console.log(data);
    const params = new FormData()
    for(let attr in data){
      //判断是不是数组
      if( attr === 'dynamictags' && Array.isArray(data[attr]) ){
        params.append(attr, JSON.stringify(data[attr]))
      }
      else{
        if(attr === 'file' && data[attr] === 'origin'){
          continue;
        }
        params.append(attr, data[attr])
      }
    }
    return http.post('/shops/update', params, {
      'Content-Type': 'multipart/form-data'
    })
  },
  list(context, data){
    return http.get('/shops/list', data)
  }
}
const getters = {}
const mutations = {
  updateInfos(state, payload){
    state.infos = payload;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}