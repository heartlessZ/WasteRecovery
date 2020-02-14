<template>
  <div id="userInfo">
    <div class="title">更换手机号</div>
    <el-divider class="line-style"></el-divider>
    <div class="contain">
      <div class="form-card">
        <el-form
          :model="applyForm"
          :rules="rules"
          ref="applyForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="验证码" prop="code">
            <el-col :span="11">
              <el-input v-model="applyForm.code"></el-input>
            </el-col>
            <el-col :span="11">
              <span v-if="!active">{{count}}秒后重试</span>
              <el-button type="primary" @click="sendCode" :disabled="!active">向本机发生验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="新手机号码" prop="newTelNum">
            <el-input v-model="applyForm.newTelNum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('applyForm')">确认更改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSms, editPhone, verificationPhone } from "../../../api/user";
export default {
  name: "bind-account",
  data() {
    return {
      active: true,
      count: 0,
      applyForm: {
        code: "",
        newTelNum: ""
      },
      rules: {
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        newTelNum: [
          { required: true, message: "请输入新绑定的手机号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let info = {
            phone: this.$store.getters.userInfo.phone,
            code: this.applyForm.code
          };
          verificationPhone(info).then(res => {
            if (res.status) {
              editPhone(this.applyForm.newTelNum).then(r => {
                if (r.status) {
                  this.$notify({
                    title: "操作提示",
                    message: "绑定新手机号成功",
                    type: "success",
                    offset: 70
                  });
                }
              });
            } else {
              this.$notify({
                title: "操作提示",
                message: "验证失败",
                type: "error",
                offset: 70
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    sendCode() {
      let that = this;

      //发送验证码
      sendSms(this.$store.getters.userInfo.phone).then(res => {
        if (res.status) {
          //计数器
          that.active = false;
          that.count = 120;
          let begin = setInterval(function() {
            that.count--;
            if (that.count < 1) {
              clearInterval(begin);
              that.active = true;
            }
          }, 1000);
        }
      });

      //console.log(this.$store.getters.userInfo.phone);
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