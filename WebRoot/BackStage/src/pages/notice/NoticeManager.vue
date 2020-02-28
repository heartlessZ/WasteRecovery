<template>
  <div id="notice">
    <el-card class="contain">
      <el-form :inline="true" :model="formSearch" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="formSearch.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formSearch.title" placeholder="公告标题" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formSearch.state" placeholder="公告状态">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formSearch.noticeType" placeholder="公告类型">
            <el-option label="用户公告" value="1"></el-option>
            <el-option label="商家公告" value="2"></el-option>
            <el-option label="全体公告" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" class="date-select">
          <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" @click="dialogFormVisible = true;title= '发布公告'">发布公告</el-button>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="title" label="公告标题" align="center">
        </el-table-column>
        <el-table-column prop="noticeType" label="公告类型" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.noticeType==1">用户公告</span>
            <span v-if="scope.row.noticeType==2">商家公告</span>
            <span v-if="scope.row.noticeType==3">全体公告</span>
          </template>
        </el-table-column>
        <el-table-column prop="userObj.username" label="发布人" width="120" align="center">
        </el-table-column>
        <el-table-column prop="creatTime" label="发布时间" width="160" align="center">
        </el-table-column>
        <el-table-column prop="state" label="阅读人数" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.readNum}}人</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state==0" style="color: #e6a23c;">未发布</span>
            <span v-if="scope.row.state==1" style="color: #69D4B7;">已发布</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="lookNotice(scope.row.content)" size="mini">查看</el-button>
            <el-button v-if="scope.row.state==0" type="primary" @click="sendNotice(scope.row.id)" size="mini">发布</el-button>
            <el-button v-else type="info" size="mini" disabled>发布</el-button>
            <el-button v-if=" scope.row.state==0" type="primary" @click="onEditNotice(scope.row)" icon="el-icon-edit"
              size="mini"></el-button>
            <el-button v-else type="info" icon="el-icon-edit" size="mini" disabled></el-button>
            <el-button type="danger" @click="onDelNotice(scope.row.id)" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formSearch.pageNum"
        :page-sizes="[10,20,30,40]" :page-size="formSearch.pageSzie" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 修改、添加公告对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="70%" :show-close="false" :close-on-click-modal="false">
      <el-form :model="formNotice" ref="formNotice" :rules="rules">
        <el-form-item prop="title">
          <el-input v-model="formNotice.title" autocomplete="off" placeholder="公告标题" clearable show-word-limit
            maxlength="200" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item prop="noticeType">
          <el-select v-model="formNotice.noticeType" placeholder="公告类型" clearable style="width: 100%;">
            <el-option label="用户公告" :value="1"></el-option>
            <el-option label="商家公告" :value="2"></el-option>
            <el-option label="全体公告" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content">
          <el-input v-model="formNotice.content" type="textarea" placeholder="公告内容" :autosize="{ minRows: 8, maxRows: 8}"
            show-word-limit maxlength="5000">
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-if="formNotice.id==null" type="primary" @click="pushNontice(0)">保 存</el-button>
        <el-button v-if="formNotice.id==null" type="primary" @click="pushNontice(1)">保存并发布</el-button>
        <el-button v-if="formNotice.id!=null" type="primary" @click="onUpdateNodtice()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 查看公告内容对话框 -->
    <el-dialog title="公告内容" :visible.sync="lookdialogVisible" width="40%">
      <p v-text="content"></p>
    </el-dialog>
  </div>
</template>

<script>
  import {
    adminFindNoticeByPage,
    addNotice,
    modifyNotice,
    delNotice
  } from '@/api/notice.js'
  export default {
    name: 'orderList',
    data() {
      return {
        tableData: [],
        // 分类列表
        formSearch: {
          pageNum: 1,
          pageSize: 10,
          username: null,
          title: null,
          state: null,
          noticeType: null,
          startDate: null,
          endDate: null
        },
        //用于时间选择器
        time: null,
        //数据总条数
        total: 2,
        dialogFormVisible: false,
        lookdialogVisible: false,
        formNotice: {
          title: '',
          noticeType: '',
          content: '',
          state: null,
          id: null
        },
        title: '发布公告',
        //查看公告的内容
        content:'',
        rules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入公告内容',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
        setTimeout(() => {
          this.formNotice = {
            title: '',
            noticeType: null,
            content: '',
            state: null,
            id: null
          }
        }, 500);
      },
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
        if (this.time != null) {
          this.formSearch.startDate = this.time[0]
          this.formSearch.endDate = this.time[1]
        } else {
          this.formSearch.startDate = null
          this.formSearch.endDate = null
        }
        adminFindNoticeByPage(this.formSearch).then((res) => {
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
       * 点击查找调用函数
       */
      onSearch() {
        this.requestData()
      },
      /**
       * 新发布公告按钮事件(对话框中的)
       * @param {Object} state 0表示保存公告 1表示保存并发布公告
       */
      pushNontice(state) {
        this.formNotice.state = state
        this.$refs['formNotice'].validate((valid) => {
          if (valid) {
            addNotice(this.formNotice).then((res) => {
              if (res.status) {
                this.resetForm('formNotice')
                this.requestData()
                this.$message({
                  message: '成功',
                  type: 'success'
                });
              } else {
                this.$message.error(res.msg)
              }
            }).catch((err) => {
              this.$message.error(err.message)
            })
            this.dialogFormVisible = false
          }
        })
      },
      /**
       * 表格中的发布公告按钮，将未发布的公告发布
       * @param {Object} id 公告id
       */
      sendNotice(id) {
        //表示发布状态
        let notice = {
          "id": id,
          "state": 1
        }
        modifyNotice(notice).then((res) => {
          if (res.status) {
            this.requestData()
            this.$message({
              message: '发布成功',
              type: 'success'
            })
          } else {
            this.$message.error('发布失败!')
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      onCancel() {
        this.dialogFormVisible = false
        this.resetForm('formNotice')
      },
      lookNotice(content){
        this.content = content
        this.lookdialogVisible = true
      },
      //删除公告按钮事件
      onDelNotice(id) {
        this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delNotice(id).then((res) => {
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
        })
      },
      //编辑公告按钮事件
      onEditNotice(notice) {
        this.title = '修改公告'
        this.formNotice.id = notice.id
        this.formNotice.title = notice.title
        this.formNotice.noticeType = notice.noticeType
        this.formNotice.content = notice.content
        this.dialogFormVisible = true
      },

      //保存编辑公告按钮事件
      onUpdateNodtice() {
        this.$refs['formNotice'].validate((valid) => {
          if (valid) {
            modifyNotice(this.formNotice).then((res) => {
              if (res.status) {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                })
                this.requestData()
              } else {
                this.$message.error('修改失败！')
              }
            }).catch((err) => {
              this.$message.error(err.message)
            })
            this.dialogFormVisible = false
          }
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
