<template>
  <div id="register" v-loading="loading" element-loading-text="注册中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-card class="register-form">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" size="small">
        <div class="register-title">注册账号</div>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" auto-complete="off" placeholder="用户名" autofocus="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" auto-complete="off" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="nikeName">
          <el-input v-model="registerForm.nikeName" auto-complete="off" placeholder="昵称">
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" auto-complete="off" placeholder="电话">
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" auto-complete="off" placeholder="邮箱">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="handleRegister" class="long-btn">注册</el-button>
        </el-form-item>
        <div style="width: 100%;line-height: 30px;text-align: right;color: #CCC4CC;">已有账号去&nbsp;<a style="color: #61D2B4;"
            @click="goLogin()">登录</a></div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'register',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        email: '',
        phone: '',
        nikeName: ''
      },
      loading: false,
      rules: {
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
        ],
        nikeName: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式不对',
          trigger: 'blur'
        }
        ],
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
        ]
      }
    }
  },
  methods: {
    handleRegister () {
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          this.loading = true
          register(this.registerForm).then((res) => {
            if (res.status === true) {
              this.loading = false
              this.$message({
                message: '注册成功！',
                type: 'success'
              })
              this.goLogin()
            } else {
              this.loading = false
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          }).catch(() => {
            this.lodding = false
          })
        }
      })
    },
    // 跳转到注册页面
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  #register {
    width: 100%;
    height: 100%;
    background: #F4F4F4;
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
    left: 0;
    right: 0;
    width: 22.8125rem;
    margin: 8.75rem auto;
    border-top: 10px solid #61D2B4;
  }

  .long-btn {
    width: 100%;
  }
</style>
