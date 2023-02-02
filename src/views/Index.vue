<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2>外卖管理平台</h2>
        <div class="user-info">
          <el-space>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            <el-dropdown>
              <span class="el-dropdown-link">
                欢迎：{{ username }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleToLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
        <!-- 下拉菜单 -->
      </el-header>
      <el-container>
        <!-- default-active="/home" :这句话的意思是在页面上就让home页选中状态 -->
        <el-aside width="200px">
          <el-menu
            active-text-color="#409eff"
            background-color="#d3dce6"
            class="el-menu-vertical-demo"
            :default-active="activeIndex"
            text-color="#010"
            router
          >
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/shop">
            <template #title>
              <el-icon><Box /></el-icon>
              <span>店铺管理</span>
            </template>
            <el-menu-item index="/shop/setting">店铺设置</el-menu-item>
            <el-menu-item index="/shop/food">菜品设置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/order">
            <template #title>
              <el-icon><Tickets /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order/list">订单列表</el-menu-item>
          </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumb" :key="item">{{ item  }}</el-breadcrumb-item>
          </el-breadcrumb>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'
  export default {
    //动态添加选中状态，在网址栏上输入想要跳转的内容，该内容会被选中
    data(){
      return {
        activeIndex:'',
        breadcrumb:[]
      }
    },
    created(){
      this.activeIndex = this.$route.path;
      this.breadcrumb = this.$route.meta.breadcrumb;
    },
    //面包屑会随着点击切换而改变
    computed:{
      breadcrumb(){
        return this.$route.meta.breadcrumb || []
      },
      username(){
        return this.$store.state.users.username;
      }
    },
    methods:{
      handleToLogout(){
        //清空状态管理中的token，持久化就会清空
         this.$store.commit('users/clearToken');
         this.$router.push('/login');
      }
    }
  }
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-header{
  // width: 100%;
  background: #b3c0d1;
  display: flex;
  justify-content: space-between;
align-items: center;}
.user-info{
  display: flex;
  align-items: center;
}
.el-aside{
  height: calc(100vh - 60px );
}
.el-menu{
  height: 100%;
}
</style>