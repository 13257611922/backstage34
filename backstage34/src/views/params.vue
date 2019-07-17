<template>
  <div class="params">
    <!-- 面包屑(传入参数) -->
    <mybread nav1="商品管理" nav2="分类参数"></mybread>
    <!-- 警告框 -->
    <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" show-icon class="my-alert"></el-alert>
    <!-- 级联选择器 -->
    <div class="block">
      <span class="demonstration">请选择商品分类：</span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </div>
    <!-- Tabs 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="my-tabs">
      <el-tab-pane label="用户管理" name="first">
        <!-- 按钮 -->
        <el-button type="primary" disabled>添加动态参数</el-button>
        <!-- table 表格 -->
        <el-table :data="tableData" border style="width: 100%" class="my-table">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <!-- 按钮 -->
        <el-button type="primary" disabled>主要按钮</el-button>
        <!-- table 表格 -->
        <el-table :data="tableData" border style="width: 100%" class="my-table">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
    return {
      // 级联选择器
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                }
              ]
            }
          ]
        }
      ],
      // Tabs 标签页
      activeName: "second",
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
      ]
    };
  },
  methods: {
    // Tabs 标签页
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    // 级联选择器
    handleChange(value) {
      //   console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.params {
  // 警告框
  .my-alert {
    margin-bottom: 10px;
  }
  // Tabs 标签页
  .my-tabs {
    margin-top: 10px;
    // table 表格
    .my-table {
      margin-top: 10px;
    }
  }
}
</style>
