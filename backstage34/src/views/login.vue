<template>
  <div class="login">
    <div class="from-box">
      <h2>用户登录</h2>
      <!-- label-position="top" 将文本置于输入框上方 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入 抽取的axios方法
import { login } from "../api/axios";
export default {
  name: "login",
  data() {
    return {
      // 表单绑定数据
      ruleForm: {
        // 用户名
        username: "",
        // 密码
        password: ""
      },
      rules: {
        // 验证规则
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证
          login(this.ruleForm).then(backData => {
            // console.log(backData);
            if (backData.data.meta.status == 200) {
              // 登录成功
              this.$message({
                message: backData.data.meta.msg,
                type: "success"
              });
              // 保存token
              window.sessionStorage.setItem('token',backData.data.data.token)
              // 跳转index页面
              this.$router.push("/index");
            } else if (backData.data.meta.status == 400) {
              // 登录失败
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          this.$message({
            message: "用户名或密码不能为空",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  background-color: rgb(50, 65, 82);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .from-box {
    width: 580px;
    height: 435px;
    background-color: white;
    border-radius: 10px;
    padding: 40px 60px;
    box-sizing: border-box;
    h2 {
      text-align: center;
      margin-bottom: 15px;
    }
    button {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
