<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一级分类</span>
        <el-button style="float: right;" type="primary" icon="plus" @click="newAdd">新增一级分类</el-button>
      </div>
      <div>
        <imp-panel>
          <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
            <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
              <el-tree
                v-if="categoriesParent"
                ref="categoriesParent"
                :data="categoriesParent"
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
                    <!-- <el-form-item label="父级" :label-width="formLabelWidth">
                      <el-select-tree
                        v-model="form.parentId"
                        :treeData="menuTree"
                        :propNames="defaultProps"
                        clearable
                        placeholder="请选择父级"
                      ></el-select-tree>
                    </el-form-item> -->
                    <el-form-item label="名称" :label-width="formLabelWidth">
                      <el-input v-model="form.classificationName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" :label-width="formLabelWidth">
                      <upload-img ref="UploadImg" :limit="limit" @getimageurl="getImageUrl"></upload-img>
                    </el-form-item>
                    <el-form-item label :label-width="formLabelWidth">
                      <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'新增'"></el-button>
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
            </el-col>
          </el-row>
        </imp-panel>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>二级分类</span>
        <el-button style="float: right;" type="primary" icon="plus" @click="newAddSon">新增二级分类</el-button>
      </div>
      <div>
        <imp-panel>
          <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
            <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
              <el-tree
                v-if="categoriesChildren"
                ref="categoriesChildren"
                :data="categoriesChildren"
                highlight-current
                :render-content="renderContent"
                @node-click="handleChildNodeClick"
                clearable
                node-key="id"
                :props="defaultChildrenProps"
              ></el-tree>
            </el-col>
            <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
              <el-card class="box-card">
                <div class="text item">
                  <el-form :model="formChildren" ref="formChildren">
                    <el-form-item label="父分类" :label-width="formLabelWidth">
                      <el-select-tree
                        v-model="formChildren.id"
                        :treeData="categoriesParent"
                        :propNames="defaultProps"
                        clearable
                        placeholder="请选择父分类"
                      ></el-select-tree>
                    </el-form-item>
                    <el-form-item label="名称" :label-width="formLabelWidth">
                      <el-input v-model="formChildren.tradeName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" :label-width="formLabelWidth">
                      <el-input v-model="formChildren.price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label :label-width="formLabelWidth">
                      <el-button type="primary" @click="onChildSubmit" v-text="formChildren.id?'修改':'新增'"></el-button>
                      <el-button
                        type="danger"
                        @click="deleteSelectedChild"
                        icon="delete"
                        v-show="formChildren.id && formChildren.id!=null"
                      >删除</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </imp-panel>
      </div>
    </el-card>
  </div>
</template>
<script type="text/babel">
import panel from "../../components/panel.vue";
import selectTree from "../../components/selectTree.vue";
import treeter from "../../components/treeter";
import merge from "element-ui/src/utils/merge";

import * as api from "../../api";
import * as sysApi from "../../services/sys";
import request from "../../utils/request";
import UploadImg from '../../components/UploadImg'

