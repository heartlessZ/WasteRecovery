<template>
  <div id="home">
    <header id="hero-area" data-stellar-background-ratio="0.5">
      <nav id="nav" class="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
        <div class="container">
          <div class="navbar-header">
            <router-link to="/home/overview#hero-area" class="nav-link page-scroll">
              <img class="img-fulid" :src="imgUrl" alt />
            </router-link >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
              aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <i class="lnr lnr-menu"></i>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="main-navbar">
            <ul class="navbar-nav mr-auto w-100 justify-content-end">
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#hero-area">{{$t('home.home')}}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#services">{{$t('home.synopsis')}}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#features">{{$t('home.information')}}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#portfolios">{{$t('home.recovery')}}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#classification">基本分类</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#contact">{{$t('home.about')}}</router-link>
              </li>
              <li v-if="$store.getters.isLogin" class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/personal-center">{{$t('home.personal')}}</router-link>
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
            <router-link class="page-scroll" to="/home/overview#portfolios">{{$t('home.home')}}</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#services">{{$t('home.synopsis')}}</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#features">{{$t('home.information')}}</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#portfolios">{{$t('home.recovery')}}</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#classification">基本分类</router-link>
          </li>
          <li>
            <router-link class="page-scroll" to="/home/overview#contact">{{$t('home.about')}}</router-link>
          </li>
          <li v-if="$store.getters.isLogin">
            <router-link class="page-scroll" to="/home/personal-center">{{$t('home.personal')}}</router-link>
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
          <el-link :underline="false" @click="loginView()" style="color:#333 !important;">{{$t('home.login')}}</el-link>&nbsp;&nbsp;|&nbsp;&nbsp;
          <el-link :underline="false" @click="registerVew()" style="color:#333 !important;">{{$t('home.regist')}}</el-link>
        </div>
      </nav>
      <div class="container">
        <div id="head-container" class="row justify-content-md-center">
          <div class="col-md-10">
            <div class="contents text-center">
              <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s" style="font-family: FangSong;">{{$t('home.center')}}</h1>
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
            <p>{{copyright}}</p>
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
import request from "../utils/request";
export default {
  name: 'Home',
  data () {
    return {
      imgUrl: require('../assets/img/logo.png'),
      loading: true,
      count: 0,
      copyright:''
    }
  },
  mounted () {
    this.getLogo();
    this.getcopyright();
  },
  methods: {
    getLogo () {
      request.get('/setting/get' + '?vkey=logo').then(res => {
        if (res.status) {
          this.imgUrl = res.data.vvalue;
        }
      })
    },
    getcopyright () {
      request.get('/setting/get' + '?vkey=copyright').then(res => {
        if (res.status) {
          this.copyright = res.data.vvalue;
        }
      })
    },
    loginView () {
      this.$router.push('/login')
    },
    registerVew () {
      this.$router.push('/register')
    },
    loadRootCategories () {
      this.$store.dispatch('QueryRootCategory').then(res => {
      })
    },
    // 点击公告图标事件
    onClickNotice () {
      this.count = null
    }
  },
  created () {

    this.loadRootCategories()
    this.$store.dispatch('GetInfo').then(res => {
      //if(res.status)
        this.loading = false
    })

    this.$store.dispatch('GetConfig').then(res => {
      // console.log(this.$store.getters.config)
    })
    // 查询新公告数目
    userFindNewNoticeNum().then((res) => {
      if (res.status) {
        if (res.num == 0) {
          this.count = null
        } else {
          this.count = res.num
        }
      } else {
        //this.$message.error(res.msg)
      }
    }).catch((err) => {
      //this.$message.error(err.message)
    })
  }
}
$(window).on('scroll', function () {
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
  }

  .footer-text {
    width: 100%;
    text-align: center;
  }

  .limit-h {
    height: 96px;
  }
</style>
