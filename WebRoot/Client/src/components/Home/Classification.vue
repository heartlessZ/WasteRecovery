<template>
  <section id="classification" class="section" style="background-color: #F2F2F2">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">生活垃圾基本分类</h2>
        <hr class="lines wow zoomIn" data-wow-delay="0.3s">
      </div>
      <div class="row">
        <div class="col-md-12 col-sm-6">
          <div class="item-boxes wow fadeInDown" data-wow-delay="0.2s">
            <el-autocomplete
              style="width: 70%;"
              popper-class="my-autocomplete"
              v-model="state"
              :fetch-suggestions="querySearch"
              placeholder="请输入正确名称（包含材质）"
              @select="handleSelect">
              <i
                slot="prefix"
                class="el-input__icon el-icon-search"
                @click="handleIconClick">
              </i>
              <template slot-scope="{ item }">
                <span class="addr el-input__icon el-icon-search">{{ item }}</span>
              </template>
            </el-autocomplete>
          </div>
          <el-card class="box-card" v-if="!isShow">
            <div  class="text item" style="text-align: center">
              <h2 style="font-size: 1.2rem">{{searchName}}   属于</h2>
              <h1 style="font-size: 1.5rem">{{garbage_list.full_name}}</h1>
              <div><img :src="garbage_list.icon_url"></div>
            </div>
          </el-card>
          <br>
          <el-card class="box-card" v-if="!isShow">
            <div  class="text item" style="text-align: center">
              <h2 style="font-size: 1.2rem">{{garbage_list.full_name}}投放指南</h2>
              <p class="grabage" style="text-align: left">{{garbage_list.guide}}</p>
            </div>
          </el-card>
          <br>
        </div>
        </div>
      <el-card class="box-card">
      <div class="row">
        <div class="col-md-3 col-sm-6" @click="handleClick(o.type,o.id)"
             v-for="(o,index) in classInfor"
             :key="o.type"
        >
          <div class="item-boxes wow fadeInDown" data-wow-delay="0.2s">
            <img class="icon"
                 :src="o.url"
                 alt="">
            <h4>{{o.type}}</h4>
          </div>
        </div>
        </div>
      </el-card>
      <br>
      <el-card class="box-card" v-if="isGarbage">
        <div style="text-align: center">
          <img :src="common.icon_url"/>
          <h2 style="font-size: 1.9rem">{{common.full_name}}</h2>
          <p class="grabage" style="text-align: left">{{common.description}}</p>
        </div>
        <br>
      <div class="row" align="center">
        <div class="imgTipBox"  v-for="(o,index) in common.common_garbage_list">
          <img  :src="o.icon_url" class="image">
          <div style="padding: 14px;">
            <div style="width: 70px">{{o.name}}</div>
          </div>
        </div>
      </div>
      </el-card>
      <br>
      <el-card class="box-card" v-if="isGarbage">
      <div  class="text item" style="text-align: center">
        <h2 style="font-size: 1.2rem">{{common.full_name}}投放指南</h2>
        <p class="grabage" style="text-align: left">{{common.guide}}</p>
      </div>
      </el-card>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'classification',
  data () {
    return {
      restaurants: [],
      state: '',
      isShow: true,
      garbage_list: {},
      searchName: '',
      classInfor: [],
      isGarbage: false,
      common: []
    }
  },
  methods: {
    getClassInfo () {
      const api = '/garbage/class'
      axios.get(api).then((res) => {
        if (res.status) {
          this.classInfor = res.data.data
        } else {
          this.$message.error(res.msg)
        }

        // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
      })
    },
    querySearch (queryString, cb) {
      console.log(queryString)
      const api = '/garbage/suggest?word=' + queryString
      axios.get(api).then((res) => {
        if (res.data.data.setSuggest_list) {
          let restaurants = res.data.data.suggest_list
          cb(restaurants)
        } else {
          this.$message.error(res.msg)
        }
        // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
      })
    },
    handleSelect (item) {
      this.searchName = item
      const api = '/garbage/search?searchWord=' + item
      axios.get(api).then((res) => {
        console.log(res.data.data)
        this.garbage_list = res.data.data.garbage_list[0]
        this.isShow = false
        // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
      })
      this.state = item
    },
    handleIconClick (ev) {
      //点击
    },
    handleClick (type, categoryId) {
      const api = '/garbage/detail?type=' + type + '&categoryId=' + categoryId
      axios.get(api).then((res) => {
        if (res.data.code === 0) {
          this.common = res.data.data.garbage_detail
          this.isGarbage = true
        }
        // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
      })
    }
  },
  mounted () {
    this.getClassInfo()
  }
}

</script>

<style scoped>
.grabage{
  margin: 1.0rem 1.2rem 0;
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8rem;
}

</style>
