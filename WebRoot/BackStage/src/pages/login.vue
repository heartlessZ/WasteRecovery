<template lang="html">
  <el-row>
    <el-col :span="12" :offset="6">
      <div class="login">
      <el-row slot="body" :gutter="0" >
      <el-col :span="24" :xs="24" :sm="16" :md="16" :lg="16">
        <div class="login-form">
          <div class="card-block">
            <h1>平台登录</h1>
            <div class="input-group m-b-1">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input type="text" class="form-control" placeholder="请输入用户名" v-model="form.username">
            </div>
            <div class="input-group m-b-2">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input type="password" class="form-control" placeholder="请输入密码" v-model="form.password"
                     @keyup.enter="login">
            </div>
            <div class="row">
              <el-row>
                <el-col :span="12">
                  <el-button type="primary" class="btn btn-primary p-x-2" @click="login">登录</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="button" class="btn btn-link forgot" style="float:right;">忘记密码?</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        </el-col>
      
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import types from "../store/mutation-types";
import * as api from "../api";
import auth from "../common/auth";
import * as sysApi from "../services/sys";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      form: {
        username: "123456",
        password: "123456"
      }
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
    login() {
      this.loading = true;
      var redirectUrl = "";
      if (
        this.$route.query &&
        this.$route.query != null &&
        this.$route.query.redirect &&
        this.$route.query.redirect != null
      ) {
        redirectUrl = this.$route.query.redirect;
      }
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
    // loginSuccess({ sid, user, redirectUrl }) {
    //   auth.login(sid);
    //   window.sessionStorage.setItem("user-info", JSON.stringify(user));
    //   this.setUserInfo(user);
    //   this.$http.defaults.headers.common["authSid"] = sid;
    //   this.loadMenuList();
    //   redirectUrl && this.$router.push({ path: redirectUrl });
    // }
  }
};
</script>

<style>
.login {
  margin-top: 160px;
  width: 100%;
  border: 1px solid #cfd8dc;
  margin-right: auto !important;
  margin-left: auto !important;
  display: table;
  table-layout: fixed;
  background-color: #20a8d8;
}

.login .el-button {
  border-radius: 0;
}

.login .el-button.forgot,
.login .el-button.forgot:hover {
  border: none;
}

.login .login-form {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: block;
}

.login .login-form .card-block {
  padding: 35px;
}

.login .login-form .card-block p {
  margin: 15px 0;
}

.input-group {
  width: 100%;
  display: table;
  border-collapse: separate;
  margin-bottom: 20px !important;
}

.input-group,
.input-group-btn,
.input-group-btn > .btn,
.navbar {
  position: relative;
}

.input-group-addon:not(:last-child) {
  border-right: 0;
}

.input-group-addon,
.input-group-btn {
  min-width: 40px;
  white-space: nowrap;
  vertical-align: middle;
  width: 1%;
}

.btn-link:focus,
.btn-link:hover {
  color: #167495;
  text-decoration: underline;
  background-color: transparent;
}

.btn-link,
.btn-link:active,
.btn-link:focus,
.btn-link:hover {
  border-color: transparent;
}

.btn.focus,
.btn:focus,
.btn:hover {
  text-decoration: none;
}

.input-group-addon {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #607d8b;
  text-align: center;
  background-color: #cfd8dc;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.input-group .form-control,
.input-group-addon,
.input-group-btn {
  display: table-cell;
}

.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  margin-bottom: 0;
}

.form-control {
  width: 90%;
  padding: 0.5rem 0.75rem;
  font-size: 1.5rem;
  line-height: 1.75rem;
  color: #607d8b;
  background: #fff none;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.login .login-form .card-block .row {
  display: block;
  margin: 15px 0;
}

.login .login-register {
  width: 100%;
  height: 100%;
  display: block;
  background-color: #20a8d8;
  color: #fff;
}

.login .login-register .card-block {
  text-align: center !important;
  padding: 30px;
}

.login .login-register .card-block p {
  text-align: left !important;
  margin: 15px 0;
  height: 100px;
}
</style>
