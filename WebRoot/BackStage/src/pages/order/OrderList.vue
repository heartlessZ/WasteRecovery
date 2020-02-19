<template>
  <div id="orderList">
    <el-card class="contain">
      <el-form :inline="true" :model="formSearch" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="formSearch.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
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
            <el-option label="已接单" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
            <el-option label="已取消" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" class="date-select">
          <el-date-picker v-model="formSearch.creatTime" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column fixed="left" type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="orderId" label="订单号" width="260">
        </el-table-column>
        <el-table-column prop="wasteInfo.photos" label="废品图片" width="110">
          <template slot-scope="scope">
            <el-image style="width: 90px; height: 50px;padding-top: 5px;" :src="scope.row.wasteInfo.photos" fit="scale-down"
              :preview-src-list="[scope.row.wasteInfo.photos]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="tradeName" label="废品类别" width="120" align="center">
        </el-table-column>
        <el-table-column prop="wasteInfo.weight" label="废品重量" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.wasteInfo.weight}}kg</span>
          </template>
        </el-table-column>
        <el-table-column prop="wasteInfo.expectedPrice" label="卖家期望价格" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.wasteInfo.expectedPrice}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username" label="卖家名" width="150">
        </el-table-column>
        <el-table-column prop="wasteInfo.address" label="卖家地址" width="300">
        </el-table-column>
        <el-table-column prop="user.phone" label="卖家电话" width="120">
        </el-table-column>
        <el-table-column prop="businessname" label="商家名" width="120">
        </el-table-column>
        <el-table-column prop="creatTime" label="下单时间" width="160">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="120" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state==1" type="warning" size="mini">进行中</el-button>
            <el-button v-if="scope.row.state==2" type="primary" size="mini">已完成</el-button>
            <el-button v-if="scope.row.state==3" type="info" size="mini">已取消</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="wasteInfo.describe" label="废品描述" width="300">
        </el-table-column>
        <el-table-column v-if="roleId==20" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state==1" @click="cancelOrder(scope.row.id)" type="warning" size="mini">取消</el-button>
            <el-button v-else type="info" size="mini" disabled>取消</el-button>
            <el-button v-if="scope.row.state==1" type="info" size="mini" disabled="">删除</el-button>
            <el-button v-else @click="delOrder(scope.row.id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formSearch.pageNum"
        :page-sizes="[10,20,30,40]" :page-size="formSearch.pageSzie" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {
    selOrderListByPage,
    delOrderById,
    cancelOrderById,
    selAllClassification
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
          creatTime: '',
          classificationId: null
        },
        roleId: null,
        //数据总条数
        total: 2
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
      /**
       *网络请求
       */
      requestData() {
        //去除空串问题
        if (this.formSearch.classificationId === '') {
          this.formSearch.classificationId = null
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
      console.log(this.roleId)
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
