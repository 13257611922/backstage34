<template>
  <div class="goodsindex">
    <!-- Layout 布局 -->
    <el-col class="my-col">
      <el-col :span="6">
        <!-- 输入框 -->
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <!-- 按钮 -->
        <el-button type="success" plain @click="toGoodsAdd">添加商品</el-button>
      </el-col>
    </el-col>
    <!-- table 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="150"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="150"></el-table-column>
      <el-table-column prop="upd_time" label="创建时间" width="350"></el-table-column>
      <el-table-column label="操作" width="350">
        <!-- 编辑 -->
        <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
        <!-- 删除 -->
        <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block"> -->
    <el-pagination
      class="my-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10 , 15 , 20 , 25]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- </div> -->
  </div>
</template>

<script>
// 导入axios
import { goodslist } from "../../../api/axios";

export default {
  name: "goodsindex",
  data() {
    return {
      // table 表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      // 查询内容
      query: "",
      // 当前页码
      pagenum: 1,
      // 页容量
      pagesize: 10,
      // 页码总数
      total: 0
    };
  },
  methods: {
    // 当前页容量
    handleSizeChange(size) {
      // console.log(size);
      this.pagesize = size;
      this.goodslist();
    },
    // 当前页码
    handleCurrentChange(num) {
      // console.log(num);
      this.pagenum = num;
      this.goodslist();
    },

    // 跳转 goodsadd
    toGoodsAdd() {
      this.$router.push("/index/goods/add");
    },

    // 封装
    goodslist() {
      // 商品列表数据
      goodslist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(backData => {
        console.log(backData);
        this.tableData = backData.data.data.goods;
        // 页码总数
        this.total = backData.data.data.total;
      });
    }
  },
  // 生命周期钩子
  created() {
    this.goodslist();
  }
};
</script>

<style lang="less" scoped>
.goodsindex {
  .my-col {
    margin-bottom: 10px;
  }
  .my-pagination {
    margin-top: 20px;
  }
}
</style>
