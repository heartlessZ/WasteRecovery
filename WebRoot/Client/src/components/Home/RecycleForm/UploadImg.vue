<template>
  <div>
    <!-- https://jsonplaceholder.typicode.com/posts/ -->
    <el-upload
      action="http://49.235.151.230:8091/file/imgUpdate"
      list-type="picture-card"
      :limit="5"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "upload-img",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleChange(file, fileList) {
      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      this.$emit("getimageurl", response.data.imgurl);
    }
  }
};
</script>