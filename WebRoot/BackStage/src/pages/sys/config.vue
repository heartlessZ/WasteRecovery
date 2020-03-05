 <template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>系统配置</span>
  </div>
   <vxe-table
     border
     resizable
     :data="tableData"
     :edit-config="{trigger: 'dblclick', mode: 'cell'}">
     <vxe-table-column field="vkey" title="配置key"></vxe-table-column>
     <vxe-table-column field="vdescribe" title="配置名"></vxe-table-column>
     <vxe-table-column field="vvalue" title="配置描述" :edit-render="{name: 'input', attrs: {type: 'vvalue'}}"></vxe-table-column>
     <vxe-table-column title="操作" width="200">
       <template v-slot="{ row, rowIndex }">
         <template>
           <vxe-button status="primary" @click="saveEvent(row)" :loading="row.loading">更新</vxe-button>
         </template>
       </template>
     </vxe-table-column>
   </vxe-table>
</el-card>
  </template>

  <script>
  import request from '../../utils/request'
import * as api from "../../api";
    export default {
      data() {
        return {
          tableData: [],

        }
      },
      methods: {
        getData(){
          request.get(api.SYS_CONFIG_LIST).then(res=>{
            if(res.status){
              this.tableData = res.data
            }
          })
        },
        saveEvent (row, field) {
          let params =  {
            vkey: row.vkey,
            describe:row.vdescribe,
            vvalue:row.vvalue
          }
          console.log(row)
          console.log(field)
          request.post(api.SYS_CONFIG_EDIT, params)
            .then(res => {
            if(res.status){
              this.$message(res.msg);
            }else {
              this.$message(res.msg);

            }
          })
        },
      },
      created(){
          this.getData();
      }
    }
  </script>

  <style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  </style>
