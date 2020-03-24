<template>
  <div id="notice">
    <div class="content">
      <p>{{$t('Notice.Unread')}}：{{count}}</p>
      <div style="height: 360px;margin-left: 16px;">
        <div class="item" v-for="item in tableData">
          <div style="float: left;">
            <el-badge :is-dot="!item.ifRead" class="item-badge">
              <el-button size="small">{{$t('Notice.title')}}</el-button>
            </el-badge>
            <a style="padding: 6px 0;display: inline-block;color: #000000;" @click="lookNotice(item)">{{item.title}}</a>
          </div>
          <span style="padding: 6px 0;float: right;">{{item.creatTime}}</span>
        </div>
      </div>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageInfo.pageNum" :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next" :total="total" style="text-align: center;margin-top: 20px;">
      </el-pagination>
    </div>
    <!-- 查看公告内容对话框 -->
    <el-dialog :title="$t('Notice.Noticecontent')" :visible.sync="lookdialogVisible" width="40%">
      <p v-text="dialogContent"></p>
    </el-dialog>
  </div>
</template>

<script>
import {
  userFindNewNoticeNum,
  setIsRead,
  userFindNoticeByPage
} from '@/api/notice.js'
export default {
  data () {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5
      },
      // 总记录条数
      total: 0,
      tableData: [],
      // 未读公告数
      count: 0,
      lookdialogVisible: false,
      dialogContent: ''
    }
  },
  methods: {
    handleCurrentChange () {
      this.requestData()
    },
    requestData () {
      userFindNoticeByPage(this.pageInfo).then((res) => {
        if (res.status) {
          this.tableData = res.records
          this.total = res.total
          // console.log(res.records)
        } else {
          this.$message.error(res.msg)
        }
      }).catch((err) => {
        this.$message.error(err.message)
      })
      // 查询未读公告数目
      userFindNewNoticeNum().then((res) => {
        if (res.status) {
          this.count = res.num
        }
      })
    },
    /**
       *查看公告
       * @param {Object} content 公告内容
       * @param {Object} id 公告id
       */
    lookNotice (item) {
      this.dialogContent = item.content
      this.lookdialogVisible = true
      // isRead==0表示未阅读
      if (item.ifRead === 0) {
        // 设置公告为已读网络请求
        setIsRead(item.id).then((res) => {
          if (res.status) {
            this.requestData()
          }
        })
      }
    }
  },
  mounted () {
    this.requestData()
    $('#hero-area').addClass('limit-h')
  }
}
</script>

<style scoped>

  #notice {
      height: 100%;
      width: 70%;
      display: flex;
      margin: auto;
  }

  .content {
    width: 100%;
    height: 500px;
  }

  .item-badge {
    margin-right: 10px;
  }

  .item {
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
  }

  a:hover {
    color: #61D2B4;
  }


  .limit-h {
    height: 96px;
  }
</style>
