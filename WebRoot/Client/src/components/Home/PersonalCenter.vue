<template>
  <div class="box">
    <div class="left-bar">
      <div class="left-bar-selfinfo">
        <div class="block">
          <el-avatar :size="80" :src="$store.getters.avatar"></el-avatar>
        </div>
        <div class="personal-info">
          <span>用户名：{{$store.getters.userInfo.username}}</span>
          <br />
          <br />
          <span>昵称：{{$store.getters.userInfo.nikeName}}</span>
        </div>
      </div>
      <div class="left-bar-menu">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <router-link class="menu-text" to="/home/personal-center/join-us">
                <el-menu-item index="1">
                  <i class="el-icon-location"></i>
                  商家入驻
                </el-menu-item>
              </router-link>
              <router-link class="menu-text" to="/home/personal-center/order-mng">
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  订单管理
                </el-menu-item>
              </router-link>
              <router-link class="menu-text" to="/home/personal-center/user-info">
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  个人信息
                </el-menu-item>
              </router-link>
              <router-link class="menu-text" to="/home/personal-center/bind-account">
                <el-menu-item index="5">
                  <i class="el-icon-setting"></i>
                  账号绑定
                </el-menu-item>
              </router-link>
              <el-menu-item class="menu-text" index="6" @click="logout">
                <i class="el-icon-setting"></i>
                退出登录
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
    },
    logout () {
      this.$store.dispatch('LogOut').then(res => {
        this.$router.push('/home/overview')
      })
    }
  },
  created () {
    this.$store.dispatch('GetInfo').then(res => {
      if (!res.status) {
        this.$alert('会话已经过期，请重新登录', '会话超时', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/home/overview')
          }
        })
      }
    })
  },
  mounted () {
    $('#hero-area').addClass('limit-h')
    $('#footer').addClass('footer')
  }
}
</script>
<style scoped>
  .box {
    height: 100%;
    width: 80%;
    display: flex;
    margin: auto;
    margin-bottom: 20px;
  }

  .left-bar-selfinfo {
    height: 300px;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
  }

  .personal-info {
    margin: auto;
    text-align: center;
    padding: 20px;
  }

  .personal-info>span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .block {
    height: 82px;
    width: 82px;
    margin: auto;
  }

  .left-bar {
    width: 25%;

  }

  .content {
    width: 75%;
  }

  .limit-h {
    height: 96px;
  }

  .menu-text {
    color: #333;
    text-align: center;
  }

  .footer {
  width: 100%;
  bottom: 0px;
  position: absolute;
  height: 92px;
}
</style>
