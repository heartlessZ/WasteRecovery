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
              <el-option label="废纸" value="0" selected>废纸</el-option>
              <el-option label="金属" value="1">金属</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭住址">
            <amap @getposition="getPosition"></amap>
          </el-form-item>
          <el-form-item label="期望价格" prop="expectedPrice">
            <el-input v-model.number="form.expectedPrice"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-input v-model.number="form.weight"></el-input>
          </el-form-item>
          <el-form-item label="废品描述">
            <el-input type="textarea" v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="recycle-form-btn">
              <button class="btn btn-common" @click="onSubmit" type="default">发布订单</button>
              <!-- <el-button type="success" @click="onSubmit" round>发布订单</el-button> -->
              <el-button type="default" @click="reset" round>重置</el-button>
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
        classificationId: 0,
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
        
      }
    };
  },
  methods: {
    getPosition(address, point) {
      this.form.address = address;
      this.form.longitude = point.lng;
      this.form.latitude = point.lat;
    },
    getImageUrl(url) {
      console.log(url);
      this.form.photos = url;
    },
    onSubmit() {
      console.log(this.form);
    },
    reset() {}
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