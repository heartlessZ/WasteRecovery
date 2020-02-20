<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
        <el-button style="float: right; padding: 3px 0" type="text" >编辑个人信息</el-button>
      </div>
      <div class="text item">
          
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    min-height: 500px;
  }
</style>