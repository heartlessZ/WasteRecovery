<template>
  <div class="login-container">
    <div class="login-info">
      <div class="title">环保卫士商家服务</div>
      <div class="desc">1. 欢迎</div>
      <div class="desc">2. 阅读条例</div>
    </div>
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
        <lang-select class="set-language" />
      </div>
      <span>
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="form.username"
            placeholder="用户名/邮箱/手机"
            prefix-icon="el-icon-user"
            name="username"
            type="text"
            autocomplete="off"
            @keyup.enter="login"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="form.password"
            prefix-icon="el-icon-key"
            type="password"
            placeholder="密码"
            name="password"
            autocomplete="off"
            :show-password="true"
            @keyup.enter="login"
          />
        </el-form-item>
        <el-form-item prop="code" class="code-input">
          <el-input
            ref="code"
            v-model="form.verifyCode"
            prefix-icon="el-icon-lock"
            placeholder="验证码"
            name="code"
            type="text"
            autocomplete="off"
            style="width: 70%"
            @keyup.enter="login"
          />
        </el-form-item>
        <img :src="imgCode" alt="codeImage" class="code-image" @click="refreshCode">
        <el-checkbox v-model="form.rememberMe">7天免登陆</el-checkbox>
        <br>
        <br>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:14px;" @click.native.prevent="login">
         登录
        </el-button>
      </span>
    </el-form>
    <span class="login-footer">
      © 2019 <a target="_blank" href="#">环保卫士商家</a> - HBWS
    </span>
  </div>
</template>
<script>
  import types from "../store/mutation-types";
  import * as api from "../api";
  import auth from "../common/auth";
  import * as sysApi from "../services/sys";
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from "vuex";

  export default {
    name: "login",
    data() {
      return {
        loading: false,
        imgCode: 'http://safeclean.tx-q.cn:4399/user/images/captcha',
        form: {
          username: "",
          password: "",
          verifyCode: '',
          rememberMe: false
        },rules: {
          username: { required: true, message: '不能为空', trigger: 'blur' },
          password: { required: true, message: '不能为空', trigger: 'blur' },
          code: { required: true, message: '不能为空', trigger: 'blur' },
        },
      };
    },
    components: {},
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO
      }),
      ...mapActions({
        loadMenuList: "loadMenuList" // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
      }),
      // 切换验证码
      refreshCode() {
        var num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
        this.imgCode = 'http://safeclean.tx-q.cn:4399/user/images/captcha?' + new Date()
      },
      login() {
        let username_c = false
        let password_c = false
        let code_c = false
        this.$refs.loginForm.validateField('username', e => { if (!e) { username_c = true } })
        this.$refs.loginForm.validateField('password', e => { if (!e) { password_c = true } })
        this.$refs.loginForm.validateField('code', e => { if (!e) { code_c = true } })
        this.loading = true;
        var redirectUrl = "";
        if (!username_c && !password_c && !code_c
        ) {
          redirectUrl = this.$route.query.redirect;
        }else {
        this.$store.dispatch("Login", this.form).then(res => {
          this.loading = false;
          if (res.status) {
            this.$router.push({
              path: "/"
            });
          } else {
            this.$message({
              type: "error",
              offset: 70,
              center: true,
              message: res.msg
            });
          }
        });
        }
      }
    }
  };
</script>
<style lang="scss">
  @import "login";
</style>

<style lang="scss" scoped>
  @import "login-scoped";
</style>
