<template>
  <div id="identity-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="营业执照名" prop="businessName">
        <el-input v-model="ruleForm.businessName"></el-input>
      </el-form-item>
      <el-form-item label="信用代码" prop="creditCode">
        <el-input v-model="ruleForm.creditCode"></el-input>
      </el-form-item>
      <el-form-item label="营业执照图片" required>
        <upload-img :limit="limit" @getimageurl="getImageUrl"></upload-img>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="default" @click="previous">返回上一步</el-button> -->
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadImg from "../../RecycleForm/UploadImg";
export default {
  name: "business-info",
  data() {
    return {
      limit: 1,
      ruleForm: {
        businessName: "",
        creditCode: "",
        urls: ''
      },
      rules: {
        businessName: [
          { required: true, message: "请输入营业执照名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        creditCode: [
          { required: true, message: "请输入信用代码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.urls.length < 2) {
            this.$message({
              type: "error",
              offset: 70,
              center: true,
              message: "请上传营业执照照片"
            });
            return false;
          }
          this.$emit("submitapply", this.ruleForm);
        } else {
          return false;
        }
      });
    },
    getImageUrl(urls) {
      this.ruleForm.urls = urls[0];
    },
    previous(){
        this.$emit("previous");
    }
  },
  components: {
    UploadImg
  }
};
</script>

<style scoped>
</style>