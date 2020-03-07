<template>
  <div id="login" v-loading="loading" element-loading-text="登录中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-card class="login-form">
      <div class="login-title">用户登录</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号密码登录" name="first">
          <el-form status-icon :rules="loginRules" ref="loginForm" :model="loginForm" size="small">
            <el-form-item prop="username">
              <el-input @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"
                autofocus="true">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
                auto-complete="off" placeholder="请输入密码">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                <i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="verifycode" v-if="code.type==='true'">
              <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
              <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0rem;" v-if="code.type==='true'">
              <div class="identifybox">
                <div @click="refreshCode">
                  <img :src="imgCode"/>
                </div>
                 <el-checkbox v-model="loginForm.rememberMe">7天免登陆</el-checkbox>
              </div>
            </el-form-item>
            <el-button type="primary" round @click.native.prevent="handleLogin" size="small" class="login-submit">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="短信认证登录" name="second">
          <el-form :model="phLoginForm" status-icon :rules="phLoginRules" ref="phLoginForm" size="small">
            <el-form-item prop="phone">
              <el-input v-model="phLoginForm.phone" auto-complete="off" placeholder="请输入手机号" autofocus="true">
                <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="verifycode" >
              <el-row :gutter="12">
                <el-col :span="16">
                  <el-input v-model="phLoginForm.verifycode" autocomplete="off" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button style="width: 100px;" type="primary" :disabled="sendCodeBtn.disabled" @click="sendCode">{{sendCodeBtn.btntxt}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-button type="primary" size="small" :disabled="loginBtnShow" round @click.native.prevent="phoneLogin"
              class="login-submit">登录</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div style="width: 100%;line-height: 40px;text-align: center;color: #CCC4CC;">
        还没有账号？点此&nbsp;
        <a style="color: #61D2B4;" @click="goRegister()">立即注册</a>
      </div>
    </el-card>
  </div>
</template>

<script>
import {sendSms} from '@/api/user.js';
import request from '../utils/request'
import * as api from "../../../BackStage/src/api";
export default {
  name: 'login',
  data () {
    // 用户名自定义验证规则
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        // console.log('user', value)
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不对'))
        this.sendCodeBtn.disabled = true
        this.loginBtnShow = true
      } else {
        this.sendCodeBtn.disabled = false
        this.loginBtnShow = false
        callback()
      }
    }
    return {
      fontstyle: {},
      loginForm: {
        username: '',
        password: '',
        verifyCode: '',
        rememberMe: false
      },
      code: {
        type: 'false'
      },
      phLoginForm: {
        phone: '',
        verifycode: ''
      },
      loading: false,
      activeName: 'first',
      imgCode: 'http://safeclean.tx-q.cn:4399/user/images/captcha',
      sendCodeBtn: {
        btntxt: '获取验证码',
        disabled: true,
        count: 0
      },
      loginBtnShow: true,
      begin: {},
      loginRules: {
        // 绑定在form表单中的验证规则
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少为6位',
          trigger: 'blur'
        }
        ]
      },
      phLoginRules: {
        phone: [{
          required: true,
          trigger: ['blur', 'change'],
          validator: validatePhone
        }]
      },
      passwordType: 'password'
    }
  },
  mounted () {
    this.getSetting();
  },
  props: [],
  methods: {
    getSetting () {
      request.get('/setting/get' + '?vkey=verification').then(res => {
        if (res.status) {
          this.code.type = res.data.vvalue;
        }
      })
    },
    // 通过改变input的type使密码可见
    showPassword () {
      this.fontstyle === ''
        ? (this.fontstyle = 'color: red')
        : (this.fontstyle = '') // 改变密码可见按钮颜色
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    // 普通登录
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // console.log(this.loginForm)
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.loading = false
            if (res.status) {
              this.$router.push({
                path: '/home'
              })
            } else {
              this.$message({
                type: 'error',
                offset: 70,
                center: true,
                message: res.msg
              })
              this.refreshCode()
            }
          })
        }
      })
    },
    // 通过手机号发送验证码登录
    phoneLogin () {
      this.$refs.phLoginForm.validate(valid => {
        if (valid) {
          let info = {
            phone: this.phLoginForm.phone,
            code: this.phLoginForm.verifycode
          }
          this.$store.dispatch('PhoneLogin', info).then(res => {
            // console.log(res)
            if (res.status) {
              this.$router.push({
                path: '/home'
              })
            } else {
              this.$message({
                type: 'error',
                offset: 70,
                center: true,
                message: res.msg
              })
            }
          })
        }
      })
    },
    // 跳转到注册页面
    goRegister () {
      this.$router.push('/register')
    },
    // 获取验证码函数
    sendCode () {
      this.sendCodeBtn.disabled = true
      this.sendCodeBtn.count = 60
      this.sendCodeBtn.btntxt = '重新发送(' + this.sendCodeBtn.count + 's)'
      // 发送验证码
      sendSms(this.phLoginForm.phone)
      this.begin = setInterval(() => {
        this.sendCodeBtn.count--
        this.sendCodeBtn.btntxt = '重新发送(' + this.sendCodeBtn.count + 's)'
        if (this.sendCodeBtn.count < 1) {
          this.sendCodeBtn.btntxt = '获取验证码'
          this.sendCodeBtn.disabled = false
          clearInterval(this.begin)
        }
      }, 1000)
    },
    resetForm (formName) {
      if (formName === 'phLoginForm') {
        this.sendCodeBtn.disabled = true
        this.loginBtnShow = true
        this.sendCodeBtn.btntxt = '获取验证码'
        clearInterval(this.begin)
      }
      this.$refs[formName].resetFields()
    },
    handleClick (tab, event) {
      this.resetForm('loginForm')
      this.resetForm('phLoginForm')
    },
    // 切换验证码
    refreshCode () {
      var num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
      this.imgCode = 'http://safeclean.tx-q.cn:4399/user/images/captcha?' + num
    }
  }
}
</script>

<style scoped>
  #login {
    width: 100%;
    height: 100%;
    background: #f4f4f4;
  }

  .login-title {
    width: 100%;
    line-height: 35px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }

  .login-form {
    position: absolute;
    width: 22.8125rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-top: 10px solid #61d2b4;
  }

  .identifybox {
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
  }

  .login-submit {
    width: 100%;
  }

  .iconstyle {
    color: #61d2b4;
  }
  .el-checkbox{
    line-height: 40px;
    text-align: center;
  }
</style>
