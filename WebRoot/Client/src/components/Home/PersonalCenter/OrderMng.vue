<template>
  <div id="orderMng">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('OrderMng.myorder')" name="first">
        <v-my-order></v-my-order>
      </el-tab-pane>
      <el-tab-pane :label="$t('OrderMng.visitService')" name="second">
         <v-vist-service></v-vist-service>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyOrder from './order/MyOrder.vue'
import VistService from './order/VisitService.vue'
export default {
  name: 'orderMng',
  components: {
    'v-my-order': MyOrder,
    'v-vist-service': VistService
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab)
    }
  }
}
</script>

<style scoped>
  #orderMng {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
</style>
