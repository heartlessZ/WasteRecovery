<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="身份证号码"
              v-model="searchData.idCard"
              @keyup.enter="search($event)"
              class="el-input__inner"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="真实姓名"
              v-model="searchData.cardName"
              @keyup.enter="search($event)"
              class="el-input__inner"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <el-select v-model="searchData.state" @change="search($event)" placeholder="请选择状态">
              <el-option label="待审核" value="0"></el-option>
              <el-option label="审核通过" value="1"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table :data="tableData.rows" border style="width: 100%" v-loading="listLoading">
        <el-table-column prop="user.username" label="登录用户名"></el-table-column>
        <el-table-column prop="cardName" label="真实姓名"></el-table-column>
        <el-table-column prop="idCard" label="身份证号码"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="creditCode" label="信用代码"></el-table-column>
        <el-table-column prop="businessName" label="营业执照名"></el-table-column>
        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <el-button size="small" type="info" icon="setting" @click="dialogVisible=true">查看详情</el-button>
            <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-button size="small" type="success" v-show="scope.row.state=='0'" @click="handleStatus(scope.$index, scope.row)">通过</el-button>
            <!-- <el-button
              v-else
              size="small"
              type="danger"
              @click="handleStatus(scope.$index, scope.row)"
            >拒绝</el-button>-->
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

      <el-dialog title="详情" :visible.sync="dialogVisible" size="tiny">
        <div class="demo-image">
          <div class="block" style="text-align:center;">
            <span class="demonstration">身份证正面</span>
            <br />
            <el-image
              style="width: 300px; height: 300px"
              :src="currentRow.cardPositive"
              fit="contain"
            ></el-image>
            <br />
            <span class="demonstration">身份证反面</span>
            <br />
            <el-image style="width: 300px; height: 300px" :src="currentRow.cardBack" fit="contain"></el-image>
            <br />
            <span class="demonstration">营业执照</span>
            <br />
            <el-image
              style="width: 300px; height: 300px"
              :src="currentRow.businessLicense"
              fit="contain"
            ></el-image>
          </div>
          <br />
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
import { settledInList } from "../../api/system";

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
      searchData: {
        idCard: "",
        cardName: "",
        state: ""
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
      ids: []
    };
  },
  methods: {
    search(target) {
      this.loadData();
    },
    handleSelectionChange(val) {},
    handleSizeChange(val) {
      this.tableData.pagination.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.tableData.pagination.pageNo = val;
      this.loadData();
    },
    handleEdit(index, row) {
      this.$router.push({ path: "userAdd", query: { id: row.id } });
    },
    handleDelete(index, row) {
      request.get(api.SYS_USER_DELETE + "?id=" + row.id).then(res => {
        if (res.status) {
          this.$message("删除成功");
          this.loadData();
        }
      });
    },
    handleStatus(index, row) {
      request.get(api.SYS_SETTLEDIN_SET_PASS + "?id=" + row.id).then(res => {
        if (res.status) {
          this.$message("审核成功");
          this.loadData();
        }
      });
    },
    loadData() {
      this.listLoading = true;
      let params = {
        state: String(this.searchData.state), //"默认查待审核的入驻信息"
        pageSize: this.tableData.pagination.pageSize,
        pageNum: this.tableData.pagination.pageNo,
        idCard: this.searchData.idCard,
        cardName: this.searchData.cardName
      };
      settledInList(params).then(res => {
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
  }
};
</script>
<style scoped>
.el-pagination {
  float: right;
  margin-top: 15px;
}
</style>
