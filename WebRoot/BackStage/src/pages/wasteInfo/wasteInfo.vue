<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="输入用户名称"
              v-model="searchData.username"
              @keyup.enter="search($event)"
              class="el-input__inner"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="输入手机号"
              v-model="searchData.phone"
              @keyup.enter="search($event)"
              class="el-input__inner"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="输入地址"
              v-model="searchData.address"
              @keyup.enter="search($event)"
              class="el-input__inner"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <el-select v-model="searchData.classificationId" @change="loadData" clearable placeholder="请选择分类">
              <el-option
                v-for="(item,index) in categories"
                :key="index"
                :label="item.tradeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table :data="tableData.rows" border style="width: 100%" v-loading="listLoading">
        <el-table-column prop="address" label="详细地址"></el-table-column>
        <el-table-column prop="tradeName" label="废品类别"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column prop="expectedPrice" label="期望价格"></el-table-column>
        <el-table-column prop="nikeName" label="发布人"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="info"
              icon="setting"
              @click="handleRoleConfig(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button size="small" type="success" @click="createOrder(scope.$index, scope.row)">接单</el-button>
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
          this.$message("接单成功")
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
    // handleEdit(index, row) {
    //   this.$router.push({ path: "userAdd", query: { id: row.id } });
    // },
    // handleDelete(index, row) {
    //   request.get(api.SYS_USER_DELETE + "?id=" + row.id).then(res => {
    //     if (res.status) {
    //       this.$message("删除成功");
    //       this.loadData();
    //     }
    //   });
    // },
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
