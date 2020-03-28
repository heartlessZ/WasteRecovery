<template>
  <section id="portfolios" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{$t('RecycleForm.title')}}</h2>
        <hr class="lines" />
      </div>
      <el-tabs tab-position="top">
        <el-tab-pane :label="$t('RecycleForm.neworder')">
          <div class="row recycle-form">
            <el-form
              ref="form"
              class="recycle-form-child"
              :model="form"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item :label="$t('RecycleForm.Wastepic')" required>
                <upload-img :limit="limit" @getimageurl="getImageUrl"></upload-img>
              </el-form-item>
              <el-form-item :label="$t('RecycleForm.category')" prop="classificationId">
                <el-select
                  v-model="form.classificationId"
                  :placeholder="$t('RecycleForm.inputcategory')"
                >
                  <el-option
                    v-for="category in $store.getters.childrenCategories"
                    :key="category.id"
                    :label="category.tradeName"
                    :value="category.id"
                  >{{category.tradeName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('RecycleForm.home')" required>
                <amap @getposition="getPosition"></amap>
              </el-form-item>
              <el-form-item :label="$t('RecycleForm.price')" prop="expectedPrice">
                <el-input v-model="form.expectedPrice" :placeholder="$t('RecycleForm.inputprice')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('RecycleForm.weight')" prop="weight">
                <el-input v-model="form.weight" :placeholder="$t('RecycleForm.inputweight')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('RecycleForm.describe')" prop="describe">
                <el-input
                  type="textarea"
                  v-model="form.describe"
                  :placeholder="$t('RecycleForm.inputdescribe')"
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
                  >{{$t('RecycleForm.Release')}}</el-button>
                  <!-- <el-button type="default" @click="reset" round>重置</el-button> -->
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('RecycleForm.visit')">
          <div class="row recycle-form">
            <el-form
              ref="form2"
              class="recycle-form-child"
              :model="form2"
              :rules="rules2"
              label-width="80px"
            >
              <el-form-item :label="$t('RecycleForm.home')" required>
                <el-input
                  v-model="form2.address"
                  :placeholder="$t('RecycleForm.inputadress')"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('RecycleForm.category')"
                prop="visitclassificationId"
                required
              >
                <el-select
                  v-model="form2.visitclassificationId"
                  :placeholder="$t('RecycleForm.inputcategory')"
                >
                  <el-option
                    v-for="category in visitCategories"
                    :key="category.id"
                    :label="category.classificationName"
                    :value="category.id"
                  >
                    {{category.classificationName}}
                    <div style="width:50px;float:right;">{{category.money}}</div>
                  </el-option>
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
                  >{{$t('RecycleForm.okpay')}}</el-button>

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
import { visitClassfication, visitCreate } from "../../api/user";
import { releaseOrder } from "../../api/user";
import request from "../../utils/request";
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
        callback(new Error(this.$t("RecycleForm.inputweight")));
      }
    };
    return {
      limit: 1,
      loading: false,
      loading2: false,
      visitCategories: [],
      form: {
        address: "",
        classificationId: undefined,
        describe: "",
        expectedPrice: "",
        latitude: "",
        longitude: "",
        photos: "",
        weight: 0
      },
      form2: {
        address: "",
        visitclassificationId: undefined
      },
      rules: {
        address: [
          {
            required: true,
            message: this.$t("RecycleForm.inputaddress"),
            trigger: "blur"
          }
        ],
        weight: [
          {
            required: true,
            message: this.$t("RecycleForm.inputweight"),
            trigger: "blur"
          },
          { validator: checkNum, trigger: "blur" }
        ],
        expectedPrice: [
          {
            required: true,
            message: this.$t("RecycleForm.inputprice"),
            trigger: "blur"
          },
          { validator: checkNum, trigger: "blur" }
        ],
        
        describe: [
          {
            required: true,
            message: this.$t("RecycleForm.inputdescribe"),
            trigger: "blur"
          }
        ]
      },
      rules2: {
        address: [
          {
            required: true,
            message: this.$t("RecycleForm.inputaddress"),
            trigger: "blur"
          }
        ],
        visitclassificationId: [
          {
            required: true,
            message: this.$t("RecycleForm.servicetype"),
            trigger: "blur"
          }
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
          message: this.$t("base.loginerroe")
        });
        return;
      }
      if (this.form.address.trim() == "") {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: this.$t("RecycleForm.inputadress")
        });
        return;
      }
      if (this.form.photos.trim() == "") {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: this.$t("RecycleForm.inputpic")
        });
        return;
      }
      if (this.form.classificationId == undefined) {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: this.$t("RecycleForm.seletecategory")
        });
        return;
      }
          this.form.weight = Number(this.form.weight)
      releaseOrder(this.form)
        .then(res => {
          this.loading = false;
          if (res.status) {
            this.$notify({
              title: this.$t("RecycleForm.msg"),
              message: res.msg,
              type: "success",
              offset: 70
            });
            this.form.weight = 0;
            this.form.describe = "";
            this.form.expectedPrice = "";
            this.form.classificationId = undefined;
            this.loadData();
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
          return;
        }
      });

      if (this.form2.address.trim() == "") {
        this.$message({
          type: "warning",
          offset: 70,
          center: true,
          message: this.$t("RecycleForm.inputadress")
        });
        return;
      }
      if (!this.$store.getters.isLogin) {
        const h = this.$createElement;
        this.$message({
          type: "error",
          offset: 70,
          center: true,
          message: this.$t("base.loginerroe")
        });
        return;
      }
      visitCreate(this.form2)
        .then(res => {
          this.loading2 = false;
          if (res.status) {
            this.$notify({
              title: this.$t("RecycleForm.msg"),
              message: res.msg,
              type: "success",
              offset: 70
            });
            // this.form2.address = "";
            // this.form2.visitclassificationId = undefined;
          } else {
            this.$message({
              type: "error",
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

  },
  mounted() {
    this.$store.dispatch("QueryChildrenCategory").then(res => {});
    visitClassfication().then(res => {
      if (res.status) this.visitCategories = res.data;
    });
    this.loadData();
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
