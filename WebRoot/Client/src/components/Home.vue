<template>
  <div>
    <!-- Header Section Start -->
    <header id="hero-area" data-stellar-background-ratio="0.5">
      <nav id="nav" class="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
        <div class="container">
          <div class="navbar-header">
            <a href="index.html" class="navbar-brand"><img class="img-fulid" :src='imgUrl' alt=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
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
                <router-link class="nav-link page-scroll" to='/home/overview#portfolios'>回收</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/overview#contact">联系我们</router-link>
              </li>
              <li v-if='$store.state.isLogin' class="nav-item">
                <router-link class="nav-link page-scroll" to="/home/personal-center">个人中心</router-link>
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
              <a class="page-scroll" href="#services">简介</a>
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
            <li v-if='$store.state.isLogin'>
                <router-link class="page-scroll" to="/home/personal-center">个人中心</router-link>
            </li>
        </ul>
        <div v-if='!$store.state.isLogin'>
          <button>登录</button>&nbsp;&nbsp;|&nbsp;&nbsp;<button>注册</button>
        </div>
      </nav>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-10">
            <div class="contents text-center">
              <!-- <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Mate - Free Parallax Website Template</h1>
              <p class="lead  wow fadeIn" data-wow-duration="1000ms" data-wow-delay="400ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <a href="#" class="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">Download</a> -->
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Header Section End --> 
    
    <router-view/>

    <!-- Footer Section Start -->
    <footer>          
      <div class="container">
        <div class="row">
          <!-- Footer Links -->
          <div class="col-lg-6 col-sm-6 col-xs-12">
            <ul class="footer-links">
              <li>
                <a href="#">Homepage</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 col-sm-6 col-xs-12">
            <div class="copyright">
              <p>UIdeck All copyrights reserved &copy; 2018 - Designed & Developed. More Templates <a href="http://www.cssmoban.com/" target="_blank" title="模板之家">模板之家</a> - Collect from <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a></p>
            </div>
          </div>  
        </div>
      </div>
    </footer>
    <!-- Footer Section End --> 

    <!-- Go To Top Link -->
    <a href="#" class="back-to-top">
      <i class="lnr lnr-arrow-up"></i>
    </a>
    
    <!-- <div id="loader">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>   -->
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

export default {
  name: 'Home',
  data () {
    return {
      imgUrl: require('../assets/img/logo.png')
    }
  }
}

$(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('#nav').addClass('top-nav-collapse');
            $('#nav').addClass('menu-bg');
        } else {
            $('#nav').removeClass('top-nav-collapse');
            $('#nav').removeClass('menu-bg');
        }
    });
</script>
<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
