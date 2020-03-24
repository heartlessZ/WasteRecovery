<template>
  <div id="identity-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('IdentityCertificate.realName')" prop="realName">
        <el-input v-model="ruleForm.realName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('IdentityCertificate.idCard')" prop="idCard">
        <el-input v-model="ruleForm.idCard"></el-input>
      </el-form-item>
      <el-form-item :label="$t('IdentityCertificate.frontandback')"  required>
        <upload-img :limit="limit" @getimageurl="getImageUrl"></upload-img>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('base.next')}}</el-button>
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
          { required: true, message: this.$t('IdentityCertificate.inputrealName'), trigger: "blur" },
          { min: 2, max: 5, message: this.$t('BusinessInfo.lenth'), trigger: "blur" }
        ],
        idCard: [
          { required: true, message: this.$t('IdentityCertificate.inputidCard'), trigger: "blur" }
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
              message: this.$t('IdentityCertificate.inputidfrontandback')
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
