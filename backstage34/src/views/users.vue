<template>
  <div class="users">
    <!-- 面包屑(传入参数) -->
    <mybread nav1="用户管理" nav2="用户列表"></mybread>
    <!-- Layout 布局 -->
    <el-col>
      <el-col :span="6">
        <!-- 输入框 -->
        <el-input
          placeholder="请输入内容"
          v-model.trim="query"
          @keyup.enter.native="queryBtn"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="queryBtn"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <!-- 按钮 -->
        <el-button type="success" plain @click="adduserBtn">添加用户</el-button>
      </el-col>
    </el-col>
    <!-- table 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="my-table">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 自定义列模板 -->
      <el-table-column label="用户状态" width="100">
        <!-- switch 开关 -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchBtn(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="small"
            @click="modificationBtn(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="small"
            @click="delusers(scope.row)"
          ></el-button>
          <!-- 分配按钮 -->
          <el-button
            type="warning"
            icon="el-icon-check"
            plain
            size="small"
            @click="roleBtn(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 15, 20, 25]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 添加用户 - 对话框 -->
    <el-dialog title="添加用户" :visible.sync="disdialog">
      <el-form ref="ruleForm" :model="disform" :rules="disrules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="disform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="disform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="disform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="disform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disdialog = false">取 消</el-button>
        <el-button type="primary" @click="submitBtn('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 - 对话框 -->
    <el-dialog title="修改用户" :visible.sync="comdialog">
      <el-form ref="ruleFrom" :model="comform" :rules="disrules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="comform.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="comform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="comform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="comdialog = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 - 对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="当前用户" lable="120px">{{roleForm.userName}}</el-form-item>
        <el-form-item label="请选择角色" lable="120px">
          <el-select v-model="roleForm.role" placeholder="请选择活动区域">
            <el-option
              v-for="(item,index) in roleList"
              :label="item.roleName"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="disRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入 抽取的axios方法
import {
  users,
  addusers,
  delusers,
  stateusers,
  compileusers,
  rolesusers,
  ridusers
} from "../api/axios";

export default {
  name: "users",
  data() {
    return {
      // 分配框开关
      roleFormVisible: false,
      // 分配角色列表
      roleList: [],
      // 分配数据
      roleForm: {
        role: "",
        // 分配用户名字
        userName: "",
        // 分配角色id
        id: ""
      },
      // table 表格
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],

      // 输入框内容 查询参数
      query: "",
      // 当前页码
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // switch 开关
      value: false,
      // 总条数
      total: 0,

      // 添加用户 - 对话框
      disrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ]
      },
      // 添加框开关
      disdialog: false,
      // 表单数据
      disform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      // 编辑框开关
      comdialog: false,
      // 编辑数据
      comform: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      }
    };
  },
  methods: {
    // 分配用户角色
    disRoles() {
      ridusers({
        id: this.roleForm.id,
        rid: this.roleForm.role
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          // 分配框关闭
          this.roleFormVisible = false;
          // 弹话框
          this.$message({
            type: "success",
            message: "角色分配成功!"
          });
        }
      });
    },

    // 分配角色
    roleBtn(row) {
      // console.log(row);
      // 分配框开启
      this.roleFormVisible = true;

      this.roleForm.userName = row.username;
      this.roleForm.role = row.role_name;
      this.roleForm.id = row.id;
      // 获取角色列表
      rolesusers().then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.roleList = backData.data.data;
        }
      });
    },

    // 保存修改
    saveEdit() {
      compileusers(this.comform).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.$message.success("修改成功!!!");
          // 关闭弹框
          this.comdialog = false;
          // 重新渲染
          this.usersList();
        }
      });
    },

    // 编辑用户
    modificationBtn(row) {
      // 开启对话框
      this.comdialog = true;
      // console.log(row);
      // 数据渲染
      this.comform = row;
    },

    //删除用户
    delusers(row) {
      // console.log(row);
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认删除用户
          delusers({
            id: row.id
          }).then(backData => {
            // console.log(backData);
            if (backData.data.meta.status == 200) {
              // 弹话框
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 重新渲染
              this.usersList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "未删除用户"
          });
        });
    },

    // 提交表单
    submitBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发送请求
          addusers(this.disform).then(backData => {
            // console.log(backData);
            if (backData.data.meta.status == 201) {
              // 关闭对话框
              this.disdialog = false;
              // 弹话框
              this.$message({
                message: "添加用户成功!!!",
                type: "success"
              });
              // 重新渲染
              this.usersList();
            }
          });
        } else {
          // 弹框
          this.$message.warning("数据格式不对，请检查");
          return false;
        }
      });
    },

    // 添加用户事件
    adduserBtn() {
      // 开启对话框
      this.disdialog = true;
    },

    // 状态改变事件
    switchBtn(row) {
      console.log(row);
      stateusers({
        uld: row.id,
        type: row.mg_state
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          // 弹话框
          this.$message({
            message: "用户状态已改变",
            type: "success"
          });
        }
      });
    },

    // 封装users请求
    usersList() {
      // 用户数据列表
      users({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(backData => {
        // console.log(backData);
        this.tableData = backData.data.data.users;
        this.total = backData.data.data.total;
      });
    },

    // 搜索用户数据
    queryBtn() {
      this.usersList();
    },

    // 分页
    handleSizeChange(size) {
      // 每页容量
      console.log(size);
      this.pagesize = size;
      this.usersList();
    },
    handleCurrentChange(current) {
      // 当前页码
      console.log(current);
      this.pagenum = current;
      this.usersList();
    }
  },

  // 生命周期钩子
  created() {
    // 渲染用户数据
    this.usersList();
  }
};
</script>

<style lang="less" scoped>
.users {
  // table 表格
  .my-table {
    margin-top: 60px;
  }
  // 分页
  .block {
    margin-top: 10px;
  }
}
</style>
