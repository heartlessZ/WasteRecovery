<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <!-- <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button> -->
    </h3>
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree
          v-if="roleTree"
          :data="roleTree"
          ref="roleTree"
          highlight-current
          :render-content="renderContent"
          @node-click="handleNodeClick"
          clearable
          node-key="id"
          :props="defaultProps"
        ></el-tree>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.roleName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" :label-width="formLabelWidth">
                <el-input v-model="form.describe" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'新增'"></el-button>
                <el-button
                  type="info"
                  @click="settingResource($event,form.id)"
                  icon="setting"
                  v-show="form.id && form.id!=null"
                >配置菜单</el-button>
                <el-button
                  type="danger"
                  @click="deleteSelected"
                  icon="delete"
                  v-show="form.id && form.id!=null"
                >删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-dialog title="配置菜单" :visible.sync="dialogVisible" size="tiny">
          <div class="select-tree">
            <el-scrollbar
              tag="div"
              class="is-empty"
              wrap-class="el-select-dropdown__wrap"
              view-class="el-select-dropdown__list"
            >
              <el-tree
                :data="resourceTree"
                ref="resourceTree"
                show-checkbox
                check-strictly
                node-key="id"
                v-loading="dialogLoading"
                :props="defaultMenuProps"
              ></el-tree>
            </el-scrollbar>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="configRoleResources">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </imp-panel>
</template>
<script>
import panel from "../../components/panel.vue";
import selectTree from "../../components/selectTree.vue";
import treeter from "../../components/treeter";
import * as sysApi from "../../services/sys";

import * as api from "../../api";
import request from "../../utils/request";

export default {
  mixins: [treeter],
  components: {
    "imp-panel": panel,
    "el-select-tree": selectTree
  },
  data() {
    return {
      dialogLoading: false,
      dialogVisible: false,
      dialogAuthorityLoading: false,
      dialogAuthorityVisible: false,
      formLabelWidth: "100px",
      defaultProps: {
        children: "children",
        label: "roleName",
        id: "id"
      },
      defaultMenuProps: {
        children: "childs",
        label: "menuName",
        id: "id"
      },
      roleTree: [],
      resourceTree: [],
      authorityTree: [],
      maxId: 700000,
      form: {
        id: null,
        roleName: "",
        describe: "",
        menuIds: ""
      },
      checkKeys: []
    };
  },
  methods: {
    configRoleResources() {
      // let delparams = {
      //   menuId: this.checkKeys.join(","),
      //   roleId: this.form.id
      // };
      // if (this.checkKeys.length == 0) {
      //   let checkedKeys = this.$refs.resourceTree.getCheckedKeys();
      //   if (checkedKeys.length == 0) {
      //     this.dialogVisible = false;
      //     return;
      //   }
      //   let params = { menuId: checkedKeys.join(","), roleId: this.form.id };
      //   request.post(api.SYS_SET_ROLE_RESOURCE, params).then(res => {
      //     if (res.status) {
      //       this.$message("绑定成功");
      //       this.dialogVisible = false;
      //     }
      //   });
      // } else {
      //   request.post(api.SYS_DELETE_ROLE_RESOURCE, delparams).then(res => {
      //     if (res.status) {
      //       //绑定菜单
      //       let checkedKeys = this.$refs.resourceTree.getCheckedKeys();
      //       if (checkedKeys.length == 0) {
      //         this.dialogVisible = false;
      //         return;
      //       }
      //       let params = {
      //         menuId: checkedKeys.join(","),
      //         roleId: this.form.id
      //       };
      //       request.post(api.SYS_SET_ROLE_RESOURCE, params).then(res => {
      //         if (res.status) {
      //           this.$message("绑定成功");
      //           this.dialogVisible = false;
      //         }
      //       });
      //     }
      //   });
      // }
      let checkedKeys = this.$refs.resourceTree.getCheckedKeys();
      let params = {
        menuId: checkedKeys.join(","),
        roleId: this.form.id
      };
      request.post(api.SYS_SET_ROLE_RESOURCE, params).then(res => {
        if (res.status) {
          this.$message("绑定成功");
        } else {
          this.$message(res.msg);
        }
        this.dialogVisible = false;
      });
    },
    handleNodeClick(data) {
      this.form = data;
    },
    newAdd() {
      this.form = {
        id: null,
        roleName: "",
        describe: "",
        menuIds: ""
      };
    },

    onSubmit() {
      if (this.form.id == null) {
        let params = {
          describe: this.form.describe,
          menuIds: this.form.menuIds,
          roleName: this.form.roleName
        };
        request.post(api.SYS_ROLE_ADD, params).then(res => {
          if (res.status) {
            this.$message("操作成功");
            this.load();
          }
        });
      } else {
        let params = {
          describe: this.form.describe,
          id: this.form.id,
          menuIds: this.form.menuIds,
          roleName: this.form.roleName
        };
        request.post(api.SYS_ROLE_UPDATE, params).then(res => {
          if (res.status) {
            this.$message("操作成功");
            this.load();
          }
        });
      }
    },
    deleteSelected(id) {
      request.get(api.SYS_ROLE_DELETE + "?roleIds=" + id).then(res => {
        if (res.status) {
          this.$message("操作成功");
          this.load();
        }
      });
    },
    load() {
      sysApi.roleList().then(res => {
        console.log(res);
        this.roleTree = [];
        this.roleTree.push(...res.data);
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span class="render-content">
            <i
              class="fa fa-wrench"
              title="配置菜单"
              on-click={e => this.settingResource(e, data.id)}
            ></i>
            <i
              class="fa fa-trash"
              on-click={() => this.deleteSelected(data.id)}
            ></i>
          </span>
        </span>
      );
    },
    appendKeys(data) {
      data.forEach(element => {
        this.checkKeys.push(element.id);
        this.appendKeys(element.childs);
      });
    },
    settingResource(event, id) {
      event.stopPropagation();
      this.dialogVisible = true;
      this.dialogLoading = true;
      if (this.resourceTree == null || this.resourceTree.length <= 0) {
        request.get(api.SYS_MENU_LIST2).then(res => {
          if (res.status) {
            this.resourceTree = res.data;
          }
        });
      }
      this.checkKeys = [];
      request.get(api.SYS_ROLE_AUTHORIZATION + "?reloId=" + id).then(res => {
        this.dialogLoading = false;
        if (!res.status) {
          return;
        }
        this.appendKeys(res.data);
        // res.data.forEach(element => {
        //   this.checkKeys.push(element.id);
        //   if (element.childs.length > 0) {
        //     element.childs.forEach(item => {
        //       this.checkKeys.push(item.id);
        //       if (item.childs.length > 0) {
        //         item.childs.forEach(i => {
        //           this.checkKeys.push(i.id);
        //           if (i.childs.length > 0) {
        //             i.childs.forEach(j => {
        //               this.checkKeys.push(j.id);
        //             });
        //           }
        //         });
        //       }
        //     });
        //   }
        //});
        this.$refs.resourceTree.setCheckedKeys(this.checkKeys);
        this.dialogLoading = false;
      });
    }
  },
  created() {
    this.load();
  }
};
</script>

<style>
.render-content {
  float: right;
  margin-right: 20px;
}

.render-content i.fa {
  margin-left: 10px;
}

.render-content i.fa:hover {
  color: #e6000f;
}

.select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
  padding: 0;
}

.select-tree .el-scrollbar {
  border: 1px solid #d1dbe5;
}

.select-tree .el-tree {
  border: 0;
}
</style>
