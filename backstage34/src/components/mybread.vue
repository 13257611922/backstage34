<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{nav1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{nav2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "mybread",
  // 外部可传入参数
  props:["nav1","nav2"],
  // created() {
  //   console.log(this.nav1);
  //   console.log(this.nav2);
  // },
};
</script>

<style lang="less" scoped>
// 面包屑
.my-breadcrumb {
  line-height: 45px;
  padding-left: 10px;
  background-color: #d3dce6;
  font-size: 15px;
  margin-bottom: 10px;
}
</style>
