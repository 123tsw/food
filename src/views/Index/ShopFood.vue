<template>
  <div>
    <div class="title">
      <el-button type="primary" @click="handleDialog">+ 添加</el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in dynamictags" :key="item.title" :label="item.title" :name="item.title">
        <!-- 选项卡 -->
        <el-row gutter="20">
          <el-col :span="6" v-for="item2 in item.list" :key="item2.name">
            <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <h2>{{item2.name}}</h2>
              <div class="bottom">
                <div>
                  <span>价格：{{ item2.price }}</span>
                  <span>描述：{{ item2.info }}</span>
                </div>
                <el-button style="float:right;margin-bottom:20px;" type="danger" icon="Delete" circle class="button"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第二个 -->
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>Yummy hamburger</span>
              <div class="bottom">
                <time class="time">aaa</time>
                <el-button text class="button">Operating</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
  </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="500"
      @close="handleClose"
    >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      status-icon
    >
    <el-form-item label ="菜品名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label ="菜品分类" prop="title">
      <el-select v-model="form.title" placeholder="请选择分类" size="large">
        <el-option
          v-for="item in dynamictags"
          :key="item.title"
          :label="item.title"
          :value="item.title"
        />
      </el-select>
    </el-form-item>
    <el-form-item label ="价格" prop="price">
      <el-input v-model="form.price" />
    </el-form-item>
    <el-form-item label ="描述" prop="info">
      <el-input v-model="form.info" />
    </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary"  @click="addFood($refs.ruleFormRef)">添加</el-button>
          <el-button @click="resetFood($refs.ruleFormRef)">
            重置
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import _ from 'lodash'
  export default {
    data(){
      return {
        activeName: '',
        dynamictags: [],
        dialogVisible:false,
        form:{},
        rules:{
          name:[
          { required: true, message: '菜品名称不能为空', trigger: 'blur' }
          ],
          title:[
            { required: true, message: '菜品分类不能为空', trigger: 'blur' }
          ],
          price:[
            { required: true, message: '价格描述不能为空', trigger: 'blur' }
          ],
          info:[
            { required: true, message: '菜品信息不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    
    methods: {
      handleClick(){

      },
      handleClose(){
        this.dialogVisible =true;
        this.resetFood(this.$refs.ruleFormRef)
      },
      handleDialog(){
        this.dialogVisible =true;
      },
      resetFood(formEl){
        if (!formEl) return
        formEl.resetFields()
      },
      addFood(formEl){
        // this.dialogVisible =false;
        if (!formEl) return
        formEl.validate((valid, fields) => {
          if (valid) {  
            //console.log( this.form )
            let list = this.dynamictags.find((v)=> v.title === this.form.title).list;
            list.push({
              name: this.form.name,
              price: this.form.price,
              info: this.form.info
            })
            this.$store.dispatch('shops/update', {
              dynamictags: this.dynamictags,
              username: this.$store.state.users.username
            }).then((res)=>{
              if( res.data.errcode === 0 ) {
                ElMessage.success('添加菜品成功')
                this.handleClose()
              }
            })
          } else {
            console.log('error submit!', fields)
          }
        });
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
.el-select{
  width: 100%;
}
.image{width: 100%;}
</style>