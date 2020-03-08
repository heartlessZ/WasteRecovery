<template>
  <div id="rechargeList">
    <el-card class="contain">
      <el-form :inline="true" :model="formSearch" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="formSearch.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formSearch.phone" placeholder="电话" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formSearch.status" placeholder="状态">
            <el-option label="未支付" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值时间" class="date-select">
          <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="totalAmount" label="充值金额" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.totalAmount}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="140" align="center">
        </el-table-column>
        <el-table-column prop="subject" label="订单名称" width="100">
        </el-table-column>
        <el-table-column prop="body" label="订单描述" width="100">
        </el-table-column>
        <el-table-column prop="createTime" label="充值时间" width="160">
        </el-table-column>
        <el-table-column prop="tradeNo" label="交易编号" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="outTradeNo" label="支付单号" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="status" label="交易状态" width="90" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0" type="warning" size="mini">未支付</el-button>
            <el-button v-if="scope.row.status==1" type="primary" size="mini">已支付</el-button>
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
  import {selRechargeRecord} from '@/api/wallet.js'
  export default {
    name: 'rechargeList',
    data() {
      return {
        tableData: [],
        // 分类列表
        formSearch: {
          pageNum: 1,
          pageSize: 10,
          username: '',
          phone: '',
          status: '',
          outTradeNo: '',
          startTime:'',
          endTime:''
        },
        time:[],
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
        // 处理传时间段空值问题
        if(this.time!=null){
          this.formSearch.startTime = this.time[0]
          this.formSearch.endTime = this.time[1]
        }else{
          this.formSearch.startTime = null
          this.formSearch.endTime = null
        }
        // 查询充值记录列表网络请求
        selRechargeRecord(this.formSearch).then((res) => {
          if(res.status){
            this.tableData = res.records
            this.total = res.total
          }else{
            this.$message.error("获取充值记录失败！")
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      /**
       * 点击查找调用函数
       */
      onSearch() {
        this.pageNum = 1
        this.requestData()
      }
    },
    /**
     * 页面挂载完成自动调用函数
     */
    mounted() {
      this.requestData()
    }
  }
</script>

<style scoped>
  #rechargeList {
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
