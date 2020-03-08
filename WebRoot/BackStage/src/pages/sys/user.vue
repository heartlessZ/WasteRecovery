<template>
  <imp-panel>
    <el-form :inline="true" :model="searchData" class="search-form" size="mini"  slot="header">
      <el-form-item>
        <el-input v-model="searchData.nikeName" placeholder="昵称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.phone" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-button type="primary" size="mini" @click="search($event)">查询</el-button>
    </el-form>
    <div slot="body">
      <el-table :data="tableData.rows" v-loading="listLoading" border style="width: 100%" :row-style="{'height':'40px'}" :cell-style="{'padding':'0'}"
        :header-cell-style="{'color': '#fafafa','background-color':'#69D4B7','border-color': '#69D4B7','font-size':'14px','text-align':'center'}">
        <!-- @selection-change="handleSelectionChange">
        <el-table-column
          prop="id"
          type="selection"
          width="50">
        </el-table-column>-->
        <el-table-column label="头像" width="76">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="height: 35px;vertical-align: middle;" alt />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="登录用户名"></el-table-column>
        <el-table-column prop="nikeName" label="昵称"></el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.sex==='2' ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <!-- <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status===1 ? '已激活' : '未激活' }}

          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <!-- <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>-->
            <el-button
              size="mini"
              type="info"
              icon="setting"
              @click="handleRoleConfig(scope.$index, scope.row)"
            >配置角色</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              v-if="scope.row.status==='1'"
              size="mini"
              type="primary"
              @click="handleStatus(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              v-else
              size="mini"
              type="danger"
              @click="handleStatus(scope.$index, scope.row)"
            >禁用</el-button>
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

      <el-dialog title="配置用户角色" :visible.sync="dialogVisible" size="tiny">
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class="is-empty"
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
          >
            <el-tree
              ref="roleTree"
              :data="roleTree"
              show-checkbox
              check-strictly
              node-key="id"
              v-loading="dialogLoading"
              :props="defaultRoleProps"
            ></el-tree>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configUserRoles">确 定</el-button>
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
        nikeName: "",
        phone: ""
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
    handleRoleConfig(index, row) {
      this.dialogLoading = true
      this.currentRow = row;
      this.dialogVisible = true;
      if (this.roleTree.length <= 0) {
        sysApi.roleList({ selectChildren: true }).then(res => {
          this.roleTree = res.data;
        });
      }
      request.get(api.SYS_USER_ROLE + "?userId=" + row.id).then(res => {
        if (res.status) {
          this.ids = [];
          res.data.forEach(item => {
            this.ids.push(item.id);
          });
          this.$refs.roleTree.setCheckedKeys(this.ids);
          this.dialogLoading = false
        }
      });
      // this.$http.get(api.SYS_USER_ROLE + "?id=" + row.id)
      //   .then(res => {
      //     this.$refs.roleTree.setCheckedKeys(res.data);
      //   }).catch(err=>{

      // })
    },
    configUserRoles() {
      // if (this.ids.length != 0) {
      //   let delparams = {
      //     roleIds: this.ids.join(","),
      //     userId: this.currentRow.id
      //   };
      //   request.post(api.SYS_DELETE_USER_ROLE, delparams).then(res => {
      //     if (res.status) {
      //       let checkedKeys = this.$refs.roleTree.getCheckedKeys();
      //       if (checkedKeys.length == 0) {
      //         this.dialogVisible = false;
      //         return;
      //       }
      //       let params = {
      //         roleIds: checkedKeys.join(","),
      //         userId: this.currentRow.id
      //       };
      //       request.post(api.SYS_SET_USER_ROLE, params).then(res => {
      //         if (res.status) {
      //           this.$message("操作成功");
      //           this.dialogVisible = false;
      //         }
      //       });
      //     }
      //   });
      // } else {
      //   let checkedKeys = this.$refs.roleTree.getCheckedKeys();
      //   if (checkedKeys.length == 0) {
      //     this.dialogVisible = false;
      //     return;
      //   }
      //   let params = {
      //     roleIds: checkedKeys.join(","),
      //     userId: this.currentRow.id
      //   };
      //   request.post(api.SYS_SET_USER_ROLE, params).then(res => {
      //     if (res.status) {
      //       this.$message("操作成功");
      //       this.dialogVisible = false;
      //     }
      //   });
      // }
      let checkedKeys = this.$refs.roleTree.getCheckedKeys();
        let params = {
          roleIds: checkedKeys.join(","),
          userId: this.currentRow.id
        };
        request.post(api.SYS_SET_USER_ROLE, params).then(res => {
          if (res.status) {
            this.$message("操作成功");
          }else{
            this.$message(res.msg);
          }
            this.dialogVisible = false;
        });
    },
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
          this.$message(res.msg);
          this.loadData();
        }else {
          this.$message(res.msg);
        }
      });
    },
    handleStatus(index, row) {
      request
        .get(api.SYS_USER_UPDATE_STATUS + "?UserId=" + row.id)
        .then(res => {
          if (res.status) {
            this.$message(res.msg);
            this.loadData();
          }else {
            this.$message(res.msg);
          }
        });
    },
    loadData() {
      this.listLoading = true;
      let queryString = {
        del: "0", //"默认查未删除用户"
        pageSize: this.tableData.pagination.pageSize,
        pageNum: this.tableData.pagination.pageNo,
        nikeName: this.searchData.nikeName,
        phone: this.searchData.phone
      };
      sysApi.userList(queryString).then(res => {
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
