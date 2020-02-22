 <template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>系统配置</span>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%">
      <!-- <el-table-column
        prop="vkey"
        label="配置名"
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="vdescribe"
        label="配置描述">
      </el-table-column>
      <el-table-column
        prop="vvalue"
        label="值">
      </el-table-column>
    </el-table>
</el-card>
    
  </template>

  <script>
  import request from '../../utils/request'
import * as api from "../../api";
    export default {
      data() {
        return {
          tableData: []
        }
      },
      created(){
          request.get(api.SYS_CONFIG_LIST).then(res=>{
              if(res.status){
                  this.tableData = res.data
              }
          })
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