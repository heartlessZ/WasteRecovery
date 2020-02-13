<template>
  <div id="order-list">
    <!-- 在模板中$route.params.status!='0'不用加this -->
    <div v-if="orderList.length===0" class="data-empty">
      <span v-if="formState=='0'" style="font-size: 16px;color: #93999f;">暂无任何未被接的订单</span>
      <span v-if="formState=='1'" style="font-size: 16px;color: #93999f;">暂无任已被接收的订单</span>
      <span v-if="formState=='2'" style="font-size: 16px;color: #93999f;">暂无任何已完成的订单</span>
      <span v-if="formState=='3'" style="font-size: 16px;color: #93999f;">暂无任何已取消的订单</span>
    </div>
    <el-card class="order-item" v-for="(order,index) in orderList" :key="order.id">
      <p class="myorder-number" v-if="formState!='0'"><i class="el-icon-tickets" style="color:#61D2B4;margin-right: 10px;font-size: 14px;"></i><span>订单编号：{{order.orderId}}</span><span
          class="date">下单日期：{{order.creatTime}}</span></p>
      <p class="myorder-number" v-else><span>分类：废纸</span><span class="date">发布日期：{{order.creatTime}}</span></p>
      <el-row :gutter="10" class="contain">
        <el-col :span="6" v-if="formState!='0'">
          <!-- 状态不同，数据结构不同，数据接口封装有问题 -->
          <el-image style="width: 100%; height: 120px;background: #F5F7FA;" :src="order.wasteInfo.photos"
            :preview-src-list="[order.wasteInfo.photos]">
            <div slot="error" style="height: 100%;text-align: center;display: flex;justify-content: center;align-items: center;">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :span="6" v-else>
          <!-- 状态不同，数据结构不同，数据接口封装有问题 -->
          <el-image style="width: 100%; height: 120px;background: #F5F7FA;" :src="order.photos" fit="cover"
            :preview-src-list="[order.photos]">
            <div slot="error" style="height: 100%;text-align: center;display: flex;justify-content: center;align-items: center;">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <!-- 状态不同，数据结构不同，数据接口封装有问题 -->
        <el-col :span="6" v-if="formState!='0'">
          <div class="grid-content">
            <p><span>重量：</span><span class="span-color">{{order.wasteInfo.weight}}kg</span></p>
            <p><span>期望价格：</span><span class="span-color">￥{{order.wasteInfo.expectedPrice}}</span></p>
            <p><span>实付金额：</span><span class="span-color">￥0.00</span></p>
            <p>卖家地址：{{order.wasteInfo.address}}</p>
          </div>
        </el-col>
        <el-col :span="6" v-else>
          <div class="grid-content">
            <p><span>重量：</span><span class="span-color">{{order.weight}}kg</span></p>
            <p><span>期望价格：</span><span class="span-color">￥{{order.expectedPrice}}</span></p>
            <p><span>实付金额：</span><span class="span-color">￥0.00</span></p>
            <p>卖家地址：{{order.address}}</p>
          </div>
        </el-col>
        <el-col :span="8" v-if="formState!='0'">
          <div class="grid-content">
            <p style="line-height: 18px;"><b>描述：</b>{{order.wasteInfo.describe}}</p>
          </div>
        </el-col>
        <el-col :span="8" v-else>
          <div class="grid-content">
            <p style="line-height: 18px;"><b>描述：</b>{{order.describe}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content col-right">
            <p style="font-size: 14px;" v-text="statusTxt"></p>
            <el-link :underline="false" class="cancel-order" v-if="formState=='0'" style="color: #93999f;" @click="onDeleteWasteInfo(order.id,index)">删除</el-link>
            <el-link :underline="false" class="cancel-order" v-if="formState=='1'" style="color: #93999f;" @click="onCancelOrder(order.id,index)">取消订单</el-link>
            <el-link :underline="false" class="cancel-order" v-if="formState=='2'|formState=='3'" style="color: #93999f;"
              @click="onDeleteOrder(order.id,index)">删除订单</el-link>
          </div>
        </el-col>
      </el-row>
      <p class="order-info" style="display: inline-block;" v-if="formState!='0'"><span>买家信息</span><span style="margin: 0px 10px;">|</span><span>昵称：{{order.user.nikeName}}</span><span
          class="phone">电话：{{order.user.phone}}</span></p>
    </el-card>
    <el-pagination v-if="orderList.length!=0" background layout="prev, pager, next" :total="total" :page-size="pageSize" style="width: 95%;text-align: center;"
      @current-change="pageCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import {
  getOrderByPage,
  getWasteInfoByPage,
  deleteOrder,
  cancelOrder,
  deleteWasteInfo
} from '@/api/order.js'
export default {
  data () {
    return {
      statusTxt: '',
      pageNum: 1,
      total: 4,
      pageSize: 2,
      orderList: [],
      formState: '0'
    }
  },
  methods: {
    // state订单状态(1已接单，2已完成，3取消)
    // 0表示未接单的(即废品信息)
    requestData (state) {
      if (state === '0') {
        getWasteInfoByPage(this.pageNum, this.pageSize, '0').then((res) => {
          if (res.status) {
            this.total = res.total
            this.orderList = res.records
          } else {
            this.$message.error('获取数据失败！')
          }
          this.formState = state
        })
      } else {
        getOrderByPage(this.pageNum, this.pageSize, state).then((res) => {
          if (res.status) {
            this.total = res.total
            this.orderList = res.records
          } else {
            this.$message.error('获取数据失败！')
          }
          this.formState = state
        })
      }
    },
    resetStatusTxt () {
      switch (this.formState) {
        case '0':
          this.statusTxt = '未接单'
          break
        case '1':
          this.statusTxt = '已接单'
          break
        case '2':
          this.statusTxt = '已完成'
          break
        case '3':
          this.statusTxt = '已取消'
          break
      }
    },
    // 当前页改变调用函数
    pageCurrentChange (val) {
      this.pageNum = val
      /* console.log('pageCurrentChange:' + this.formState) */
      this.requestData(this.formState)
    },
    /**
       *  删除订单函数
       * @param {Object} id 订单的id
       */
    onDeleteOrder (id, index) {
      this.$confirm('永久删除后，将无法再查看该订单，请谨慎操作！', '确定要删除该订单吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrder(id).then((res) => {
          if (res.status) {
            this.orderList.splice(index, 1)
            if (this.orderList.length === 0) {
              this.pageNum--
            }
            this.requestData(this.formState)
          } else {
            this.$message.error('删除失败！')
          }
        })
      })
    },
    /**
       * 取消订单函数
       * @param {Object} id 订单的id
       */
    onCancelOrder (id, index) {
      this.$confirm('取消后将重新等待商家购买，请谨慎操作！！', '确定要取消该订单吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelOrder(id).then((res) => {
          if (res.status) {
            this.orderList.splice(index, 1)
            if (this.orderList.length === 0) {
              this.pageNum--
            }
            this.requestData(this.formState)
          } else {
            this.$message.error('取消失败！')
          }
        })
      })
    },
    /**
       * 删除废品信息的函数
       * @param {Object} id 废品信息的id
       */
    onDeleteWasteInfo (id, index) {
      this.$confirm('删除后将无法出售，请谨慎操作！', '确定要删除该废品吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteWasteInfo(id).then((res) => {
          if (res.status) {
            this.orderList.splice(index, 1)
            if (this.orderList.length === 0) {
              this.pageNum--
            }
            this.requestData(this.formState)
          } else {
            this.$message.error('删除失败！')
          }
        })
      })
    }
  },
  mounted () {
    this.requestData(this.$route.params.status)
    this.formState = this.$route.params.status
    this.resetStatusTxt()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    var state = this.$route.params.status
    this.pageNum = 1
    // 网络请求
    this.requestData(state)
    this.resetStatusTxt()
  }
}
</script>

