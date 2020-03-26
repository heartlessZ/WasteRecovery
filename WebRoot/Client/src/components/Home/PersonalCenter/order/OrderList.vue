<template>
  <div id="order-list" v-loading="loading" :element-loading-text="$t('OrderList.title')" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
    <div v-if="isEmpty" class="data-empty">
      <span v-if="state==0" style="font-size: 16px;color: #93999f;">{{$t('OrderList.ordertips0')}}</span>
      <span v-if="state==1" style="font-size: 16px;color: #93999f;">{{$t('OrderList.ordertips1')}}</span>
      <span v-if="state==2" style="font-size: 16px;color: #93999f;">{{$t('OrderList.ordertips2')}}</span>
      <span v-if="state==3" style="font-size: 16px;color: #93999f;">{{$t('OrderList.ordertips3')}}</span>
    </div>
    <el-card class="order-item" v-for="(order,index) in orderList" :key="order.id">
      <p class="myorder-number" v-if="state!=0"><i class="el-icon-tickets" style="color:#61D2B4;margin-right: 10px;font-size: 14px;"></i><span>{{$t('OrderList.orderid')}}：{{order.orderId}}</span><span
          class="date">{{$t('OrderList.placeTime')}}：{{order.creatTime}}</span></p>
      <p class="myorder-number" v-else><span>{{$t('OrderList.classification')}}：{{order.classification==null? '空': order.classification.classificationName}}</span><span class="date">{{$t('OrderList.createTime')}}：{{order.creatTime}}</span></p>
      <el-row :gutter="10" class="contain">
        <el-col :span="6" v-if="state!=0">
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
        <el-col :span="6" v-if="state!=0">
          <div class="grid-content">
            <p><span>{{$t('OrderList.weight')}}：</span><span class="span-color">{{order.wasteInfo.weight}}kg</span></p>
            <p><span>{{$t('OrderList.price')}}：</span><span class="span-color">￥{{order.wasteInfo.expectedPrice}}</span></p>
            <p><span>{{$t('OrderList.money')}}：</span><span class="span-color">￥0.00</span></p>
            <p>{{$t('OrderList.SellerAddress')}}：{{order.wasteInfo.address}}</p>
          </div>
        </el-col>
        <el-col :span="6" v-else>
          <div class="grid-content">
            <p><span>{{$t('OrderList.weight')}}：</span><span class="span-color">{{order.weight}}kg</span></p>
            <p><span>{{$t('OrderList.price')}}：</span><span class="span-color">￥{{order.expectedPrice}}</span></p>
            <p><span>{{$t('OrderList.money')}}：</span><span class="span-color">￥0.00</span></p>
            <p>{{$t('OrderList.SellerAddress')}}：{{order.address}}</p>
          </div>
        </el-col>
        <el-col :span="8" v-if="state!=0">
          <div class="grid-content">
            <p style="line-height: 18px;"><b>{{$t('OrderList.describe')}}：</b>{{order.wasteInfo.describe}}</p>
          </div>
        </el-col>
        <el-col :span="8" v-else>
          <div class="grid-content">
            <p style="line-height: 18px;"><b>{{$t('OrderList.describe')}}：</b>{{order.describe}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content col-right">
            <p style="font-size: 14px;">{{statusTxt}}</p>
            <el-link :underline="false" class="cancel-order" v-if="state==0" style="color: #93999f;" @click="onDeleteWasteInfo(order.id,index)">{{$t('OrderList.delete')}}</el-link>
            <el-link :underline="false" class="cancel-order" v-if="state==1" style="color: #93999f;" @click="onCancelOrder(order.id,index)">{{$t('OrderList.CancelOrder')}}</el-link>
            <el-link :underline="false" class="cancel-order" v-if="state==2|state==3" style="color: #93999f;" @click="onDeleteOrder(order.id,index)">{{$t('OrderList.deleteOrder')}}</el-link>
          </div>
        </el-col>
      </el-row>
      <p class="order-info" style="display: inline-block;" v-if="state!=0"><span>{{$t('OrderList.buyingleads')}}</span><span style="margin: 0px 10px;">|</span><span>{{$t('OrderList.nickName')}}：{{order.user.nikeName}}</span><span
          class="phone">{{$t('OrderList.phone')}}：{{order.user.phone}}</span></p>
    </el-card>
    <el-pagination v-if="orderList.length!=0" background layout="prev, pager, next" :total="total" :page-size="pageSize"
      style="width: 95%;text-align: center;" @current-change="pageCurrentChange">
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
      loading: false,
      isEmpty: false
    }
  },
  props: ['state', 'index'],
  watch: {
    state (n, o) {
      if (n !== o) {
        this.pageNum = 1
        // 网络请求
        this.requestData(this.state)
        this.resetStatusTxt(this.state)
      }
    }
  },
  methods: {
    // state订单状态(1已接单，2已完成，3取消)
    // 0表示未接单的(即废品信息)
    requestData (state) {
      this.loading = true
      this.isEmpty = false
      this.orderList = []
      if (state === 0) {
        getWasteInfoByPage(this.pageNum, this.pageSize, 0).then((res) => {
          if (res.status) {
            this.$parent.addClass(this.index)
            this.total = res.total
            this.orderList = res.records
            if (res.records.length === 0) {
              this.isEmpty = true
            }
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        })
      } else {
        getOrderByPage(this.pageNum, this.pageSize, state).then((res) => {
          if (res.status) {
            this.$parent.addClass(this.index)
            this.total = res.total
            this.orderList = res.records
            if (res.records.length === 0) {
              this.isEmpty = true
            }
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        })
      }
    },
    resetStatusTxt (state) {
      switch (state) {
        case 0:
          this.statusTxt = this.$t('OrderMng.title0')
          break
        case 1:
          this.statusTxt = this.$t('OrderMng.title1')
          break
        case 2:
          this.statusTxt = this.$t('OrderMng.title2')
          break
        case 3:
          this.statusTxt = this.$t('OrderMng.title3')
          break
      }
    },
    // 当前页改变调用函数
    pageCurrentChange (val) {
      this.pageNum = val
      this.requestData(this.state)
    },
    /**
       *  删除订单函数
       * @param {Object} id 订单的id
       */
    onDeleteOrder (id, index) {
      this.$confirm(this.$t('OrderList.deleteMsg'), this.$t('OrderList.deletemsgs'), {
        confirmButtonText: this.$t('OrderList.Confirm'),
        cancelButtonText: this.$t('OrderList.cancel'),
        type: 'warning'
      }).then(() => {
        deleteOrder(id).then((res) => {
          if (res.status) {
            this.orderList.splice(index, 1)
            if (this.orderList.length === 0) {
              this.pageNum--
            }
            this.requestData(this.state)
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
      this.$confirm(this.$t('OrderList.cancelMsg'), this.$t('OrderList.cancelMsgs'), {
        confirmButtonText: this.$t('OrderList.Confirm'),
        cancelButtonText: this.$t('OrderList.cancel'),
        type: 'warning'
      }).then(() => {
        cancelOrder(id).then((res) => {
          if (res.status) {
            this.orderList.splice(index, 1)
            if (this.orderList.length === 0) {
              this.pageNum--
            }
            this.requestData(this.state)
          } else {
            this.$message.error(this.$t('OrderList.cancelerror'))
          }
        })
      })
    },
    /**
       * 删除废品信息的函数
       * @param {Object} id 废品信息的id
       */
    onDeleteWasteInfo (id, index) {
      this.$confirm(this.$t('OrderList.deleteMsg2'), this.$t('OrderList.deletemsgs2'), {
        confirmButtonText: this.$t('OrderList.Confirm'),
        cancelButtonText: this.$t('OrderList.cancel'),
        type: 'warning'
      }).then(() => {
        deleteWasteInfo(id).then((res) => {
          if (res.status) {
            this.orderList.splice(index, 1)
            if (this.orderList.length === 0) {
              this.pageNum--
            }
            this.requestData(this.state)
          } else {
            this.$message.error(this.$t('OrderList.deleteerror'))
          }
        })
      })
    }
  },
  mounted () {
    this.requestData(this.state)
    this.resetStatusTxt(this.state)
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

  .data-empty {
    width: 100%;
    height: 350px;
    line-height: 350px;
    background: #F8FAFC;
    border-radius: 10px;
    text-align: center;
  }
</style>
