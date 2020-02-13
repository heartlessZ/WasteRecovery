<template>
  <div id="orderMng">
    <div class="the-title">
      <h2>我的订单</h2>
      <span class="line">|</span>
      <ul>
        <li v-for="(item,index) in titles" @click="addClass(index)" :class="{action:index==current}">
          <router-link :to="'/home/personal-center/order-mng/order-list/'+item.status" v-text="item.title"></router-link>
        </li>
      </ul>
    </div>
    <div class="contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderMng',
  data () {
    return {
      titles: [{
        status: 0,
        title: '未接单'
      }, {
        status: 1,
        title: '已接单'
      }, {
        status: 2,
        title: '已完成'
      }, {
        status: 3,
        title: '已取消'
      }],
      current: 0
    }
  },
  methods: {
    addClass (index) {
      this.current = index
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

  .the-title {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    margin-bottom: 24px;
  }

  .line {
    font-size: 1rem;
    height: 32px;
    line-height: 32px;
    color: #d9dde1;
    margin: 0px 30px;
  }

  ul {
    width: 400px;
    height: 32px;
    list-style-type: none;
    display: flex;
  }

  h2 {
    height: 32px;
    font-size: 1rem;
    line-height: 32px;
    margin: 0;
  }

  ul li {
    flex: 1 1 auto;
    text-align: center;
    line-height: 32px;
  }

  .action {
    background: #4d555d;
    border-radius: 16px;
  }

  .action a {
    color: #FFFFFF;
  }

  .action a:hover {
    color: #FFFFFF;
  }

  ul li a {
    color: #5e5e5e;
  }

  ul li a:hover {
    color: #61D2B4;
  }

  .contain {
    width: 100%;
    min-height: 500px;
  }
</style>
