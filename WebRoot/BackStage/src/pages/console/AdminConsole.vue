<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-row class="panel-group">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-s-order card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">回收总订单</div>
              <count-to
                :start-val="startval"
                :end-val="recoveryOrderCount"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-row>
        <el-row class="panel-group">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <i class="el-icon-s-order card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">分类总订单</div>
              <count-to
                :start-val="startval"
                :end-val="vistiorderCount"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div id="orderChart" class="chart" style="height: 350px; padding: 20px; padding-left: 80px"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-row class="panel-group">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-bank-card card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">总成交金额</div>
              <count-to
                :start-val="startval"
                :end-val="sunMoney"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div id="sumChart" class="chart" style="height: 350px; padding: 20px; padding-left: 80px"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="5">
        <el-row class="panel-group">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-user-solid card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">商户</div>
              <count-to
                :start-val="startval"
                :end-val="businessTotal"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div id="bunessinChart" class="chart" style="height: 350px; padding: 20px; padding-left: 80px"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import CountTo from 'vue-count-to';
  import request from '../../utils/request'
  import * as api from "../../api";
  export default {
    components: {
      CountTo
    },
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        startval: 0,
        recoveryOrderCount: 0,
        vistiorderCount: 0,
        sunMoney: 0,
        businessTotal: 0,
      }
    },
    mounted() {
      this.getDtata();
    },
    methods: {
      getDtata() {
        request.get(api.ADMIN_CENSUS_ECTARTS).then(res => {
          if (res.status) {
            console.log(res.data)
            this.recoveryOrderCount = res.data.recoveryOrderCount;
            this.vistiorderCount = res.data.vistiorderCount;
            this.sunMoney = res.data.sunMonetTotle;
            this.businessTotal = res.data.businessTotal;
            // 基于准备好的dom，初始化echarts实例
            const orderChart = this.$echarts.init(document.getElementById('orderChart'));
            const sumChart = this.$echarts.init(document.getElementById('sumChart'));
            const bunessinChart = this.$echarts.init(document.getElementById('bunessinChart'));
            // 7日订单
            orderChart.setOption({
              title: {text: '7日订单'},
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['回收订单', '分类订单']
              },
              grid: {
                left: '0%',
                right: '0%',
                bottom: '20%',
                containLabel: true
              },

              xAxis: {
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#666',
                  fontSize: 12,
                  margin: 12
                },
                data: res.data.recoveryorder[0]
              },
              yAxis: {
                name: '订单数',
                type: 'value',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#666',
                  fontSize: 12
                }
              },
              series: [
                {
                  yAxisIndex: 0,
                  color: '#20B2AA',
                  name: '回收订单',
                  type: 'bar',
                  stack: '回收订单',
                  data: res.data.recoveryorder[1]
                },
                {
                  yAxisIndex: 0,
                  name: '分类订单',
                  type: 'bar',
                  stack: '分类订单',
                  color: '#00B5FF',
                  data: res.data.vistiorder[1]
                }
              ]
            });

            // 订单金额走势
            sumChart.setOption({
              title: {text: '7日成交金额'},
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['成交金额']
              },
              grid: {
                left: '0%',
                right: '0%',
                bottom: '20%',
                containLabel: true
              },

              xAxis: {
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#666',
                  fontSize: 12,
                  margin: 12
                },
                data: res.data.sumMoney[0]
              },
              yAxis: {
                name: '订单数',
                type: 'value',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#666',
                  fontSize: 12
                }
              },
              series: [
                {
                  yAxisIndex: 0,
                  color: '#20B2AA',
                  name: '当日成交金额',
                  type: 'line',
                  stack: '当日成交金额',
                  data: res.data.sumMoney[1]
                },
              ]
            });

          }
        })
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 10px;
    background-color: rgb(240, 242, 245);

    .chart-wrapper {
      background: #fff;

    }
  }

  .currentNum {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background-color: #FFFFFF;
    border: 1px solid #e1f3d8;
    padding: 0 10px;
    margin-bottom: 10px;
    color: #909399;
  }

  .panel-group {
    margin-top: 18px;
    padding-left: 30px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shoppingCard {
          background: #34bfa3;
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shoppingCard {
        color: #34bfa3;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 45px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