export default {
  mixins: [treeter],
  components: {
    "imp-panel": panel,
    "el-select-tree": selectTree,
    "upload-img" : UploadImg
  },
  data() {
    return {
      formLabelWidth: "100px",
      defaultProps: {
        //children: "childs",
        label: "classificationName",
        id: "id"
      },
      defaultChildrenProps: {
        //children: "childs",
        label: "tradeName",
        id: "id"
      },
      maxId: 7000000,
      menuTree: [],
      categoriesParent: [],
      categoriesChildren: [],
      limit:1,
      form: {
        id: null,
        classificationName: "",
        imgUrl: "",
        describe: ''
      },
      formChildren: {
        id: null,
        price: 0,
        tradeName: ''
      }
    };
  },
  methods: {
    getImageUrl(urls){
        if(urls.length>0)
            this.form.imgUrl = urls[0]
        else
            this.form.imgUrl = ""
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>
              <i class={data.icon}></i>&nbsp;{node.label}
            </span>
          </span>
        </span>
      );
    },
    newAdd() {
      this.form = {
        id: null,
        classificationName: "",
        imgUrl: "",
        describe: ''
      };
      this.$refs.UploadImg.setFileList([])
    },
    newAddSon() {
      this.formChildren = {
        id: null,
        price: 0,
        tradeName: ''
      };
    },
    deleteSelected() {
      request
        .get(api.WASTE_CATEGORY_PARENT_DELETE + "?id=" + this.form.id)
        .then(res => {
          this.$message("操作成功");
          this.load();
        })
        .catch(e => {});
    },
    deleteSelectedChild() {
      request
        .get(api.WASTE_CATEGORY_CHILDREN_DELETE + "?id=" + this.formChildren.id)
        .then(res => {
          this.$message("操作成功");
          this.load();
        })
        .catch(e => {});
    },
    // batchDelete() {
    //   var checkKeys = this.$refs.menuTree.getCheckedKeys();
    //   if (checkKeys == null || checkKeys.length <= 0) {
    //     this.$message.warning("请选择要删除的资源");
    //     return;
    //   }
    //   this.$confirm("确定删除?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     checkKeys.forEach(item => {
    //       request
    //         .get(api.SYS_MENU_DELETE + "?id=" + item)
    //         .then(res => {
    //           if (res.status) {
    //             this.$message("操作成功");
    //             this.load();
    //           }
    //         })
    //         .catch(e => {});
    //     });
    //   });
    // },
    handleNodeClick(data) {
      this.form = merge({}, data);
      this.$refs.UploadImg.setFileList([{name:'',url: this.form.imgUrl}])
    },
    handleChildNodeClick(data) {
      this.formChildren = merge({}, data);
    },
    onSubmit() {
        if(!this.form.imgUrl){
            this.$message("请上传图标")
            return 
        }
      if (this.form.id == null) {
        //添加一级分类
        request
          .post(api.WASTE_CATEGORY_PARENT_ADD, this.form)
          .then(res => {
            this.$message("操作成功");
            this.load();
          })
          .catch(e => {
            
          });
      } else {
        // let params = {
        //   icon: this.form.icon,
        //   id: this.form.id,
        //   menuName: this.form.menuName,
        //   menuUrl: this.form.menuUrl,
        //   orderNum: this.form.orderNum,
        //   parentId: this.form.parentId
        // };
        //return
        request
          .post(api.WASTE_CATEGORY_PARENT_UPDATE, this.form)
          .then(res => {
            if (!res.status) {
              this.$message("操作失败");
              return;
            }
            this.$message("操作成功");
            this.load();
          })
          .catch(e => {
          });
      }
    },
    onChildSubmit() {
      if (this.formChildren.id == null) {
        //添加一级分类
        request
          .post(api.WASTE_CATEGORY_CHILDREN_ADD, this.form)
          .then(res => {
            this.$message("操作成功");
            this.load();
          })
          .catch(e => {
            
          });
      } else {
        request
          .post(api.WASTE_CATEGORY_CHILDREN_UPDATE, this.formChildren)
          .then(res => {
            if (!res.status) {
              this.$message("操作失败");
              return;
            }
            this.$message("操作成功");
            this.load();
          })
          .catch(e => {
          });
      }
    },
    load() {
      request.get(api.WASTE_CATEGORY_PARENT).then(res=>{
          if(res.status){
              this.categoriesParent = res.records
          }
      })
      request.get(api.WASTE_CATEGORY_CHILDREN).then(res=>{
          if(res.status){
              this.categoriesChildren = res.records
          }
      })
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style scoped>
.select-tree .icons-wrapper {
  display: block;
}

.select-tree .is-empty i {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.select-tree .is-empty i:hover {
  background-color: #0d6aad;
  color: #ffffff;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 10px;
}
</style>
