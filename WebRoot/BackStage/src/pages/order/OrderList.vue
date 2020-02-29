<template>
  <div id="orderList">
    <el-card class="contain">
      <el-form :inline="true"  :model="formSearch" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="formSearch.address" placeholder="地址" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formSearch.orderId" placeholder="订单号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formSearch.classificationId" placeholder="废品类别">
            <el-option v-for="item in classificationList" :key="item.id" :label="item.tradeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formSearch.state" placeholder="订单状态">
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
            <el-option label="已取消" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" class="date-select">
          <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSearch" size="mini">查询</el-button>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="wasteInfo.photos" label="废品图片" width="110">
          <template slot-scope="scope">
            <el-image style="width: 90px; height: 50px;padding-top: 5px;" :src="scope.row.wasteInfo.photos" fit="cover"
              :preview-src-list="[scope.row.wasteInfo.photos]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="tradeName" label="废品类别" align="center">
        </el-table-column>
        <el-table-column prop="wasteInfo.weight" label="废品重量" width="140" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.wasteInfo.weight}}kg</span>
          </template>
        </el-table-column>
        <el-table-column prop="wasteInfo.expectedPrice" label="卖家期望价格" width="140" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.wasteInfo.expectedPrice}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="creatTime" label="下单时间" align="center">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state==1"  style="color: #E6A23C;">进行中</span>
            <span v-if="scope.row.state==2"  style="color: #69D4B7;">已完成</span>
            <span v-if="scope.row.state==3"  style="color:#909399 ;">已取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="290" v-if="roleId==2">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click='showDetail(scope.row)'>详情</el-button>
            <el-button v-if="scope.row.state==1" @click="cancelOrder(scope.row.id)" type="warning" size="mini">取消</el-button>
            <el-button v-else type="info" size="mini" disabled>取消</el-button>
            <el-button v-if="scope.row.state==1" @click="finishOrder(scope.row.id)" type="primary" size="mini">完成</el-button>
            <el-button v-else type="info" size="mini" disabled>完成</el-button>
            <el-button v-if="scope.row.state==1" type="info" size="mini" disabled="">删除</el-button>
            <el-button v-else @click="delOrder(scope.row.id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" v-else>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click='showDetail(scope.row)'>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formSearch.pageNum"
        :page-sizes="[10,20,30,40]" :page-size="formSearch.pageSzie" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 查看公告内容对话框 -->
      <el-dialog title="订单详情" :visible.sync="lookdialogVisible" width="40%">
        <div v-if="orderItem!=null">
          <p>订单号：{{orderItem.orderId}}</p>
          <p>卖家名：{{orderItem.user.username}}</p>
          <p>卖家地址：{{orderItem.wasteInfo.address}}</p>
          <p>卖家电话：{{orderItem.user.phone}}</p>
          <p>商家名：{{orderItem.businessname}}</p>
          <p>废品描述：{{orderItem.wasteInfo.describe}}</p>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    selOrderListByPage,
    delOrderById,
    cancelOrderById,
    selAllClassification,
    finishOrder
  } from '@/api/order.js'
  export default {
    name: 'orderList',
    data() {
      return {
        tableData: [],
        // 分类列表
        classificationList: [],
        formSearch: {
          pageNum: 1,
          pageSize: 10,
          username: '',
          address: '',
          orderId: '',
          state: '',
          startDate: '',
          endDate: '',
          classificationId: null
        },
        roleId: null,
        lookdialogVisible: false,
        time: '',
        //数据总条数
        total: 2,
        orderItem: null
      }
    },
    methods: {
      /**
       * pageSize改变调用函数
       * @param {Object} val
       */
      handleSizeChange(val) {
        this.formSearch.pageSize = val
        this.formSearch.pageNum = 1
        this.requestData()
      },
      /**
       * 当前页改变调用还是
       * @param {Object} val
       */
      handleCurrentChange(val) {
        this.formSearch.pageNum = val
        this.requestData()
      },
      //查看订单详情
      showDetail(orderItem) {
        this.orderItem = orderItem
        console.log(this.orderItem)
        this.lookdialogVisible = true
      },
      /**
       *网络请求
       */
      requestData() {
        //去除空串问题
        if (this.formSearch.classificationId === '') {
          this.formSearch.classificationId = null
        }
        // 处理传时间段空值问题
        if (this.time != null) {
          this.formSearch.startDate = this.time[0]
          this.formSearch.endDate = this.time[1]
        } else {
          this.formSearch.startDate = null
          this.formSearch.endDate = null
        }
        selOrderListByPage(this.formSearch, this.roleId).then((res) => {
          if (res.status) {
            this.tableData = res.records
            this.total = res.total
            console.log(res)
          } else {
            this.$message.error("获取页面数据失败！")
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      /**
       * 点击查找调用函数
       */
      onSearch() {
        this.requestData()
      },
      /**
       * 取消订单
       * @param {Object} id 订单id
       */
      cancelOrder(id) {
        this.$confirm('取消订单后会降低您的信誉, 请谨慎操作！', '确定要取消该订单吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //取消订单网络请求
          cancelOrderById(id).then((res) => {
            if (res.status) {
              this.$message({
                showClose: true,
                message: '取消成功！',
                type: 'success'
              })
              this.requestData()
            } else {
              this.$message.error('操作失败')
            }
          }).catch((err) => {
            this.$message.error(err.message)
          })
        })
      },
      /**
       * 完成订单
       * @param {Object} id 订单id
       */
      finishOrder(id) {
        //取消订单网络请求
        finishOrder(id).then((res) => {
          if (res.status) {
            this.$message({
              showClose: true,
              message: '操作成功！',
              type: 'success'
            })
            this.requestData()
          } else {
            this.$message.error('操作失败')
          }
        })
      },
      /**删除订单
       * @param {Object} id 订单id
       */
      delOrder(id) {
        this.$confirm('此操作将永久删除该订单, 请谨慎操作！', '确要删除该订单吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除订单网络请求
          delOrderById(id).then((res) => {
            if (res.status) {
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              })
              this.requestData()
            } else {
              this.$message.error('操作失败')
            }
          }).catch((err) => {
            this.$message.error(err.message)
          })
        })
      }
    },
    /**
     * 页面挂载完成自动调用函数
     */
    mounted() {
      this.roleId = this.$store.getters.userInfo.roleId;
      this.requestData()
      // 查询废品分类类别，下拉列表
      selAllClassification().then((res) => {
        if (res.status) {
          this.classificationList = res.records
        } else {
          this.$message.error("查询废品分类列表失败！")
        }
      })
    }
  }
</script>

<style scoped>
  p {
    font-size: 16px;
    line-height: 26px;
    width: 80%;
    margin: 0 auto;
  }

  #orderList {
    width: 100%;
  }

  .contain {
    width: 100%;
    height: 100%;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
  }

  .clearfix:after {
    clear: both
  }

  .el-card__body {
    padding: 8px;
  }

  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }

  .contain .el-form-item {
    width: 180px;
    margin-bottom: 10px;
  }

  .contain .date-select {
    width: 425px;
  }

  .search-form {
    padding: 10px;
  }
</style>
