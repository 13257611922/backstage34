<template>
  <el-container class="my-container">
    <!-- 头部结构 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="3">
          <img class="logo" src="../assets/Snipaste_2019-07-15_20-45-26.png" alt />
        </el-col>
        <el-col :span="20">
          <h2 class="title">电竞后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左边栏结构 -->
      <el-aside class="my-aside">
        <el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened="true" router>
          <!-- 左侧菜单权限列表 -->
          <el-submenu :index="'' + index" v-for="(item,index) in permissionList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 内层循环 -->
            <el-menu-item v-for="(it,i) in item.children" :key="i" :index="'/index/'+it.path">
              <i class="el-icon-menu"></i>
              <!-- {{it.path}} -->
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体结构 -->
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入 抽取的meus方法
import { menus } from "../api/axios";
export default {
  name: "index",
  data() {
    return {
      // 左侧菜单权限列表
      permissionList: []
    };
  },
  methods: {
    logout() {
      // 提示用户(弹框)
      this.$confirm("是否退出后台管理系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 确定退出
        .then(() => {
          // 删除token
          window.sessionStorage.removeItem("token");
          // 跳转login页面
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "已退出后台管理系统"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },
  created() {
    // 左侧菜单权限
    menus().then(backData => {
      // console.log(backData);
      this.permissionList = backData.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.my-container {
  height: 100%;
  // 头部
  .my-header {
    height: 60px;
    background-color: #b3c0d1;

    a {
      color: orange;
      // text-align: right;
    }

    .logo {
      height: 60px;
    }
    .title {
      line-height: 60px;
      text-align: center;
      color: white;
    }
    .logout {
      line-height: 60px;
      text-align: right;
    }
  }
  // 左边栏
  .my-aside {
    // height: 100%;
    background-color: #fff;
  }
  // 主体
  .my-main {
    // height: 100%;
    padding-top: 0;
    background-color: #e9eef3;
  }
}
</style>
