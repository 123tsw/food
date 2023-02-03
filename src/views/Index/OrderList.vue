<template>
  <div>
    <div style="margin-top: 20px">
      <el-space>
        <!-- 输入框 -->
        <el-input placeholder="请输入..." v-model="input2" suffix-icon="Search" style="width:150px;"/>
        <!-- 单选框 -->
        <el-radio-group v-model="radio2" >
          <el-radio-button label="肉类" />
          <el-radio-button label="饮品类" />
          <el-radio-button label="菜类" />
          <el-radio-button label="小吃类" />
        </el-radio-group>   
      </el-space>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top: 30px;">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <!-- 分页 -->
    <div style="margin:20px;float: right;" >
      <el-pagination background layout="prev, pager, next" :total="100" />
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { Search } from '@element-plus/icons-vue'
  export default {
    data(){
      return{
        radio2:{},
        tableData:[
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>