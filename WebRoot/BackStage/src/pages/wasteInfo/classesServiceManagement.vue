<template>
  <div id="orderList">
    <el-card class="contain">
      <el-form :inline="true" :model="searchData" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="searchData.phone" placeholder="手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="visitclassificationId">
          <el-select v-model="searchData.visitclassificationId" placeholder="请选择废品类别" clearable>
            <el-option v-for="category in visitCategories" :key="category.id" :label="category.classificationName"
              :value="category.id">
              {{category.classificationName}}
              <div style="width:50px;float:right;">{{category.money}}</div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchData.state" placeholder="订单状态">
            <el-option label="未接单" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="loadData" size="mini">查询</el-button>
      </el-form>
      <el-table v-loading="listLoading" :data="tableData.rows" border style="width: 100%" :row-style="{'height':'40px'}"
        :cell-style="{'padding':'0'}" :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="orderId" label="订单编号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="businessNikeName" label="商家昵称" align="center" width="140"></el-table-column>
        <el-table-column prop="businessPhone" label="商家电话" align="center" width="160"></el-table-column>
        <el-table-column prop="nikeName" label="买家昵称" align="center" width="140"></el-table-column>
        <el-table-column prop="phone" label="买家电话" align="center" width="160"></el-table-column>
        <el-table-column prop="status" label="订单状态" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" style="color: #FF4D51;">未接单</span>
            <span v-else-if="scope.row.status==1" style="color: #69D4B7;">进行中</span>
            <span v-else-if="scope.row.status==3" style="color: #909399;">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click='showDetail(scope.row)'>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看订单详情对话框 -->
      <el-dialog title="订单详情" :visible.sync="lookdialogVisible" width="40%">
        <div v-if="orderItem!=null">
          <p>订单号：{{orderItem.orderId}}</p>
          <p>商家昵称：{{orderItem.businessNikeName}}</p>
          <p>商家电话：{{orderItem.businessPhone}}</p>
          <p>买家昵称：{{orderItem.nikeName}}</p>
          <p>买家电话：{{orderItem.phone}}</p>
          <p>详细地址：{{orderItem.address}}</p>
          <p>开通时间：{{orderItem.startTime}}</p>
          <p>结束时间：{{orderItem.endTime}}</p>
          <p>订单状态：
          <span v-if="orderItem.status==0" style="color: #FF4D51;">位接单</span>
          <span v-else-if="orderItem.status==1" style="color: #69D4B7;">进行中</span>
          <span v-else-if="orderItem.status==3" style="color: #909399;">已过期</span>
          </p>
        </div>
      </el-dialog>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo"
        :page-sizes="[10,20,30,40]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.pagination.total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import panel from "../../components/panel.vue";
  import * as api from "../../api";
  import testData from "../../../static/data/data.json";
  import * as sysApi from "../../services/sys";
  import request from "../../utils/request";
  import {
    queryRootCategory,
    queryChildrenCategory
  } from "../../api/user";

  export default {
    components: {
      "imp-panel": panel
    },
    data() {
      return {
        listLoading: false,
        visitCategories: [],
        searchData: {
          phone: "",
          visitclassificationId: undefined,
          field: "",
          state:null
        },
        tableData: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows: []
        },
        lookdialogVisible: false,
        orderItem:null
      };
    },
    methods: {
      search(target) {
        this.loadData();
      },
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.tableData.pagination.pageNo = val;
        this.loadData();
      },
      //查看订单详情
      showDetail(orderItem) {
        this.orderItem = orderItem
        this.lookdialogVisible = true
      },
      loadData() {
        this.listLoading = true;
        let queryString = {
          pageSize: this.tableData.pagination.pageSize,
          pageNum: this.tableData.pagination.pageNo,
          phone: this.searchData.phone,
          visitclassificationId: this.searchData.visitclassificationId,
          field: this.searchData.field,
          state:this.searchData.state
        };
        request.get(api.CLASSES_SERVICE_MANAGE, {
          params: queryString
        }).then(res => {
          if (res.status) {
            this.tableData.rows = res.records;
            this.tableData.pagination.total = res.total;
          }
          this.listLoading = false;
        });
      }
    },
    created() {
      this.loadData();
      request.get("visit/Classification").then(res => {
        if (res.status) this.visitCategories = res.data;
      });
    }
  };
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
    clear: both;
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
