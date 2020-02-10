<template>
  <div class="box">
    <div class="left-bar">
      <div class="left-bar-selfinfo">
        <div class="block">
          <el-avatar :size="80" :src="imgUrl"></el-avatar>
        </div>
      </div>
      <div class="left-bar-menu">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <router-link class="menu-text" to="/home/personal-center/join-us">商家入驻</router-link>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <router-link class="menu-text" to="">订单管理</router-link>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <router-link class="menu-text" to="">我的钱包</router-link>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <router-link class="menu-text" to="/home/personal-center/user-info">个人信息</router-link>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                <router-link class="menu-text" to="">账号绑定</router-link>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="el-icon-setting"></i>
                <router-link class="menu-text" to="">退出登录</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal-center',
  data () {
    return {
      imgUrl: require('../../assets/img/cat.jpg')
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
    $('#hero-area').addClass('limit-h')
    this.$store.dispatch('GetInfo').then(res => {
      if (!res.status) {
        this.$alert('会话已经过期，请重新登录', '会话超时', {
          confirmButtonText: '确定',
          callback: action => {
            window.history.go(-1)
          }
        })
      }
    })
  }
}
</script>
<style>
  .box {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .left-bar {
    width: 20%;
  }

  .content {
    width: 70%;
  }

  .limit-h {
    height: 96px;
  }

  .menu-text {
    color: #333;
  }
</style>
