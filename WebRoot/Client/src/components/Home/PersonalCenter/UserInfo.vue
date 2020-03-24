<template>
  <div id="userInfo">
    <div class="title">
      {{$t('UserInfo.title')}}
      <el-link
        icon="el-icon-edit"
        style="color: #000000;float: right;"
        :underline="false"
        @click="dialogVisible = true"
      >{{$t('UserInfo.edit')}}</el-link>
    </div>
    <el-divider class="line-style"></el-divider>
    <div class="contain">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">{{$t('UserInfo.Headportrait')}}</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-avatar">
            <el-avatar :size="50" :src="userInfo.avatar"></el-avatar>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">{{$t('UserInfo.nickName')}}</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.nikeName"></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">{{$t('UserInfo.Gender')}}</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-if="userInfo.sex==0">{{$t('UserInfo.man')}}</div>
          <div class="grid-content grid-txt" v-if="userInfo.sex==1">{{$t('UserInfo.girl')}}</div>
          <div class="grid-content grid-txt" v-if="userInfo.sex==2">{{$t('UserInfo.secrecy')}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">{{$t('UserInfo.phone')}}</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.phone"></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">{{$t('UserInfo.email')}}</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content grid-txt" v-text="userInfo.email"></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple label">{{$t('UserInfo.balance')}}</div>
        </el-col>
        <el-col :span="20">
          <div style="width:100px;float:right;">
            <el-button type="primary" @click="rechargeDialogVisible = true">{{$t('UserInfo.pay')}}</el-button>
          </div>
          <div class="grid-content grid-txt" v-text="userInfo.balance"></div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="$t('UserInfo.editInfo')" :visible.sync="dialogVisible" width="400px" @open="dialogOpen()">
      <el-form label-width="100px" :model="editUserInfo">
        <el-form-item :label="$t('UserInfo.Headportrait')">
          <el-upload
            class="avatar-uploader"
            action="http://49.235.151.230:8091/file/imgUpdate"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="editUserInfo.avatar" :src="editUserInfo.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('UserInfo.nickName')">
          <el-input v-model="editUserInfo.nikeName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('UserInfo.Gender')">
          <el-radio-group v-model="editUserInfo.sex">
            <el-radio label="0">{{$t('UserInfo.man')}}</el-radio>
            <el-radio label="1">{{$t('UserInfo.girl')}}</el-radio>
            <el-radio label="2">{{$t('UserInfo.secrecy')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('UserInfo.cancel')}}</el-button>
        <el-button type="primary" @click="onSubmit()">{{$t('UserInfo.Confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('UserInfo.balancepay')" :visible.sync="rechargeDialogVisible" width="380px">
      <div class="dialog_contain">
        <p style="font-size: 14px;color: #545c63;">{{$t('UserInfo.paymong')}}</p>
        <div style="margin: 16px 0px;">
          <el-radio-group v-model="rechargeForm.money" class="radios" @change="onRadioChange">
            <el-radio label="300" border>￥300</el-radio>
            <el-radio label="500" border>￥500</el-radio>
            <el-radio label="1000" border>￥1000</el-radio>
          </el-radio-group>
          <el-input
            type="number"
            maxlength="5"
            :placeholder="$t('UserInfo.paymsg')"
            v-model.number="rechargeForm.imoney"
            clearable
            style="margin-top: 16px;"
            @input="onInput(rechargeForm.imoney)"
          >
            <span slot="prefix" class="el-input__icon">￥</span>
          </el-input>
        </div>
        <p>{{$t('UserInfo.payway')}}</p>
        <div style="margin: 10px 0px;">
          <el-radio-group v-model="rechargeForm.payWay">
            <el-radio-button border label="1">
              <img src="../../../../static/img/alipay_balance.png" style="width: 128px;height: 26px;" />
            </el-radio-button>
            <el-radio-button border label="2" disabled>
              <img src="../../../../static/img/wxpay_balance.png" style="width: 128px;height: 26px;" />
            </el-radio-button>
          </el-radio-group>
        </div>
        <el-button type="primary" size="medium" round class="recharge-btn" @click="recharge">{{$t('UserInfo.topay')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadImg from "../RecycleForm/UploadImg";
import { getInfo, updateUserInfo } from "@/api/user";
export default {
  name: "userInfo",
  components: {
    UploadImg
  },
  data() {
    return {
      rechargeDialogVisible: false,
      rechargeForm: {
        money: "300",
        imoney: null,
        payWay: "1"
      },
      userInfo: {
        avatar: "",
        nikeName: "",
        email: "",
        phone: "",
        sex: "2",
        balance: ""
      },
      editUserInfo: {},
      dialogVisible: false
    };
  },
  methods: {
    onRadioChange() {
      this.rechargeForm.imoney = null;
    },
    recharge() {
      this.rechargeDialogVisible = false;
      var money;
      if (this.rechargeForm.imoney != null) {
        money = this.rechargeForm.imoney;
      } else {
        money = this.rechargeForm.money;
      }
      window.open(
        "http://safeclean.tx-q.cn:4399/alipay/goAlipay?money=" + money,
        "about:blank"
      );
      this.rechargeForm.money = "300";
      this.rechargeForm.imoney = null;
    },
    handleAvatarSuccess(res, file) {
      if (res.status) {
        this.editUserInfo.avatar = res.data.imgurl;
      } else {
        this.$message.error(this.$t('UserInfo.Headportraiterror'));
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error(this.$t('UserInfo.error'));
      }
      if (!isLt2M) {
        this.$message.error(this.$t('UserInfo.Headportraitlimit'));
      }
      return isJPG && isLt2M;
    },
    // 对话框打开时的回调函数
    dialogOpen() {
      // 类似于克隆对象
      this.editUserInfo = JSON.parse(JSON.stringify(this.userInfo));
    },
    onSubmit() {
      // 修改个人信息网络请求
      updateUserInfo(this.editUserInfo).then(res => {
        // console.log(res)
        if (res.status === true) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.userInfo = JSON.parse(JSON.stringify(this.editUserInfo));
        } else {
          this.$message.error(res.msg);
          console.log(res);
        }
      });
      this.dialogVisible = false;
    }
  },
  mounted() {
    getInfo().then(res => {
      if (res.status) {
        var data = res.data;
        this.userInfo.avatar = data.avatar;
        this.userInfo.nikeName = data.nikeName;
        this.userInfo.phone = data.phone;
        this.userInfo.email = data.email;
        this.userInfo.sex = data.sex;
        this.userInfo.balance = data.balance;
      } else {
        this.$message.error(res.msg);
      }
    });
  }
};
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
  min-height: 635px;
}

.bg-purple {
  background: #f3f5f7;
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
  border-color: #409eff;
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
