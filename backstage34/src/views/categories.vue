<template>
  <div>
    <!-- 面包屑(传入参数) -->
    <mybread nav1="商品管理" nav2="商品分类"></mybread>
    <!-- 按钮 -->
    <el-button type="success" plain>添加分类</el-button>
    <!-- table 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="my-table">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="5"
        layout="total,prev, pager, next, jumper"
        :total="31"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      // table 表格
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      // 分页首页
      currentPage3: 1
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
// table 表格
.my-table {
  margin: 10px 0;
}
</style>
