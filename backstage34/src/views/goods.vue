<template>
  <div class="goods">
    <!-- 面包屑(传入参数) -->
    <mybread nav1="商品管理" nav2="商品列表"></mybread>
    <!-- Layout 布局 -->
    <el-col>
      <el-col :span="6">
        <!-- 输入框 -->
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <!-- 按钮 -->
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-col>
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
        :current-page="currentPage4"
        :page-sizes="[5, 15, 20, 25]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="925"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods",
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
      // 输入框内容
      input3: "",
      // 分页首页
      currentPage4: 1
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.goods {
  // table 表格
  .my-table {
    margin-top: 60px;
  }
}
</style>
