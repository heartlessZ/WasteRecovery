<template>
  <div>
    <!-- https://jsonplaceholder.typicode.com/posts/ -->
    <el-upload
      :action="baseURL"
      list-type="picture-card"
      :limit="limit"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :with-credentials="true"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import request from '../../../utils/request'
export default {
  name: "upload-img",
  props: ['limit'],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      baseURL:request.defaults.baseURL + '/img/update'
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
      
      console.log(response)
      let urls = []
      fileList.forEach(item => {
        urls.push(item.response.imgurl)
      });
      // console.log(urls)
      this.$emit("getimageurl", urls);
    }
  },
  mounted(){
  }
};
</script>
