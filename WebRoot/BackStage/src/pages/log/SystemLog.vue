<template>
  <div id="SystemLog">
    <el-card class="contain">
      <el-form :inline="true" :model="formSearch" class="search-form" size="mini">
        <el-form-item label="操作人">
          <el-input v-model="formSearch.username" placeholder="操作人" clearable></el-input>
        </el-form-item>
        <el-form-item label="操描述">
          <el-input v-model="formSearch.operation" placeholder="操描述" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作时间" class="date-select">
          <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" @click="onDelete">批量删除</el-button>
      </el-form>
      <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%" :row-style="{'height':'40px'}"
        :cell-style="{'padding':'0'}" :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px'}">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="username" label="操作人" width="120">
        </el-table-column>
        <el-table-column prop="operation" label="操作描述" width="120" >
        </el-table-column>
        <el-table-column prop="time" label="耗时" width="120" >
          <template slot-scope="scope">
            <el-button v-if="scope.row.time<100" type="success" size="mini" plain style="width: 70px;" disabled>{{scope.row.time}}ms</el-button>
            <el-button v-else-if="scope.row.time<500" type="warning" size="mini" plain style="width: 70px;" disabled>{{scope.row.time}}ms</el-button>
            <el-button v-else type="danger" size="mini" plain style="width: 70px;" disabled>{{scope.row.time}}ms</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="操作方法"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="method" label="方法参数"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="ip" label="IP地址" width="160">
        </el-table-column>
        <el-table-column prop="location" label="操作地点"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160">
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="danger" @click="onDelSystemLog(scope.row.id)" icon="el-icon-delete" size="mini"></el-button>
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
    fingSystemLogByPage,
    delSystemLog
  } from '@/api/log.js'
  export default {
    name: 'SystemLogList',
    data() {
      return {
        tableData: [],
        // 分类列表
        formSearch: {
          pageNum: 1,
          pageSize: 10,
          username: null,
          createTimeFrom: null,
          createTimeTo: null,
          operation:null
        },
        //用于时间选择器
        time: null,
        //数据总条数
        total: 2,
        //用于多行选择
        multipleSelection: []
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
       * 多行现在回调函数
       * @param {Object} val
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /**
       *网络请求
       */
      requestData() {
        // 处理传时间段空值问题
        if (this.time != null) {
          this.formSearch.createTimeFrom = this.time[0]
          this.formSearch.createTimeTo = this.time[1]
        } else {
          this.formSearch.createTimeFrom = null
          this.formSearch.createTimeTo = null
        }
        fingSystemLogByPage(this.formSearch).then((res) => {
          if (res.status) {
            this.tableData = res.records
            this.total = res.total
          } else {
            this.$message.error(res.msg)
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      /**
       * 批量删除登录日志网络请求
       * @param {Object} ids
       */
      deleteSystemLog(ids) {
        delSystemLog(ids).then((res) => {
          if (res.status) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.requestData()
          } else {
            this.$message.error(res.msg)
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      /**
       * 点击查找调用函数
       */
      onSearch() {
        this.formSearch.pageNum = 1
        this.requestData()
      },
      //删除公告按钮事件
      onDelSystemLog(ids) {
        this.deleteSystemLog(ids)
      },
      //批量删除按钮事件
      onDelete() {
        if (this.multipleSelection == null || this.multipleSelection.length == 0) {
          this.$message('请选择要删除的项！');
          return
        }
        var ids = ''
        var length = this.multipleSelection.length
        for (var i = 0; i < length; i++) {
          if (i != length - 1) {
            ids += this.multipleSelection[i].id + ','
          } else {
            ids += this.multipleSelection[i].id
          }
        }
        this.deleteSystemLog(ids)
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

<style>
  #SystemLog {
    width: 100%;
  }

  .contain {
    width: 100%;
    height: 100%;
  }

  .el-card__body {
    padding: 8px;
  }

  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }

  .contain .el-form-item {
    margin-bottom: 10px;
  }

  .contain .date-select {
    width: 425px;
  }

  .search-form {
    padding: 10px;
  }
</style>
