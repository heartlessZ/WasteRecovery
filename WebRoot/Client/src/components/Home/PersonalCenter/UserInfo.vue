<template>
  <div id="userInfo">
    <div class='title'>个人信息<el-link icon="el-icon-edit" style="color: #000000;float: right;" :underline='false' @click="dialogVisible = true">编辑</el-link></div>
    <el-divider class='line-style'></el-divider>
    <div class="contain">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">头像</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-avatar"><el-avatar :size="50" :src="userInfo.avatar"></el-avatar></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">昵称</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.nikeName"></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">性别</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.sex">男</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label" >电话</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.phone"></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">邮箱</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.email"></div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogVisible" width="400px">
      <el-form>
        <el-form-item>
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select  placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      userInfo: {
        avatar: 'http://49.235.151.230:4869/06071aa0454d471b4190ad3614dc0fb8',
        nikeName: '未设置',
        email: '未设置',
        phone: '未设置',
        sex: '未设置'
      },
      dialogVisible: false
    }
  },
  methods: {
    goEdit () {
      alert('编辑')
    }
  }
}
</script>

<style scoped>
  #userInfo {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
 .el-row{
   margin-bottom: 12px;
 }
  .title {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    width: 100%;
  }

  .line-style {
    margin: 8px 0;
  }

  .contain {
    width: 100%;
    padding: 10px 40px;
  }

  .bg-purple {
    background: #F3F5F7;
  }

  .grid-content {
    border-radius: 4px;
    line-height: 20px;
    padding: 20px 0;
  }
   .label{
     text-align: center;
   }
   .grid-txt{
     padding: 20px;
     border-bottom:1px solid #d9dde1;
     border-radius: 0px;
   }
   .grid-avatar{
     padding: 0px 0px 0px 20px;
     line-height: 60px;
   }
   .el-link{

   }
</style>
