<template>
  <div id="userInfo">
    <div class='title'>个人信息<el-link icon="el-icon-edit" style="color: #000000;float: right;" :underline='false' @click="dialogVisible = true">编辑</el-link>
    </div>
    <el-divider class='line-style'></el-divider>
    <div class="contain">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">头像</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-avatar">
            <el-avatar :size="50" :src="userInfo.avatar"></el-avatar>
          </div>
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
          <div class="grid-content grid-txt" v-if="userInfo.sex==0">男</div>
          <div class="grid-content grid-txt" v-if="userInfo.sex==1">女</div>
          <div class="grid-content grid-txt" v-if="userInfo.sex==2">保密</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">电话</div>
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
    <el-dialog title="编辑个人信息" :visible.sync="dialogVisible" width="400px" @open="dialogOpen()">
      <el-form label-width="100px" :model="editUserInfo">
        <el-form-item label="头像">
          <el-upload class="avatar-uploader" action="http://49.235.151.230:8091/file/imgUpdate" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="editUserInfo.avatar" :src="editUserInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editUserInfo.nikeName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editUserInfo.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
            <el-radio label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadImg from '../RecycleForm/UploadImg'
import { getInfo, updateUserInfo } from '@/api/user'
export default {
  name: 'userInfo',
  components: {
    UploadImg
  },
  data () {
    return {
      userInfo: {
        avatar: '',
        nikeName: '',
        email: '',
        phone: '',
        sex: '2'
      },
      editUserInfo: {},
      dialogVisible: false
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.status) {
        this.editUserInfo.avatar = res.data.imgurl
      } else {
        this.$message.error('上传头像失败！')
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 对话框打开时的回调函数
    dialogOpen () {
      // 类似于克隆对象
      this.editUserInfo = JSON.parse(JSON.stringify(this.userInfo))
    },
    onSubmit () {
      // 修改个人信息网络请求
      updateUserInfo(this.editUserInfo).then((res) => {
        console.log(res)
        if (res.status === true) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.userInfo = JSON.parse(JSON.stringify(this.editUserInfo))
        } else {
          this.$message.error('修改失败！')
          console.log(res)
        }
      })
      this.dialogVisible = false
    }
  },
  mounted () {
    getInfo().then(res => {
      if (res.status) {
        var data = res.data[0]
        this.userInfo.avatar = data.avatar
        this.userInfo.nikeName = data.nikeName
        this.userInfo.phone = data.phone
        this.userInfo.email = data.email
        this.userInfo.sex = data.sex
      } else {
        this.$message.error('获取信息失败！')
      }
    })
  }
}
</script>

<style scoped>
  #userInfo {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .el-row {
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

  .label {
    text-align: center;
  }

  .grid-txt {
    padding: 20px;
    border-bottom: 1px solid #d9dde1;
    border-radius: 0px;
  }

  .grid-avatar {
    padding: 0px 0px 0px 20px;
    line-height: 60px;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 60px;
    height: 60px;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
