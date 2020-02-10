<template>
  <section id="features" class="section" data-stellar-background-ratio="0.2">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">今日废品价格</h2>
        <hr class="lines" />
        <!-- <p class="section-subtitle">小标题</p> -->
      </div>
      <div class="row category-recycle">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(o, index) in list" :key="o.id" :offset="index > 1 ? 2: 2">
            <div class="grid-content">
              <span class="category-title" >{{o.classificationName}}</span><br/><br/>
              <span class="category-price-range">{{o.minprice}}-{{o.maxprice}}元/kg</span>
              <div>
                <span class="category-icon"><svg t="1580963907781" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1152" width="200" height="200"><path d="M474.88 883.2c-2.56 0-6.4-1.28-8.96-2.56l-75.52-60.16-81.92 51.2c-5.12 2.56-10.24 2.56-15.36 0l-79.36-57.6-80.64 53.76c-3.84 2.56-8.96 2.56-12.8 0-3.84-2.56-7.68-6.4-7.68-11.52v-448c0-148.48 74.24-268.8 165.12-268.8h467.2c90.88 0 165.12 120.32 165.12 268.8s-74.24 268.8-165.12 268.8c-7.68 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-12.8c76.8 0 138.24-108.8 138.24-241.92 0-133.12-62.72-241.92-138.24-241.92-76.8 0-138.24 108.8-138.24 241.92v368.64c0 3.84-1.28 7.68-5.12 10.24l-119.04 93.44c-2.56 1.28-5.12 1.28-7.68 1.28z m-84.48-93.44c2.56 0 6.4 1.28 8.96 2.56l75.52 60.16 104.96-83.2V408.32c0-106.24 38.4-198.4 93.44-241.92H279.04c-76.8 0-138.24 108.8-138.24 241.92v422.4l66.56-44.8c5.12-2.56 10.24-2.56 15.36 0l79.36 57.6 81.92-51.2c2.56-1.28 5.12-2.56 6.4-2.56z" p-id="1153"></path><path d="M171.52 727.04c-3.84 0-6.4-2.56-6.4-6.4v-20.48c0-3.84 2.56-6.4 6.4-6.4s6.4 2.56 6.4 6.4v20.48c1.28 3.84-2.56 6.4-6.4 6.4z m0-64c-3.84 0-6.4-2.56-6.4-6.4V408.32c0-129.28 58.88-216.32 113.92-216.32h249.6c3.84 0 6.4 2.56 6.4 6.4s-2.56 6.4-6.4 6.4H279.04c-47.36 0-99.84 87.04-99.84 202.24v248.32c0 5.12-3.84 7.68-7.68 7.68zM746.24 497.92c-24.32 0-42.24-30.72-42.24-72.96 0-40.96 17.92-72.96 42.24-72.96s42.24 30.72 42.24 72.96c0 42.24-17.92 72.96-42.24 72.96z m0-119.04c-3.84 0-15.36 15.36-15.36 46.08s11.52 46.08 15.36 46.08 15.36-15.36 15.36-46.08-11.52-46.08-15.36-46.08z" p-id="1154"></path><path d="M744.96 677.12c-90.88 0-165.12-120.32-165.12-268.8s74.24-268.8 165.12-268.8 165.12 120.32 165.12 268.8c1.28 148.48-72.96 268.8-165.12 268.8z m0-509.44c-76.8 0-138.24 108.8-138.24 241.92 0 133.12 62.72 241.92 138.24 241.92S883.2 542.72 883.2 409.6c1.28-134.4-61.44-241.92-138.24-241.92z" p-id="1155"></path></svg></span>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6" :v-for="category in categories">
            <div class="grid-content">
              <span class="category-title">{{category.classificationName}}</span><br/><br/>
              <span class="category-price-range">0.3-0.85元/kg</span>
              <div>
                <span class="category-icon"><svg t="1580963907781" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1152" width="200" height="200"><path d="M474.88 883.2c-2.56 0-6.4-1.28-8.96-2.56l-75.52-60.16-81.92 51.2c-5.12 2.56-10.24 2.56-15.36 0l-79.36-57.6-80.64 53.76c-3.84 2.56-8.96 2.56-12.8 0-3.84-2.56-7.68-6.4-7.68-11.52v-448c0-148.48 74.24-268.8 165.12-268.8h467.2c90.88 0 165.12 120.32 165.12 268.8s-74.24 268.8-165.12 268.8c-7.68 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-12.8c76.8 0 138.24-108.8 138.24-241.92 0-133.12-62.72-241.92-138.24-241.92-76.8 0-138.24 108.8-138.24 241.92v368.64c0 3.84-1.28 7.68-5.12 10.24l-119.04 93.44c-2.56 1.28-5.12 1.28-7.68 1.28z m-84.48-93.44c2.56 0 6.4 1.28 8.96 2.56l75.52 60.16 104.96-83.2V408.32c0-106.24 38.4-198.4 93.44-241.92H279.04c-76.8 0-138.24 108.8-138.24 241.92v422.4l66.56-44.8c5.12-2.56 10.24-2.56 15.36 0l79.36 57.6 81.92-51.2c2.56-1.28 5.12-2.56 6.4-2.56z" p-id="1153"></path><path d="M171.52 727.04c-3.84 0-6.4-2.56-6.4-6.4v-20.48c0-3.84 2.56-6.4 6.4-6.4s6.4 2.56 6.4 6.4v20.48c1.28 3.84-2.56 6.4-6.4 6.4z m0-64c-3.84 0-6.4-2.56-6.4-6.4V408.32c0-129.28 58.88-216.32 113.92-216.32h249.6c3.84 0 6.4 2.56 6.4 6.4s-2.56 6.4-6.4 6.4H279.04c-47.36 0-99.84 87.04-99.84 202.24v248.32c0 5.12-3.84 7.68-7.68 7.68zM746.24 497.92c-24.32 0-42.24-30.72-42.24-72.96 0-40.96 17.92-72.96 42.24-72.96s42.24 30.72 42.24 72.96c0 42.24-17.92 72.96-42.24 72.96z m0-119.04c-3.84 0-15.36 15.36-15.36 46.08s11.52 46.08 15.36 46.08 15.36-15.36 15.36-46.08-11.52-46.08-15.36-46.08z" p-id="1154"></path><path d="M744.96 677.12c-90.88 0-165.12-120.32-165.12-268.8s74.24-268.8 165.12-268.8 165.12 120.32 165.12 268.8c1.28 148.48-72.96 268.8-165.12 268.8z m0-509.44c-76.8 0-138.24 108.8-138.24 241.92 0 133.12 62.72 241.92 138.24 241.92S883.2 542.72 883.2 409.6c1.28-134.4-61.44-241.92-138.24-241.92z" p-id="1155"></path></svg></span>
              </div>
            </div>
          </el-col> -->
        </el-row>
      </div>

    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  export default {

    name: 'recycle-news',
    data() {
      return {
        list:[]
      };
    },
    methods: {
      getDataList(){
        const api = 'classification/classificationList';
        axios.get(api).then( (res)=> {
          this.list=res.data.records;
        }).catch( (err)=> {

        })
      },
    },
    mounted() {  //生命周期函数
      this.getDataList();
    },

  };
</script>

<style scoped>
  .category-icon {
    float: right;
  }
  .category-recycle {
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }
  .category-price-range{
    font-size: 1.1rem;
  }
  .category-title {
    font-size: 1.7rem;
    font-weight: bold
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #808080;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    padding: 2px;
    border: solid 1px #91e54f;
    border-radius: 4px;
    min-height: 150px;
    min-width: 150px;
    opacity:0.8;
    box-shadow: 0px 0px 10px 4px #91e54f;
    cursor:pointer;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
