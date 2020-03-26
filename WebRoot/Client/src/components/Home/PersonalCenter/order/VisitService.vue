<template>
  <div id="vservice">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="businessNikeName" :label="$t('VisitService.businessNikeName')" width="110">
      </el-table-column>
      <el-table-column prop="businessPhone" :label="$t('VisitService.businessPhone')" width="110">
      </el-table-column>
      <el-table-column prop="address" :label="$t('VisitService.address')" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="orderId" :label="$t('VisitService.orderId')" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="startTime" :label="$t('VisitService.startTime')" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="endTime" :label="$t('VisitService.endTime')" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="status" :label="$t('VisitService.status')" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0" style="color: #FF4D51;">{{$t('VisitService.status0')}}</span>
          <span v-else-if="scope.row.status==1" style="color: #69D4B7;">{{$t('VisitService.status1')}}</span>
          <span v-else-if="scope.row.status==3" style="color: #909399;">{{$t('VisitService.status2')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('VisitService.operate')" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showRenew(scope.row)" v-if="scope.row.status==1">{{$t('RecycleForm.renew')}}</el-button>
          <el-button size="mini" type="info" v-else disabled>{{$t('RecycleForm.renew')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="$t('RecycleForm.renew')" :visible.sync="dialog.dialogFormVisible" width="400px" destroy-on-close>
      <el-form :model="dialog">
        <el-form-item :label="$t('VisitService.visitClass')" prop="visitClassificationId">
          <el-select v-model="dialog.visitClassificationId" :placeholder="$t('VisitService.selectViitClass')" clearable>
            <el-option v-for="category in visitCategories" :label="category.classificationName" :key="category.id"
              :value="category.id">
              {{category.classificationName}}
              <div style="width:50px;float:right;">{{category.money}}</div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogFormVisible = false">{{$t('VisitService.cancel')}}</el-button>
        <el-button type="primary" @click="handleRenew()">{{$t('VisitService.submit')}}</el-button>
      </div>
    </el-dialog>
    <el-pagination v-if="tableData.length!=0" background layout="prev, pager, next" :total="total" :page-size="pageSize"
      style="width: 95%;text-align: center;margin-top:20px ;" @current-change="pageCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import {
  findVisitOrderByPage,
  visitRenew,
  visitClassfication
} from '@/api/order.js'
import {} from '@/api/user.js'
export default {
  data () {
    return {
      pageNum: 1,
      total: 4,
      pageSize: 5,
      tableData: [],
      visitCategories: [],
      dialog: {
        curOrderId: null,
        visitClassificationId: null,
        dialogFormVisible: false
      }
    }
  },
  methods: {
    requestData () {
      findVisitOrderByPage(this.pageNum, this.pageSize).then((res) => {
        if (res.status) {
          console.log('records', res.records)
          this.tableData = res.records
          this.total = res.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 显示续费对话框
    showRenew (row) {
      this.dialog.dialogFormVisible = true
      this.dialog.curOrderId = row.orderId
      this.dialog.visitClassificationId = null
      visitClassfication().then((res) => {
        if (res.status) {
          this.visitCategories = res.data
        }
      })
    },
    // 确定续费按钮事件
    handleRenew () {
      visitRenew(this.dialog.curOrderId, this.dialog.visitClassificationId).then(res => {
        if (res.status) {
          this.requestData()
          this.dialog.dialogFormVisible = false
          let msg = res.data.endTime + '到期！'
          this.$notify({
            title: '成功',
            message: msg,
            type: 'success'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 当前页改变调用函数
    pageCurrentChange (val) {
      this.pageNum = val
      this.requestData()
    }
  },
  mounted () {
    this.requestData()
  }
}
</script>

<style>
  #vservice {
    width: 100%;
    height: 100%;
  }
</style>
