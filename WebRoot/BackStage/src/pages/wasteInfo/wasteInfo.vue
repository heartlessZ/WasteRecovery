<template>
  <imp-panel>
    <el-form :inline="true" :model="searchData" class="search-form" size="mini"  slot="header">
      <el-form-item>
        <el-input v-model="searchData.username" placeholder="用户名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.phone" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.address" placeholder="详细地址" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select clearable v-model="searchData.classificationId" placeholder="废品类别" @change="search($event)">
          <el-option v-for="item in categories" :key="item.id" :label="item.tradeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="mini" @click="search($event)">查询</el-button>
    </el-form>
    <div slot="body">
      <el-table :data="tableData.rows" v-loading="listLoading" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <el-table-column prop="address" label="详细地址" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="tradeName" label="废品类别"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column prop="expectedPrice" label="期望价格"></el-table-column>
        <el-table-column prop="nikeName" label="发布人"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleRoleConfig(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button size="mini" type="primary" @click="createOrder(scope.$index, scope.row)">接单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.pagination.total"
      ></el-pagination>

      <el-dialog title="废品详情" :visible.sync="dialogVisible" size="tiny">
        <div class="demo-image">
          <div class="block" style="text-align:center;">
            <span class="demonstration">现场图片</span>
            <br />
            <el-image style="width: 300px; height: 300px" :src="currentRow.photos" fit="fill"></el-image>
          </div>
          <br />
          废品描述：{{currentRow.describe}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <!-- <el-button type="primary" @click="configUserRoles">确 定</el-button> -->
        </span>
      </el-dialog>
    </div>
  </imp-panel>
</template>

<script>
import panel from "../../components/panel.vue";
import * as api from "../../api";
import testData from "../../../static/data/data.json";
import * as sysApi from "../../services/sys";
import request from "../../utils/request";
import { queryRootCategory, queryChildrenCategory } from "../../api/user";

export default {
  components: {
    "imp-panel": panel
  },
  data() {
    return {
      currentRow: {},
      dialogVisible: false,
      dialogLoading: false,
      defaultProps: {
        children: "children",
        label: "name",
        id: "id"
      },
      defaultRoleProps: {
        children: "children",
        label: "describe",
        id: "id"
      },
      roleTree: [],
      listLoading: false,
      categories: [],
      searchData: {
        username: "",
        phone: "",
        address: "",
        classificationId: null
      },
      tableData: {
        pagination: {
          total: 0,
          pageNo: 1,
          pageSize: 10,
          parentId: 0
        },
        rows: []
      }
    };
  },
  methods: {
    search(target) {
      this.loadData();
    },
    handleSelectionChange(val) {},
    handleRoleConfig(index, row) {
      this.currentRow = row;
      this.dialogVisible = true;
    },

    createOrder(index, row) {
      this.currentRow = row;
      request.post(api.ORDER_CREATE+"?scInfoReId="+row.id).then(res=>{
        if(res.status){
          this.$message(res.msg)
          this.loadData()
        }else{
          this.$message(res.msg)
        }
      })
    },
    handleSizeChange(val) {
      this.tableData.pagination.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.tableData.pagination.pageNo = val;
      this.loadData();
    },
    loadData() {
      this.listLoading = true;
      let queryString = {
        del: "0", //"默认查未删除用户"
        pageSize: this.tableData.pagination.pageSize,
        pageNum: this.tableData.pagination.pageNo,
        username: this.searchData.username,
        phone: this.searchData.phone,
        address: this.searchData.address,
        classificationId: this.searchData.classificationId =='' ? null : this.searchData.classificationId,
        status:0
      };
      request.get(api.WASTE_PAGE, { params: queryString }).then(res => {
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
    queryChildrenCategory().then(res => {
      if (res.status) {
        this.categories = res.records;
      }
    });
  }
};
</script>
<style scoped>
.el-pagination {
  float: right;
  margin-top: 15px;
}
</style>
