<template>
  <div id="identity-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="ruleForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="ruleForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="身份证正反面照片" required>
        <upload-img :limit="limit" @getimageurl="getImageUrl"></upload-img>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadImg from "../../RecycleForm/UploadImg";
export default {
  name: "identity-certificate",
  data() {
    return {
      limit: 2,
      ruleForm: {
        realName: "",
        idCard: "",
        urls: []
      },
      rules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
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
              message: "请上传身份证正反面照片"
            });
            return false;
          }
          this.$emit("nextstep", this.ruleForm);
        } else {
          return false;
        }
      });
    },
    getImageUrl(urls) {
      this.ruleForm.urls = urls;
    }
  },
  components: {
    UploadImg
  }
};
</script>

<style scoped>
</style>