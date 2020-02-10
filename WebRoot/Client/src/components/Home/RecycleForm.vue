<template>
  <section id="portfolios" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">废品回收</h2>
        <hr class="lines" />
      </div>
      <div class="row recycle-form">
        <el-form ref="form" class="recycle-form-child" :model="form" label-width="80px">
          <el-form-item label="废品图片">
            <upload-img @getimageurl="getImageUrl"></upload-img>
          </el-form-item>
          <el-form-item label="废品类别">
            <el-select v-model="form.classificationId" placeholder="请选择废品类别">
              <!-- <el-option :v-for="category in categories" :label="category.classificationName" :value="category.id" selected>废纸</el-option> -->
              <el-option label="废纸" value="0" selected>废纸</el-option>
              <el-option label="金属" value="1">金属</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭住址">
            <amap @getposition="getPosition"></amap>
          </el-form-item>
          <el-form-item label="期望价格" prop="expectedPrice">
            <el-input v-model.number="form.expectedPrice" placeholder="请选择期望价格"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-input v-model.number="form.weight" placeholder="请输入重量"></el-input>
          </el-form-item>
          <el-form-item label="废品描述">
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
                style="justify-content: center;"
              >发布订单</el-button>
              <!-- <el-button type="default" @click="reset" round>重置</el-button> -->
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import Amap from "./RecycleForm/Amap";
import UploadImg from "./RecycleForm/UploadImg";
export default {
  name: "recycle-form",
  components: {
    Amap,
    UploadImg
  },
  data() {
    return {
      form: {
        address: "",
        classificationId: undefined,
        describe: "",
        expectedPrice: "",
        latitude: "",
        longitude: "",
        photos: "",
        regionId: "",
        userId: "",
        weight: ""
      },
      rules: {
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      queryClassificationId: undefined,
      categories: []
    };
  },
  methods: {
    getPosition(address, point) {
      this.form.address = address;
      this.form.longitude = point.lng;
      this.form.latitude = point.lat;
    },
    getImageUrl(url) {
      //console.log(url);
      this.form.photos = url;
    },
    onSubmit() {
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
      //填充数据
      this.form.regionId = this.$store.getters.regionId;
      this.form.userId = this.$store.getters.userId;
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
    },
    reset() {},
    loadCategory() {
      this.$store
        .dispatch("QueryRootCategory", this.queryClassificationId)
        .then(res => {
          if (res.status) {
            this.categories = res.records;
            console.log(res.records);
          }
        });
    }
  },
  created() {
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