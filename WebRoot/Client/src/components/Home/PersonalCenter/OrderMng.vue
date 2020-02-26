<template>
  <div id="orderMng">
    <div class="the-title">
      <h2>我的订单</h2>
      <span class="line">|</span>
      <ul>
        <li v-for="(item,index) in titles" @click="setSate(item.state,index)"  :class="{action:index==current}" :key="item.state">
          <span v-text="item.title" class="color"></span>
        </li>
      </ul>
    </div>
    <div class="contain">
      <v-order-list :state="curState" :index="curClick"></v-order-list>
    </div>
  </div>
</template>

<script>
import OrderList from './order/OrderList.vue'
export default {
  name: 'orderMng',
  components: {
    'v-order-list': OrderList
  },
  data () {
    return {
      titles: [{
        state: 0,
        title: '未接单'
      },
      {
        state: 1,
        title: '进行中'
      },
      {
        state: 2,
        title: '已完成'
      },
      {
        state: 3,
        title: '已取消'
      }
      ],
      curClick: 0,
      curState: 0,
      current: 0
    }
  },
  methods: {
    addClass (index) {
      this.current = index
    },
    setSate (state, index) {
      this.curState = state
      this.curClick = index
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
  .color{
    color: #000000;
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

  .action span {
    color: #ffffff;
  }

  .action span:hover {
    color: #ffffff;
  }

  ul li span {
    color: #5e5e5e;
  }

  ul li span:hover {
    color: #61d2b4;
  }

  .contain {
    width: 100%;
    min-height: 636px;
  }
</style>
