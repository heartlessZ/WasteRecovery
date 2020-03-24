<template>
  <div id="userInfo">
    <div class="title">{{$t('BindAccount.title')}}</div>
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
          <el-form-item :label="$t('BindAccount.Code')" prop="code">
            <el-col :span="11">
              <el-input v-model="applyForm.code"></el-input>
            </el-col>
            <el-col :span="11">
              <span v-if="!active">{{count}}{{$t('BindAccount.CodeTips')}}</span>
              <el-button type="primary" @click="sendCode" :disabled="!active">{{$t('BindAccount.sendCode')}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('BindAccount.newPhone')" prop="newTelNum">
            <el-input v-model="applyForm.newTelNum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('applyForm')">{{$t('BindAccount.confirm')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSms, editPhone, verificationPhone } from '../../../api/user'
export default {
  name: 'bind-account',
  data () {
    return {
      active: true,
      count: 0,
      applyForm: {
        code: '',
        newTelNum: ''
      },
      rules: {
        code: [{ required: true, message: this.$t('BindAccount.inputCode'), trigger: 'blur' }],
        newTelNum: [
          { required: true, message: this.$t('BindAccount.inputNewPhone'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let info = {
            phone: this.$store.getters.userInfo.phone,
            code: this.applyForm.code
          }
          verificationPhone(info).then(res => {
            if (res.status) {
              // console.log(res)
              this.$notify({
                title: this.$t('BindAccount.Tips'),
                message: res.msg,
                type: 'success',
                offset: 70
              })
            } else {
              this.$notify({
                title: this.$t('BindAccount.Tips'),
                message: res.msg,
                type: 'error',
                offset: 70
              })
            }
          })
        } else {
          return false
        }
      })
    },
    sendCode () {
      let that = this
      // 发送验证码
      sendSms(this.$store.getters.userInfo.phone).then(res => {
        if (res.status) {
          // 计数器
          that.active = false
          that.count = 120
          let begin = setInterval(function () {
            that.count--
            if (that.count < 1) {
              clearInterval(begin)
              that.active = true
            }
          }, 1000)
        }
      })

      // console.log(this.$store.getters.userInfo.phone);
    }
  }
}
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
