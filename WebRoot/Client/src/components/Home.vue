<template>
  <div>
    <!-- Header Section Start -->
    <header id="hero-area" data-stellar-background-ratio="0.5">
      <nav id="nav" class="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
        <div class="container">
          <div class="navbar-header">
            <a href="index.html" class="navbar-brand">
              <img class="img-fulid" :src="imgUrl" alt />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main-navbar"
              aria-controls="main-navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
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
              <li v-if="$store.state.isLogin" class="nav-item">
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
          <li v-if="$store.state.isLogin">
            <router-link class="page-scroll" to="/home/personal-center">个人中心</router-link>
          </li>
        </ul>
        <div v-if="!$store.state.isLogin">
          <button>登录</button>&nbsp;&nbsp;|&nbsp;&nbsp;
          <button>注册</button>
        </div>
      </nav>
      <div class="container">
        <div class="row justify-content-md-center">
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
    <footer>
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

    <!-- <div id="loader">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>-->
  </div>
</template>

<script>
import "../assets/css/bootstrap.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/line-icons.css";
import "../assets/css/owl.carousel.css";
import "../assets/css/owl.theme.css";
import "../assets/css/nivo-lightbox.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/slicknav.css";
import "../assets/css/animate.css";
import "../assets/css/main.css";
import "../assets/css/responsive.css";

import "../assets/js/jquery-min.js";

export default {
  name: "Home",
  data() {
    return {
      imgUrl: require("../assets/img/logo.png")
    };
  },
  created() {
    console.log("created");
    document.getElementsByClassName('nav-link').onclick = function() {
      console.log("click a");
    };
    $("router-link").click(function() {
      console.log("click a");
    });
  }
};

$(window).on("scroll", function() {
  if ($(window).scrollTop() > 200) {
    $("#nav").addClass("top-nav-collapse");
    $("#nav").addClass("menu-bg");
  } else {
    $("#nav").removeClass("top-nav-collapse");
    $("#nav").removeClass("menu-bg");
  }
});
</script>
<style>
#app {
  height: 100%;
  width: 100%;
}
.footer-text {
  width: 100%;
  text-align: center;
}
</style>
