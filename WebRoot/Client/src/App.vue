<template>
  <div id="app">
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
                <a class="nav-link page-scroll" href="#hero-area">首页</a>
              </li>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#services">简介</a>
              </li>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#features">咨询</a>
              </li>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#portfolios">回收</a>
              </li>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#contact">联系我们</a>
              </li>
              <li v-if='isLogin' class="nav-item">
                <a class="nav-link page-scroll" href='http://www.baidu.com'>个人中心</a>
              </li>
            </ul>
          </div>
        </div>
        <ul class="mobile-menu">
           <li>
              <a class="page-scroll" href="#hero-area">首页</a>
            </li>
            <li>
              <a class="page-scroll" href="#services">简介</a>
            </li>
            <li>
              <a class="page-scroll" href="#features">咨询</a>
            </li>
            <li>
              <a class="page-scroll" href="#portfolios">回收</a>
            </li>
            <li>
              <a class="page-scroll" href="#contact">联系我们</a>
            </li>
            <li v-if='isLogin'>
              <a class="page-scroll" href="#af">个人中心</a>
            </li>
        </ul>
        <div v-if='!isLogin'>
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

    <!-- Services Section Start -->
    <section id="services" class="section">
      <div class="container">
        <div class="section-header">          
          <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">简介</h2>
          <hr class="lines wow zoomIn" data-wow-delay="0.3s">
          <p class="section-subtitle wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">网站简介</p>
        </div>
        
      </div>
    </section>
    <!-- Services Section End -->

    <!-- Features Section Start -->
    <section id="features" class="section" data-stellar-background-ratio="0.2">
      <div class="container">
        <div class="section-header">          
          <h2 class="section-title">今日废品价格</h2>
          <hr class="lines">
          <p class="section-subtitle">小标题</p>
        </div>
        <div class="row">
          <div class="col-lg-8 col-md-12 col-xs-12">
            <div class="container">
              <div class="row">
                 <div class="col-lg-6 col-sm-6 col-xs-12 box-item">
                    <span class="icon">
                      <i class="lnr lnr-rocket"></i>
                    </span>
                    <div class="text">
                      <h4>Bootstrap 4 Based</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-xs-12 box-item">
                    <span class="icon">
                      <i class="lnr lnr-laptop-phone"></i>
                    </span>
                    <div class="text">
                      <h4>Fully Responsive</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-xs-12 box-item">
                    <span class="icon">
                      <i class="lnr lnr-layers"></i>
                    </span>
                    <div class="text">
                      <h4>Parallax Background</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-xs-12 box-item">
                    <span class="icon">
                      <i class="lnr lnr-cog"></i>
                    </span>
                    <div class="text">
                      <h4>Easy to Customize</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </section>
    <!-- Features Section End -->

    <!-- Portfolio Section -->
    <section id="portfolios" class="section">
      <!-- Container Starts -->
      <div class="container">
        <div class="section-header">          
          <h2 class="section-title">废品回收</h2>
          <hr class="lines">
          <p class="section-subtitle">废品回收</p>
        </div>
        <div class="row">
          <form action="">
            <!-- 废品回收表单 -->
          </form>
          <div class="col-md-12">
            <!-- Portfolio Controller/Buttons -->
            <!-- <div class="controls text-center">
              <a class="filter active btn btn-common" data-filter="all">
                All 
              </a>
              <a class="filter btn btn-common" data-filter=".design">
                Design 
              </a>
              <a class="filter btn btn-common" data-filter=".development">
                Development
              </a>
              <a class="filter btn btn-common" data-filter=".print">
                Print 
              </a>
            </div> -->
            <!-- Portfolio Controller/Buttons Ends-->
          </div>

          <!-- Portfolio Recent Projects -->
          <!-- <div id="portfolio" class="row">
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development print">
              <div class="portfolio-item">
                <div class="shot-item">
                  <img src="img/portfolio/img1.jpg" alt="" />  
                  <a class="overlay lightbox" href="img/portfolio/img1.jpg">
                    <i class="lnr lnr-eye item-icon"></i>
                  </a>
                </div>               
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix design print">
              <div class="portfolio-item">
                <div class="shot-item">
                  <img src="img/portfolio/img2.jpg" alt="" />  
                  <a class="overlay lightbox" href="img/portfolio/img2.jpg">
                    <i class="lnr lnr-eye item-icon"></i>
                  </a>
                </div>               
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development">
              <div class="portfolio-item">
                <div class="shot-item">
                  <img src="img/portfolio/img3.jpg" alt="" />  
                  <a class="overlay lightbox" href="img/portfolio/img3.jpg">
                    <i class="lnr lnr-eye item-icon"></i>
                  </a>
                </div>               
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development design">
              <div class="portfolio-item">
                <div class="shot-item">
                  <img src="img/portfolio/img4.jpg" alt="" />  
                  <a class="overlay lightbox" href="img/portfolio/img4.jpg">
                    <i class="lnr lnr-eye item-icon"></i>
                  </a>
                </div>               
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development">
              <div class="portfolio-item">
                <div class="shot-item">
                  <img src="img/portfolio/img5.jpg" alt="" />  
                  <a class="overlay lightbox" href="img/portfolio/img5.jpg">
                    <i class="lnr lnr-eye item-icon"></i>
                  </a>
                </div>               
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix print design">
              <div class="portfolio-item">
                <div class="shot-item">
                  <img src="img/portfolio/img6.jpg" alt="" />  
                  <a class="overlay lightbox" href="img/portfolio/img6.jpg">
                    <i class="lnr lnr-eye item-icon"></i>
                  </a>
                </div>               
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- Container Ends -->
    </section>
    <!-- Portfolio Section Ends --> 
    
    <router-view/>

    <!-- Contact Section Start -->
    <section id="contact" class="section" data-stellar-background-ratio="-0.2">      
      <div class="contact-form">
        <div class="container">
          <div class="row">     
            <div class="col-lg-6 col-sm-6 col-xs-12">
              <div class="contact-us">
                <h3>Contact With us</h3>
                <div class="contact-address">
                  <p>Centerville Road, DE 19808, US </p>
                  <p class="phone">Phone: <span>(+94 123 456 789)</span></p>
                  <p class="email">E-mail: <span>(contact@mate.com)</span></p>
                </div>
                <div class="social-icons">
                  <ul>
                    <li class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li class="linkedin"><a href="#"><i class="fa fa-linkedin"></i></a></li>
                    <li class="dribbble"><a href="#"><i class="fa fa-dribbble"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>     
            <div class="col-lg-6 col-sm-6 col-xs-12">
              <div class="contact-block">
                <form id="contactForm">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required data-error="Please enter your name">
                        <div class="help-block with-errors"></div>
                      </div>                                 
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <input type="text" placeholder="Your Email" id="email" class="form-control" name="name" required data-error="Please enter your email">
                        <div class="help-block with-errors"></div>
                      </div> 
                    </div>
                    <div class="col-md-12">
                      <div class="form-group"> 
                        <textarea class="form-control" id="message" placeholder="Your Message" rows="8" data-error="Write your message" required></textarea>
                        <div class="help-block with-errors"></div>
                      </div>
                      <div class="submit-button text-center">
                        <button class="btn btn-common" id="submit" type="submit">Send Message</button>
                        <div id="msgSubmit" class="h3 text-center hidden"></div> 
                        <div class="clearfix"></div> 
                      </div>
                    </div>
                  </div>            
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>           
    </section>
    <!-- Contact Section End -->

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
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/line-icons.css'
import './assets/css/owl.carousel.css'
import './assets/css/owl.theme.css'
import './assets/css/nivo-lightbox.css'
import './assets/css/magnific-popup.css'
import './assets/css/slicknav.css'
import './assets/css/animate.css'
import './assets/css/main.css'
import './assets/css/responsive.css'

import './assets/js/jquery-min.js'
//import './assets/js/popper.min.js'
// import './assets/js/bootstrap.min.js'
// import './assets/js/jquery.mixitup.js'
// import './assets/js/nivo-lightbox.js'
// import './assets/js/owl.carousel.js'
// import './assets/js/jquery.stellar.min.js'
// import './assets/js/jquery.nav.js'
//import './assets/js/scrolling-nav.js'
// import './assets/js/jquery.easing.min.js'
// import './assets/js/smoothscroll.js'
// import './assets/js/jquery.slicknav.js'
// import {WOW} from './assets/js/wow.js'
// import './assets/js/jquery.vide.js'
// import './assets/js/jquery.counterup.min.js'
// import './assets/js/jquery.magnific-popup.min.js'
// import './assets/js/waypoints.min.js'
// import './assets/js/form-validator.min.js'
// import './assets/js/contact-form-script.js'
// import './assets/js/main.js'
export default {
  name: 'App',
  data () {
    return {
      isLogin: false,
      imgUrl: require('./assets/img/logo.png')
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
