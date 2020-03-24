<template>
  <section id="services" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">{{$t('Intro.title')}}</h2>
          <hr class="lines wow zoomIn" data-wow-delay="0.3s">
          <p class="section-subtitle wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">{{$t('Intro.Profile')}}</p>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="0.2s">
              <div class="icon">
                <i class="el-icon-s-home"></i>
              </div>
              <h4>{{$t('Intro.recycling')}}</h4>
              <p>{{$t('Intro.recyclingcontent')}}</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="0.8s">
              <div class="icon">
                <i class="el-icon-s-promotion"></i>
              </div>
              <h4>{{$t('Intro.overbooking')}}</h4>
              <p>{{$t('Intro.overbookingcontent')}}</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="1.2s">
              <div class="icon">
                <i class="el-icon-s-shop"></i>
              </div>
              <h4>{{$t('Intro.Joinus')}}</h4>
              <p>{{$t('Intro.Joinuscontent')}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'intro'
}
</script>
