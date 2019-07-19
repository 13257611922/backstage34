<template>
  <div>
    <!-- 面包屑(传入参数) -->
    <mybread nav1="权限管理" nav2="权限列表"></mybread>
    <!-- table 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="my-table">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 抽取axios封装方法
import { rights } from "../api/axios";
export default {
  name: "rights",
  data() {
    return {
      // table 表格
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  // 生命周期钩子
  created() {
    // 所有权限列表
    rights().then(backData => {
      console.log(backData);
      if (backData.status == 200) {
        // 修改level的值
        for (let i = 0; i < backData.data.data.length; i++) {
          switch (backData.data.data[i].level) {
            case "0":
              backData.data.data[i].level = "一级";
              break;
            case "1":
              backData.data.data[i].level = "二级";
              break;
            case "2":
              backData.data.data[i].level = "三级";
              break;
          }
        }
        this.tableData = backData.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.my-table {
  margin-top: 10px;
}
</style>
