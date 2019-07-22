<template>
  <div class="add">
    <!-- Alert -->
    <el-alert title="添加商品信息" type="info" show-icon center class="my-alert"></el-alert>

    <!-- 步骤条 -->
    <el-steps
      :active="parseInt(active)"
      finish-status="success"
      class="my-steps"
      :align-center="aligncenter"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- Tabs 标签页 -->
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane name="0" label="基本信息">
        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
        <el-form
          :model="goodsForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="goodsForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="number">
            <el-input v-model="goodsForm.number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="weight">
            <el-input v-model="goodsForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="classify">
            <!-- 级联选择器 - 商品分类 -->
            <el-cascader
              v-model="classfiy"
              :options="options"
              @change="handleChange"
              clearable
              :props="props"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane name="1" label="商品参数">商品参数</el-tab-pane>

      <el-tab-pane name="2" label="商品属性">
        <el-form label-position="top" label-width="80px" :model="parameterForm">
          <el-form-item label="主体 - 品牌">
            <el-input v-model="parameterForm.name"></el-input>
          </el-form-item>
          <el-form-item label="规格 - 规格">
            <el-input v-model="parameterForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="功效 - 功效">
            <el-input v-model="parameterForm.effect"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane name="3" label="商品图片">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          :on-success="uploadSuccess"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>

      <el-tab-pane name="4" label="商品内容" class="commoditytitle">
          <quillEditor></quillEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { categories } from "../../../api/axios";
// 导入富文本样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 导入富文本组件
import { quillEditor } from "vue-quill-editor";

export default {
  name: "goodsadd",
  // 组件注册
  components: {
    quillEditor
  },
  data() {
    return {
      active: "0",
      aligncenter: true,
      // 上传图片
      uploadHeaders: {
        // 上传请求头
        Authorization: window.sessionStorage.getItem("token")
      },
      // 商品参数
      parameterForm: {
        name: "",
        weight: "",
        effect: ""
      },
      // 级联选择器
      classfiy: [],
      options: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        // children: "children",
        expandTrigger: "hover"
      },
      // 商品数据列表
      type: 3,
      // 表单数据
      goodsForm: {
        name: ""
      },
      // 验证规则
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入商品重量",
            trigger: "blur"
          }
        ],
        weight: [
          {
            required: true,
            message: "请输入商品数量",
            trigger: "blur"
          }
        ],
        classify: [
          {
            required: true,
            message: "请输入商品分类",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 图片上传成功
    uploadSuccess() {
      this.$message({ message: "图片上传成功", type: "success" });
    },
    // 级联选择器
    handleChange() {}
  },
  created() {
    categories({ type: this.type }).then(backData => {
      // console.log(backData);
      this.options = backData.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.add {
  .my-alert {
    height: 40px;
    margin-top: 10px;
  }
  .my-steps {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 60%;
  }
  .commoditytitle {
    
  }
}
</style>