<style scoped>
  p {
    margin: 0;
    font-size: 12px;
    line-height: 24px;
  }

  #order-list {
    width: 100%;
    min-height: 500px;
  }

  .img_icon_error {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .order-item {
    width: 95%;
    margin-bottom: 25px;
  }

  .myorder-number {
    padding-bottom: 5px;
    font-size: 12px;
    border-bottom: 1px solid #b7bbbf;
  }

  .order-info {
    margin: 0;
    padding-top: 5px;
    font-size: 12px;
  }

  .img-block {
    width: 100%;
    height: 100px;
    background: #F5F7FA;
  }

  .el-col {
    overflow: hidden;
  }

  .order-item .date,
  .order-item .phone {
    margin-left: 20px;
  }

  .contain {
    width: 100%;
    height: 150px;
    padding-top: 10px;
  }

  .grid-content {
    min-height: 120px;
  }

  .span-color {
    color: #f01414;
  }

  .col-right {
    border-left: 1px solid #b7bbbf;
    text-align: center;
    padding: 40px 0px;
  }

  .cancel-order {
    display: block;
    font-size: 12px;
    line-height: 12px;
    margin-top: 10px;
  }
  .data-empty{
    width: 100%;
    height: 350px;
    line-height: 350px;
    background:#F8FAFC;
    border-radius:10px;
    text-align: center;
  }
</style>
