<template>
  <section id="portfolios" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">废品回收</h2>
        <hr class="lines" />
      </div>
      <el-tabs tab-position="top">
        <el-tab-pane label="发布新订单">
          <div class="row recycle-form">
            <el-form
              ref="form"
              class="recycle-form-child"
              :model="form"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item label="废品图片" required>
                <upload-img :limit="limit" @getimageurl="getImageUrl"></upload-img>
              </el-form-item>
              <el-form-item label="废品类别" prop="classificationId">
                <el-select v-model="form.classificationId" placeholder="请选择废品类别">
                  <el-option
                    v-for="category in $store.getters.childrenCategories"
                    :key="category.id"
                    :label="category.tradeName"
                    :value="category.id"
                  >{{category.tradeName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="家庭住址" required>
                <amap @getposition="getPosition"></amap>
              </el-form-item>
              <el-form-item label="期望价格" prop="expectedPrice">
                <el-input v-model="form.expectedPrice" placeholder="请选择期望价格"></el-input>
              </el-form-item>
              <el-form-item label="重量" prop="weight">
                <el-input v-model="form.weight" placeholder="请输入重量"></el-input>
              </el-form-item>
              <el-form-item label="废品描述" prop="describe">
                <el-input
                  type="textarea"
                  v-model="form.describe"
                  placeholder="请输入废品描述"
                  :rows="3"
                  maxlength="100"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="recycle-form-btn">
                  <el-button
                    type="primary"
                    @click="onSubmit('form')"
                    round
                    v-loading="loading"
                    style="justify-content: center;"
                  >发布订单</el-button>
                  <!-- <el-button type="default" @click="reset" round>重置</el-button> -->
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上门分类">
          <div class="row recycle-form">
            <el-form
              ref="form2"
              class="recycle-form-child"
              :model="form2"
              :rules="rules2"
              label-width="80px"
            >
              <el-form-item label="家庭住址" required>
                <el-input v-model="form2.address" placeholder="请选择家庭住址"></el-input>
              </el-form-item>
              <el-form-item label="服务类别" prop="visitclassificationId" required>
                <el-select v-model="form2.visitclassificationId" placeholder="请选择废品类别">
                  <el-option
                    v-for="category in visitCategories"
                    :key="category.id"
                    :label="category.classificationName"
                    :value="category.id"
                  >{{category.classificationName}}<div style="width:50px;float:right;">{{category.money}}</div></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="recycle-form-btn">
                  <el-button
                    type="primary"
                    @click="onSubmit2('form2')"
                    round
                    v-loading="loading2"
                    style="justify-content: center;"
                  >确认订购</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    
  </section>
</template>

<script>
import Amap from "./RecycleForm/Amap";
import UploadImg from "./RecycleForm/UploadImg";
import {visitClassfication, visitCreate} from '../../api/user'
import { releaseOrder } from "../../api/user";
export default {
  name: "recycle-form",
  components: {
    Amap,
    UploadImg
  },
  data() {
    var checkNum = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error("年龄不能为空"));
      // }
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(value) || regNeg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入数字值"));
      }
    };
    return {
      limit: 1,
      loading: false,
      loading2:false,
      visitCategories:[],
      form: {
        address: "",
        classificationId: undefined,
        describe: "",
        expectedPrice: "",
        latitude: "",
        longitude: "",
        photos: "",
        weight: ""
      },
      form2: {
        address: "",
        visitclassificationId: undefined
      },
      rules: {
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "请输入重量", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        expectedPrice: [
          { required: true, message: "请输入期望价格", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        classificationId: [
          { required: true, message: "请选择分类", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "请输入废品描述", trigger: "blur" }
        ]
      },
      rules2: {
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        visitclassificationId: [
          { required: true, message: "请选择服务类型", trigger: "blur" }
        ]
      },
      queryClassificationId: undefined,
      childrenCategories: []
    };
  },
  methods: {
    getPosition(address, point) {
      this.form.address = address;
      this.form.longitude = String(point.lng);
      this.form.latitude = String(point.lat);
    },
    getImageUrl(urls) {
      // console.log(urls);
      this.form.photos = urls[0];
    },
    onSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        // if (valid) {
        //   alert('submit!');
        // } else {
        //   console.log('error submit!!');
        //   return false;
        // }
        this.loading = false;
        if (!valid) {
          return false;
        }
      });
      if (!this.$store.getters.isLogin) {
        const h = this.$createElement;
        this.$message({
          type: "error",
          offset: 70,
          center: true,
          message: "请先登录！"
        });
        return;
      }
      if (this.form.address.trim() == "") {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: "请填写详细地址，精确到门牌号。"
        });
        return;
      }
      if (this.form.photos.trim() == "") {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: "请上传一张废品的现场图片。"
        });
        return;
      }
      if (this.form.classificationId == undefined) {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: "请选择分类"
        });
        return;
      }
      releaseOrder(this.form)
        .then(res => {
          this.loading = false;
          if (res.status) {
            this.$notify({
              title: "操作提示",
              message: "发布订单成功",
              type: "success",
              offset: 70
            });
            this.form.weight = "";
            this.form.describe = "";
            this.form.expectedPrice = "";
            this.form.classificationId = undefined;
          } else {
            this.$message({
              type: "warning",
              offset: 70,
              center: true,
              message: "发布信息失败，请稍后重试"
            });
          }
        })
        .catch(error => {
          // console.log(error);
          this.loading = false;
        });
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
    },
    onSubmit2(formName) {
      this.loading2 = true;
      this.$refs[formName].validate(valid => {
        // if (valid) {
        //   alert('submit!');
        // } else {
        //   console.log('error submit!!');
        //   return false;
        // }
        this.loading2 = false;
        if (!valid) {
          return
        }
      });
      
      if (this.form2.address.trim() == "") {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: "请填写详细地址，精确到门牌号。"
        });
        return;
      }
      if (!this.$store.getters.isLogin) {
        const h = this.$createElement;
        this.$message({
          type: "error",
          offset: 70,
          center: true,
          message: "请先登录！"
        });
        return;
      }
      
      visitCreate(this.form2)
        .then(res => {
          this.loading2 = false;
          if (res.status) {
            this.$notify({
              title: "操作提示",
              message: "订购服务成功",
              type: "success",
              offset: 70
            });
            // this.form2.address = "";
            // this.form2.visitclassificationId = undefined;
          } else {
            this.$message({
              type: "warning",
              offset: 70,
              center: true,
              message: res.msg
            });
          }
        })
        .catch(error => {
          this.loading2 = false;
        });
    },
    reset() {},
    loadCategory() {
      this.$store.dispatch("QueryChildrenCategory").then(res => {});
      visitClassfication().then(res=>{
        if(res.status)
          this.visitCategories = res.data
      })
    }
  },
  mounted() {
    this.loadCategory();
  }
};
</script>

<style scoped>
.recycle-form,
.recycle-form-btn {
  justify-content: center;
  width: 100%;
  margin: 20px;
}
.recycle-form-child {
  width: 80%;
}
</style>
