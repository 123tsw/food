<template>
  <div>
    <div class="title">
      <el-button type="primary">+ 添加</el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in dynamictags" :key="item.title" :label="item.title" :name="item.title">{{ item.title }}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import _ from 'lodash'
  export default {
    data(){
      return {
        activeName: '',
        dynamictags: []
      }
    },
    methods: {
      handleClick(){

      }
    },
    created(){
      if( _.isEmpty(this.$store.state.shops.infos) ){
        this.$store.dispatch('shops/list', {username: this.$store.state.users.username}).then((res)=>{
          if(res.data.length){
            let ret = res.data[0];
            this.dynamictags = JSON.parse(ret.dynamictags);
            this.activeName = this.dynamictags[0].title;
            this.$store.commit('shops/updateInfos', ret);
          }
        })
      }
      else{ 
        let ret = this.$store.state.shops.infos;
        this.dynamictags = JSON.parse(ret.dynamictags);
        this.activeName = this.dynamictags[0].title;
      }
    }
  }
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  justify-content: flex-end;
}
</style>