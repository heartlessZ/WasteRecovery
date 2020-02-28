<template>
  <div id="home">
    <header id="hero-area" data-stellar-background-ratio="0.5">
      <nav id="nav" class="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
        <div class="container">
          <div class="navbar-header">
            <a href="index.html" class="navbar-brand">
              <img class="img-fulid" :src="imgUrl" alt />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
              aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <i class="lnr lnr-menu"></i>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="main-navbar">
            <ul class="navbar-nav mr-auto w-100 justify-content-end">
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#hero-area">首页</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#services">简介</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#features">咨询</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#portfolios">回收</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#contact">联系我们</router-link>
              </li>
              <li v-if="$store.getters.isLogin" class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/personal-center">个人中心</router-link>
              </li>
              <li v-if="$store.getters.isLogin" class="nav-item" @click="onClickNotice">
                <router-link class="nav-link page-scroll" to="/home/notice">
                  <el-badge :value="count">
                    <i class="el-icon-message-solid" style="font-size: 20px;line-height: 40px;"></i>
                  </el-badge>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <ul class="mobile-menu">
          <li>
            <router-link class="page-scroll" to="/home/overview#portfolios">首页</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#services">简介</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#features">咨询</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#portfolios">回收</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#contact">联系我们</router-link>
          </li>
          <li v-if="$store.getters.isLogin">
            <router-link class="page-scroll" to="/home/personal-center">个人中心</router-link>
          </li>
          <li v-if="$store.getters.isLogin" class="nav-item" @click="onClickNotice">
            <router-link class="nav-link page-scroll" to="/home/notice">
              <el-badge :value="count">
                <i class="el-icon-message-solid" style="font-size: 20px;line-height: 40px;"></i>
              </el-badge>
            </router-link>
          </li>
        </ul>
        <div v-if="!$store.getters.isLogin" style="margin-right:20px;color:#333;">
          <el-link :underline="false" @click="loginView()" style="color:#333 !important;">登录</el-link>&nbsp;&nbsp;|&nbsp;&nbsp;
          <el-link :underline="false" @click="registerVew()" style="color:#333 !important;">注册</el-link>
        </div>
      </nav>
      <div class="container">
        <div id="head-container" class="row justify-content-md-center">
          <div class="col-md-10">
            <div class="contents text-center">
              <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">一句响亮的口号</h1>
              <p class="lead wow fadeIn" data-wow-duration="1000ms" data-wow-delay="400ms">这个网站是干什么的</p>
              <!-- <a href="#" class="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">Download</a> -->
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Header Section End -->

    <router-view />

    <!-- Footer Section Start -->
    <footer class="footer" id="footer">
      <div class="container">
        <div class="row">
          <div class="copyright footer-text">
            <p>环保卫士 &copy; 2020 - Designed & Developed by 世界和平</p>
          </div>
        </div>
      </div>
    </footer>
    <!-- Footer Section End -->

    <!-- Go To Top Link -->
    <a href="#" class="back-to-top">
      <i class="lnr lnr-arrow-up"></i>
    </a>

    <div id="loader" v-if="loading">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/css/bootstrap.min.css'
  import '../assets/css/font-awesome.min.css'
  import '../assets/css/line-icons.css'
  import '../assets/css/owl.carousel.css'
  import '../assets/css/owl.theme.css'
  import '../assets/css/nivo-lightbox.css'
  import '../assets/css/magnific-popup.css'
  import '../assets/css/slicknav.css'
  import '../assets/css/animate.css'
  import '../assets/css/main.css'
  import '../assets/css/responsive.css'

  import '../assets/js/jquery-min.js'
  import {
    userFindNewNoticeNum
  } from '@/api/notice.js'
  export default {
    name: 'Home',
    data() {
      return {
        imgUrl: require('../assets/img/logo.png'),
        loading: true,
        count: 0,
      }
    },
    methods: {
      loginView() {
        this.$router.push('/login')
      },
      registerVew() {
        this.$router.push('/register')
      },
      loadRootCategories() {
        this.$store.dispatch('QueryRootCategory').then(res => {
          // console.log(this.$store.getters.rootCategories)
        })
      },
      //点击公告图标事件
      onClickNotice() {
        this.count = null
      }
    },
    created() {
      this.loadRootCategories()
      this.$store.dispatch('GetInfo').then(res => {
        this.loading = false
        console.log(this.$store.getters.userInfo)
      })

      this.$store.dispatch('GetConfig').then(res => {
        console.log(this.$store.getters.config)
      })
      //查询新公告数目
      userFindNewNoticeNum().then((res) => {
        if (res.status) {
          if (res.num == 0) {
            this.count = null
          } else {
            this.count = res.num
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch((err) => {
        this.$message.error(err.message)
      })
    }
  }
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 200) {
      $('#nav').addClass('top-nav-collapse')
      $('#nav').addClass('menu-bg')
    } else {
      $('#nav').removeClass('top-nav-collapse')
      $('#nav').removeClass('menu-bg')
    }
  })
</script>
<style>
  #app {
    width: 100%;
  }

  #home {
    min-height: 936px;
    display: flex;
    flex-direction: column;
  }

  .footer-text {
    width: 100%;
    text-align: center;
  }

  .limit-h {
    height: 96px;
  }
</style>
