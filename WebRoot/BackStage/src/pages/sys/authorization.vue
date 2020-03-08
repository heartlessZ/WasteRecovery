<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <!-- <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button> -->
    </h3>
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="menuTree"
                 ref="menuTree"
                 :data="menuTree"
                 highlight-current
                 :render-content="renderContent"
                 @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <el-select-tree v-model="form.parentId" :treeData="menuParents" :propNames="defaultProps" clearable
                                placeholder="请选择父级">
                </el-select-tree>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.menuName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="链接" :label-width="formLabelWidth">
                <el-input v-model="form.menuUrl" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="标签" :label-width="formLabelWidth">
                <el-input v-model="form.perms" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-show="form.id==null" v-text="'新增'"></el-button>
                <!-- <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.id && form.id!=null">删除
                </el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script type="text/babel">

  import panel from "../../components/panel.vue"
  import selectTree from "../../components/selectTree.vue"
  import treeter from "../../components/treeter"
  import merge from 'element-ui/src/utils/merge';

  import * as api from "../../api"
  import * as sysApi from '../../services/sys'
  import request from '../../utils/request'

  export default {
    mixins: [ treeter ],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree
    },
    data(){
      return {
        selectIconDialog: false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'jurisdiction',
          label: 'menuName',
          id: "id",
        },
        maxId: 7000000,
        menuTree: [],
        menuParents:[],
        form: {
          id: null,
          menuName: '',
          perms: '',
          menuUrl: '',
          parentId: null,
        }
      }
    },
    methods: {
      selectIcon(event){
        this.form.icon = event.target.className;
        this.selectIconDialog = false;
      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span><i class={data.icon}></i>&nbsp;{node.label}</span>
            </span>
          </span>);
      },
      newAdd(){
        this.form = {
          id:null,
          menuName: '',
          perms: '',
          menuUrl: '',
          parentId:null
        };
      },
      deleteSelected(){
        request.get(api.SYS_MENU_DELETE + "?id=" + this.form.id)
          .then(res => {
            this.$message(res.msg);
            this.load()
          }).catch(e => {
        })
      },

      handleNodeClick(data){
        this.form = merge({}, data);
      },
      onSubmit(){
        let params = {
          menuName: this.form.menuName,
          perms: this.form.perms,
          menuUrl: this.form.menuUrl,
          parentId: this.form.parentId
        }
          request.post(api.SYS_AUTHORIZATION_ADD, params)
            .then(res => {
              if(!res.status){

              this.$message(res.msg);
              return
              }
              this.$message(res.msg);
              //this.updateTreeNode(this.menuTree, res.data);
              this.load()
            }).catch(e => {
            // this.$message('操作成功');
            // this.updateTreeNode(this.menuTree, merge({}, this.form));
          })
      },
      load(){
        request.get(api.SYS_ROLE_MENU).then(res=>{
          if(res.status){
            this.menuTree = res.data
          }
        })
      }
    },
    mounted(){
      this.load();
      sysApi.menuList().then(res => {
          if(res.status){
            this.menuParents = res.data;
          }
        })
    },
    created(){
    }
  }
</script>

<style>
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

</style>
