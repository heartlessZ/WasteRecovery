<template>
  <div id="notice">
    <el-card class="contain">
      <el-form :inline="true" :model="formSearch" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="formSearch.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formSearch.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="公告标题" width="120" align="center">
        </el-table-column>
        <el-table-column prop="username" label="公告类型" width="120" align="center">
        </el-table-column>
        <el-table-column prop="nickName" label="公告内容">
        </el-table-column>
        <el-table-column prop="username" label="发布人" width="120" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="发布时间" width="120" align="center">
        </el-table-column>
        <el-table-column prop="balance" label="状态" width="120" align="center">
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="primary" @click="cancelOrder(scope.row.id)" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" @click="delOrder(scope.row.id)" icon="el-icon-delete" size="mini"></el-button>
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
  export default {
    name: 'orderList',
    data() {
      return {
        tableData: [],
        // 分类列表
        formSearch: {
          pageNum: 1,
          pageSize: 5,
          username: '',
          phone: '',
          state: '',
          creatTime: []
        },
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
        //this.requestData()
      },
      /**
       * 当前页改变调用还是
       * @param {Object} val
       */
      handleCurrentChange(val) {
        this.formSearch.pageNum = val
        //this.requestData()
      },
      /**
       *网络请求
       */
      requestData() {
        for (var i = 0; i < 10; i++) {
          this.tableData.push({
            username: '刘建伟',
            nickName: '大飞猪',
            phone: '18384623913',
            balance: 400,
            money: 100,
            account: '18384623913',
            createTime: '2020-02-15 11:05:02',
            state: 1
          })
        }
        /* selOrderListByPage(this.formSearch).then((res) => {
           if (res.status) {
             this.tableData = res.records
             this.total = res.total
             console.log(res)
           } else {
             this.$message.error("获取页面数据失败！")
           }
         }).catch((err) => {
           this.$message.error(err.message)
         }) */
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
          /* //取消订单网络请求
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
          }) */
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
          /* //删除订单网络请求
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
           })*/
        })
      }
    },
    /**
     * 页面挂载完成自动调用函数
     */
    mounted() {
      this.requestData()
      // 查询废品分类类别，下拉列表
      /* selAllClassification().then((res)=>{
        if(res.status){
          this.classificationList = res.records
        }else{
          this.$message.error("查询废品分类列表失败！")
        }
      }) */
    }
  }
</script>

<style scoped>
  #notice {
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
