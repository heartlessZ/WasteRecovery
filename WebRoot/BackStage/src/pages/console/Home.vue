<template>
  <div>
    <el-row>
      <div class="currentNum">欢迎，{{nikename}},今天是：{{currentTime}}</div>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-row class="panel-group">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-position card-panel-icon"  />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">总访问次数</div>
              <count-to
                :start-val="startval"
                :end-val="countLogin"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div id="countCensus" class="chart" style="height: 350px; padding: 20px; padding-left: 80px"/>
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
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        startval:0,
        countLogin:0,
        nikename:'',
        currentTime: new Date(), // 获取当前时间
      }
    },
    mounted(){
    this.theUser();
      this.getDtata();
      this.beforeDestroy();
    },
    methods: {
      beforeDestroy() {
        let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
          _this.currentTime = new Date(); // 修改数据date
        }, 1000)
      },
      theUser(){
        request.get(api.SYS_USER_THEUSER).then(res=>{
            if(res.status){
             this.nikename = res.data.nikeName;
            }else {

            }
        })
      },
      timeNow () {
        this.currentTime =cmoment().utc().format("YYYY年MM月DD日") + ' ' + moment().utc().format('dddd')
      },
      getDtata(){
        request.get(api.LOGIN_COUNT).then(res=>{
          if(res.status){
            // 基于准备好的dom，初始化echarts实例
            this.countLogin = res.data.logins;
            let countCensus = this.$echarts.init(document.getElementById('countCensus'))
            // 订单
            countCensus.setOption({
              title: { text: '访问平台次数' },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['登录日志']
              },
              grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
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
                data: res.data.recordCount[0]
              },
              yAxis: {
                name: '次数',
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
                  color: '#40c9c6',
                  name: '访问次数',
                  type: 'bar',
                  stack: '访问次数',
                  data: res.data.recordCount[1]
                }
              ]
            });
          }else {
            this.$message.error(res.msg)
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
  .currentNum{
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
