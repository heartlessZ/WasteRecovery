<template>
  <div
    id="register"
    v-loading="loading"
    :element-loading-text="$t('regist.inregistration')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card class="register-form">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" size="small">
        <div class="register-title">{{$t('regist.reigistnum')}}</div>
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            auto-complete="off"
            :placeholder="$t('regist.username')"
            autofocus="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" :placeholder="$t('regist.password')"></el-input>
        </el-form-item>
        <el-form-item prop="nikeName">
          <el-input v-model="registerForm.nikeName" auto-complete="off" :placeholder="$t('regist.nikename')"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" auto-complete="off" :placeholder="$t('regist.phone')"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" auto-complete="off" :placeholder="$t('regist.email')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="handleRegister" class="long-btn">{{$t('regist.regist')}}</el-button>
        </el-form-item>
        <div style="width: 100%;line-height: 30px;text-align: right;color: #CCC4CC;">
         {{$t('regist.existingaccounts')}}&nbsp;
          <a style="color: #61D2B4;" @click="goLogin()">{{$t('regist.login')}}</a>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from "@/api/user";
export default {
  name: "register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('login.nullusername')));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
        nikeName: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('login.inputpassword'),
            trigger: "blur"
          },
          {
            min: 6,
            message: this.$t('login.passlimit'),
            trigger: "blur"
          }
        ],
        nikeName: [
          {
            required: true,
            message: this.$t('regist.inputnikename'),
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('login.inputphone'),
            trigger: "blur"
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: this.$t('regist.phoneerror'),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('regist.nullemail'),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$t('regist.emailerror'),
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    handleRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then(res => {
              if (res.status === true) {
                this.loading = false;
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.goLogin();
              } else {
                this.loading = false;
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.lodding = false;
            });
        }
      });
    },
    // 跳转到注册页面
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
#register {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
}

.register-title {
  width: 100%;
  line-height: 35px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.register-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22.8125rem;
  border-top: 10px solid #61d2b4;
}

.long-btn {
  width: 100%;
}

.limit-h {
  height: 96px;
}
</style>
