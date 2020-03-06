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
          <el-col
            :span="3"
            v-for="(o,index) in $store.getters.rootCategories"
            :key="o.id"
            :offset="index>1?2:2"
          >
            <div class="grid-content" @click="showChildrenCategory(o.id)">
              <span class="category-title">{{o.classificationName}}</span>
              <br />
              <br />
              <span class="category-price-range">{{o.minprice}}-{{o.maxprice}}元/kg</span>
              <div>
                <span class="category-icon">
                  <img :src="o.imgUrl" alt width="45" height="45" />
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="row category-recycle">
        <el-row :gutter="24">
          <el-col
            :span="2"
            v-for="(o,index) in childrenCategories"
            :key="o.id"
            :offset="index>1?2:2"
          >
            <div class="children-category-box">
              <span>{{o.tradeName}}</span>
              <br />
              <br />
              <span>{{o.price}}元/kg</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import { queryChildrenCategory } from "@/api/user";
export default {
  name: "recycle-news",
  data() {
    return {
      childrenCategories: []
    };
  },
  methods: {
    getDataList() {
      this.$store.dispatch("QueryRootCategory").then(res => {
        if(res.status)
          this.showChildrenCategory(res.records[0].id)
      });
    },
    showChildrenCategory(id) {
      queryChildrenCategory(id).then(res=>{
        this.childrenCategories = res.records;
      })
    }
  },
  mounted() {
    //生命周期函数
    this.getDataList();
  }
};
</script>

<style scoped>
.children-category-box{
  padding: 2px;
  border: solid 1px #91e54f;
  border-radius: 4px;
  min-height: 80px;
  min-width: 80px;
  opacity: 0.8;
  box-shadow: 0px 0px 10px 4px #91e54f;
  cursor: pointer;
  font-size: 0.8rem;
}

.category-icon {
  float: right;
}
.category-recycle {
  justify-content: center;
  align-items: center;
  flex-flow: column;
  display: flex;
  min-height: 100px;
}
.category-price-range {
  font-size: 1.1rem;
}
.category-title {
  font-size: 1.7rem;
  font-weight: bold;
}
.el-row {
  margin-bottom: 20px;
  width: 100%;
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
  opacity: 0.8;
  box-shadow: 0px 0px 10px 4px #91e54f;
  cursor: pointer;
  
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
