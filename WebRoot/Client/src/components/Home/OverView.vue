<template>
  <div>
      <!-- 简介 -->
    <intro></intro>

    <!-- 今日废品价格 -->
    <recycle-news></recycle-news>

    <!-- 废品回收表单 -->
    <recycle-form></recycle-form>

    <router-view/>

    <!-- 联系我们 -->
    <contact></contact>
  </div>
</template>

<script>
import RecycleNews from './RecycleNews'
import RecycleForm from './RecycleForm'
import Contact from './Contact'
import Intro from './Intro'
export default {
  name: 'overview',
  components:{
    RecycleNews,
    RecycleForm,
    Contact,
    Intro
  },
  created(){
    $("#hero-area").removeClass("limit-h")
  }
}
</script>