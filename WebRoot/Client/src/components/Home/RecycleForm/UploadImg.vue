<template>
  <div>
    <!-- https://jsonplaceholder.typicode.com/posts/ -->
    <el-upload
      action="http://49.235.151.230:8091/file/imgUpdate"
      list-type="picture-card"
      :limit="limit"
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
  props: ['limit'],
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
      let urls = []
      fileList.forEach(item => {
        urls.push(item.response.data.imgurl)
      });
      this.$emit("getimageurl", urls);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(response, file, fileList) {
      let urls = []
      fileList.forEach(item => {
        urls.push(item.response.data.imgurl)
      });
      console.log(urls)
      this.$emit("getimageurl", urls);
    }
  }
};
</script>