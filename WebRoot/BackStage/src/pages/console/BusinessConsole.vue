<template>
  <div id="console">
    <div class="title">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline" size="mini" style="padding-top: 20px;">
        <el-form-item prop="number">
          <el-input type="number" v-model.number="formSearch.distance" placeholder="输入距离(默认5km,单位m)" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="order-item" v-for="(item) in tableData" :key="item.id">
        <el-image style="width: 100%; height: 150px;background: #F5F7FA;border-radius: 8px;" :src="item.photos"
          :preview-src-list="[item.photos]" fit="cover">
          <div slot="error" style="height: 100%;text-align: center;display: flex;justify-content: center;align-items: center;">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <p><b>重量：</b><span class="span-color">{{item.weight}}kg</span><b style="margin-left: 20px;">期望价格：</b><span class="span-color">￥{{item.expectedPrice}}元</span></p>
        <p><b>分类：</b><span>{{item.classificationName}}</span></p>
        <p class="myorder-number"><b>发布日期：</b><span>{{item.creatTime}}</span></p>
        <p style="padding-bottom: 5px;"><b class='describe' @click="lookDescribe(item.describe)">查看描述 >></b></p>
        <p style="border-top: 1px solid #b7bbbf;padding-top:5px "><b>卖家信息：</b></p>
        <p class="order-info" style="display: inline-block;">昵称：<span>{{item.nikeName}}</span><span class="phone">电话：{{item.phone}}</span></p>
        <p style="height: 36px;">卖家地址：{{item.address}}</p>
        <!-- <p style="margin-top: 5px;"><b>距离:</b>约{{item.distance}}m</p> -->
        <div style="overflow: hidden;">
           <span style="float: left;font-size: 12px;line-height: 28px;"><b>距离:</b>约{{item.distance}}m</span>
           <el-button size="mini" type="info" style="float: right;" @click="onBuy(item.id)">购买</el-button>
        </div>
      </div>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="formSearch.pageNum" :page-size="formSearch.pageSize" :total="total" layout="total, prev, pager, next" style="text-align: center;padding-bottom: 20px;">
    </el-pagination>
    <!-- 查看详细信息对话框 -->
    <el-dialog title="废品描述" :visible.sync="lookdialogVisible" width="40%">
      <p v-text="dialogContent" style="height: 120px;"></p>
    </el-dialog>
  </div>
</template>

<script>
  import {
   needPush,
   buy
  } from '@/api/console.js'
  export default {
    data() {
      return {
        lookdialogVisible: false,
        dialogContent: '',
        formSearch:{
          distance:null,
          pageNum:1,
          pageSize:10
        },
        tableData:[],
        total:0
      }
    },
    methods: {
      lookDescribe(describe) {
        this.dialogContent = describe
        this.lookdialogVisible = true
      },
      requestData(){
        needPush(this.formSearch).then((res)=>{
          if(res.status){
            this.tableData = res.records
            this.total = res.total
          }else{
            this.$message.error(res.msg)
          }
        }).catch((err)=>{
          this.$message.error(err.message)
        })
      },
      handleCurrentChange () {
        this.requestData()
      },
      onSearch(){
        if(this.formSearch.distance<1){
          this.$message.error("距离必须是大于等于1的数")
          this.formSearch.distance=null
          return
        }
        if(this.formSearch.distance==null){
          this.formSearch.distance=5000
        }
        this.requestData()
      },
      //购买废品按钮事件
      onBuy(id){
        buy(id).then((res)=>{
          console.log(res)
          if(res.status){
            this.$message({
              message:'购买成功!',
              type:'success'
            })
            this.requestData()
          }else{
            this.$message.error(res.msg)
          }
        }).catch((err)=>{
          this.$message.error("购买失败!")
        })
      }
    },
    mounted() {
      this.requestData()
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
    font-size: 12px;
  }

  #console {
    width: 100%;
    background: #FFFFFF;
  }
  .title{
   width: 100%;
   text-align: center;
  }
  .content {
    overflow: hidden;
    width: 100%;
    padding: 0px 20px 20px 20px;
    min-height: 400px;
  }

  .img_icon_error {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .order-item {
    width: 300px;
    float: left;
    padding: 18px;
    border-radius: 5px;
  }

  .order-item:hover {
    background: #F4F4F4;
  }

  .myorder-number {
    font-size: 12px;
  }

  .order-info {
    margin: 0;
    font-size: 12px;
  }

  .img-block {
    width: 100%;
    height: 100px;
    background: #F5F7FA;
  }

  .order-item .date,
  .order-item .phone {
    margin-left: 20px;
  }

  .span-color {
    color: #f01414;
  }

  .describe:hover {
    color: #61D2B4;
  }
</style>
