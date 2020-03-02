<template>
  <div id="SystemLog">
    <el-card class="contain">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      </el-form>
      <div class="currentNum">当前共{{total}}人在线</div>
      <el-table :data="tableData" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px'}">
        <el-table-column prop="username" label="用户名" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
            <el-button type="danger" size="mini" plain disabled v-if="scope.row.current">current</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="startTimestamp" label="登录时间" width="170" >
        </el-table-column>
        <el-table-column prop="lastAccessTime" label="最后访问时间" width="170" >
        </el-table-column>
        <el-table-column prop="host" label="IP地址" width="160" >
        </el-table-column>
        <el-table-column prop="location" label="登录地点" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="createTime" label="状态" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="mini" plain disabled v-if="scope.row.status==1">在线</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <i class="el-icon-switch-button" @click="onforcedOffline(scope.row.id)" style="font-size: 20px;color: red;"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {
    fingOnlineUser,
    forcedOffline
  } from '@/api/log.js'

  export default {
    name: 'SystemLogList',
    data() {
      return {
        tableData: [],
        username: null,
        total:0
      }
    },
    methods: {
      /**
       *网络请求
       */
      requestData() {
        fingOnlineUser(this.username).then((res) => {
          if (res.status) {
            this.tableData = res.rows
            this.total = res.total
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
        this.requestData()
      },
      //通知下线按钮事件
      onforcedOffline(id) {
       forcedOffline(id).then((res) => {
         if (res.status) {
           this.$message({
             showClose: true,
             message: '操作成功',
             type: 'success'
           })
           this.requestData()
         } else {
           this.$message.error(res.msg)
         }
       }).catch((err) => {
         this.$message.error(err.message)
       })
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

  .currentNum{
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #f0f9eb;
    border: 1px solid #e1f3d8;
    padding: 0 10px;
    margin-bottom: 10px;
    color: #909399;
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
