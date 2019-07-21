<template>
  <div>
    <!-- 面包屑(传入参数) -->
    <mybread nav1="权限管理" nav2="角色列表"></mybread>
    <!-- 按钮 -->
    <el-button plain>添加角色</el-button>
    <!-- table 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="my-table">
      <el-table-column type="expand" width="50">
        <template slot-scope="props">
          <!-- 一级row -->
          <el-row v-for="(topLevel,index) in props.row.children" :key="index">
            <el-col :span="4">
              <el-tag closable type class="my-tag">{{topLevel.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="20">
              <!-- 二级level -->
              <el-row v-for="(secondLevel,index) in topLevel.children" :key="index">
                <el-col :span="6">
                  <el-tag closable type="success" class="my-tag">{{secondLevel.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <!-- 右侧 -->
                <!-- 三级level -->
                <el-col :span="18">
                  <el-tag
                    closable
                    type="warning"
                    class="my-tag"
                    v-for="(thirdLevel,index) in secondLevel.children"
                    :key="index"
                  >{{thirdLevel.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="400"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="400"></el-table-column>
      <el-table-column label="操作">
        <template>
          <!-- slot-scope="scope" -->
          <!-- 编辑按钮 -->
          <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
          <!-- 分配按钮 -->
          <el-button type="warning" icon="el-icon-check" plain size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入 抽取的axios方法
import { rolesusers } from "../api/axios";

export default {
  name: "roles",
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
  methods: {
    // 获取角色列表
    roleList() {
      rolesusers().then(backData => {
        console.log(backData);
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data;
        }
      });
    }
  },
  created() {
    this.roleList();
  }
};
</script>

<style lang="less" scoped>
// table 表格
.my-table {
  margin-top: 10px;
  .my-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>