<template>
  <div id="userInfo">
    <div class="title">商家入驻</div>
    <el-divider class="line-style"></el-divider>
    <div class="contain">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="上传身份证明"></el-step>
        <el-step title="营业执照"></el-step>
        <el-step title="申请成功，等待审核"></el-step>
      </el-steps>
      <div class="form-card" v-if="active === 0">
        <identity-certificate @nextstep="nextStep"></identity-certificate>
      </div>
      <div class="form-card" v-else-if="active === 1">
        <business-info @submitapply="submitApply" @previous="previous"></business-info>
      </div>
      <div class="form-card" v-else-if="active === 2"><div style="width:40%;margin:auto;height:100px;text-align:center;font-size:1.1rem;">
        提交申请成功，请等待管理员审核，审核结果将在三个工作日内通过短信下发至您的手机</div></div>

      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
  </div>
</template>

<script>
import IdentityCertificate from "./JoinUs/IdentityCertificate";
import BusinessInfo from "./JoinUs/BusinessInfo";
import {settledInApply} from '../../../api/user'
export default {
  name: "join-us",
  data() {
    return {
      active: 0,
      applyForm: {
        businessLicense: "",
        businessName: "",
        cardBack: "",
        cardName: "",
        cardPositive: "",
        creditCode: "",
        idCard: "",
        regionId: 0
      }
    };
  },
  components: {
    IdentityCertificate,
    BusinessInfo
  },
  methods: {
    nextStep(identityForm) {
      this.applyForm.cardName = identityForm.realName
      this.applyForm.idCard = identityForm.idCard
      this.applyForm.cardPositive = identityForm.urls[0]
      this.applyForm.cardBack = identityForm.urls[1]
      this.active++;
    },
    previous(){
      console.log(this.applyForm)
      this.active--;
    },
    submitApply(businessForm) {
      this.applyForm.businessName = businessForm.businessName
      this.applyForm.creditCode = businessForm.creditCode
      this.applyForm.businessLicense = businessForm.urls
      this.regionId = this.$store.getters.userInfo.regionId
      settledInApply(this.applyForm).then(res=>{
        this.active++
      })
    }
  }
};
</script>

<style scoped>
#userInfo {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.form-card {
  width: 100%;
  height: 500px;
  padding-top: 30px;
}

.title {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  width: 100%;
}

.line-style {
  margin: 8px 0;
}

.contain {
  width: 100%;
  padding: 10px 40px;
  min-height: 635px;
}
</style>