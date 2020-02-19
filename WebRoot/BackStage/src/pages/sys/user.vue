<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <!-- <el-col :span="12">
          <router-link :to="{ path: 'userAdd'}">
            <el-button type="primary" icon="plus">新增</el-button>
          </router-link>
        </el-col>-->
        <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="输入用户名称"
              v-model="searchData.nikeName"
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
        <!-- <el-col :span="6">
          <div class="el-input" style="width: 200px; ">
            <input
              type="text"
              placeholder="输入手机号"
              v-model="searchData.phone"
              @keyup.enter="search($event)"
              class="el-input__inner"
            />
          </div>
        </el-col>-->
      </el-row>
    </h3>
    <div slot="body">
      <el-table :data="tableData.rows" border style="width: 100%" v-loading="listLoading">
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
        <el-table-column label="性别">
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
        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <!-- <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>-->
            <el-button
              size="small"
              type="info"
              icon="setting"
              @click="handleRoleConfig(scope.$index, scope.row)"
            >配置角色</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              v-if="scope.row.status==='1'"
              size="small"
              type="success"
              @click="handleStatus(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              v-else
              size="small"
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
      this.currentRow = row;
      this.dialogVisible = true;
      if (this.roleTree.length <= 0) {
        sysApi.roleList({ selectChildren: true }).then(res => {
          this.roleTree = res.data;
        });
      }
      request.get(api.SYS_USER_ROLE + "?userId=" + row.id).then(res => {
        if (res.status) {
          console.log(res.data);
          this.ids = [];
          res.data.forEach(item => {
            this.ids.push(item.id);
          });
          this.$refs.roleTree.setCheckedKeys(this.ids);
        }
      });
      // this.$http.get(api.SYS_USER_ROLE + "?id=" + row.id)
      //   .then(res => {
      //     this.$refs.roleTree.setCheckedKeys(res.data);
      //   }).catch(err=>{

      // })
    },
    configUserRoles() {
      if (this.ids.length != 0) {
        let delparams = {
          roleIds: this.ids.join(","),
          userId: this.currentRow.id
        };
        request.post(api.SYS_DELETE_USER_ROLE, delparams).then(res => {
          if (res.status) {
          }
        });
      }
      let checkedKeys = this.$refs.roleTree.getCheckedKeys();
      if (checkedKeys.length == 0) {
        this.dialogVisible = false;
        return;
      }
      // this.$http.get(api.SYS_SET_USER_ROLE + "?userId=" + this.currentRow.id + "&roleIds="+checkedKeys.join(','))
      // .then(res => {
      //     this.$message('修改成功');
      //     this.dialogVisible = false;
      // })
      let params = {
        roleIds: checkedKeys.join(","),
        userId: this.currentRow.id
      };
      request.post(api.SYS_SET_USER_ROLE, params).then(res => {
        if (res.status) {
          this.$message("操作成功");
          this.dialogVisible = false;
        }
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
          this.$message("删除成功");
          this.loadData();
        }
      });
    },
    handleStatus(index, row) {
      request
        .get(api.SYS_USER_UPDATE_STATUS + "?UserId=" + row.id)
        .then(res => {
          if (res.status) {
            this.$message("修改状态成功");
            this.loadData();
          }
        });
    },
    loadData() {
      let queryString = {
        del: "0", //"默认查未删除用户"
        pageSize: this.tableData.pagination.pageSize,
        pageNum: this.tableData.pagination.pageNo,
        nikeName: this.searchData.nikeName,
        phone: this.searchData.phone
      };
      sysApi.userList(queryString).then(res => {
        this.tableData.rows = res.records;
        this.tableData.pagination.total = res.total;
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
