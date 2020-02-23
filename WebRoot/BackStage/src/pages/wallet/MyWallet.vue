<template>
  <div id="wallet">
    <div class="balance-container">
      <div class="title-box">
        <div>
          <p class="title">当前余额</p>
          <button class="btn" @click="withdrawDialogVisible = true">提现</button>
          <button class="btn" @click="rechargeDialogVisible = true">充值</button>
        </div>
        <div>
          <p class="charge">￥{{balance}}</p>
          <div style="padding-top:20px;float: right;">
            <el-link :underline="false" type="warning" class="records-txt" style="color: #FFFFFF;" @click="onRechargeRecord()">充值记录</el-link>
            <el-link :underline="false" type="warning" class="records-txt" style="color: #FFFFFF;" @click="onWithdrawRecord()">提现记录</el-link>
          </div>
        </div>
      </div>
      <div class="list-box">
        <div v-if="recordsStatus==1">
          <p style="text-align: right;padding-right: 26px;font-size: 14px;">充值记录</p>
          <el-table :data="rechargeRecords" style="width: 100%;">
            <el-table-column prop="createTime" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="totalAmount" label="金额" width="180">
              <template slot-scope="scope">
                <span>￥{{scope.row.totalAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="subject" label="操作" width="180">
            </el-table-column>
            <el-table-column prop="body" label="备注">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <p style="text-align: right;padding-right: 26px;font-size: 14px;">提现记录</p>
          <el-table :data="withdrawRecords" style="width: 100%;">
            <el-table-column prop="creatTime" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="money" label="金额" width="180">
              <template slot-scope="scope">
                <span>￥{{scope.row.money}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              提现
            </el-table-column>
            <el-table-column label="备注" width="180">
              提现到支付宝
            </el-table-column>
            <el-table-column prop="state" label="提现状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.state==0" type="info" size="mini">审核中</el-button>
                <el-button v-if="scope.row.state==1" type="primary" size="mini">成&nbsp;&nbsp;&nbsp;&nbsp;功</el-button>
                <el-button v-if="scope.row.state==2" type="warning" size="mini">失&nbsp;&nbsp;&nbsp;&nbsp;败</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination layout="prev, pager, next" style="text-align: center;margin-top: 10px;" :total="total"
          :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="钱包充值" :visible.sync="rechargeDialogVisible" width="380px">
      <div class="dialog_contain">
        <p style="font-size: 14px;color: #545c63;">充值金额</p>
        <div style="margin: 16px 0px;">
          <el-radio-group v-model="rechargeForm.money" class="radios" @change="onRadioChange">
            <el-radio label="300" border>￥300</el-radio>
            <el-radio label="500" border>￥500</el-radio>
            <el-radio label="1000" border>￥1000</el-radio>
          </el-radio-group>
          <el-input type="number" maxlength="5" placeholder="其他金额,请输入1-50000的整数" v-model.number="rechargeForm.imoney"
            clearable style="margin-top: 16px;" @input="onInput(rechargeForm.imoney)">
            <span slot="prefix" class="el-input__icon">￥</span>
          </el-input>
        </div>
        <p>支付方式</p>
        <div style="margin: 10px 0px;">
          <el-radio-group v-model="rechargeForm.payWay">
            <el-radio-button border label="1"><img src="../../../static/img/alipay_balance.png" style="width: 128px;height: 26px;"></el-radio-button>
            <el-radio-button border label="2" disabled><img src="../../../static/img/wxpay_balance.png" style="width: 128px;height: 26px;"></el-radio-button>
          </el-radio-group>
        </div>
        <el-button type="primary" size="medium" round class="recharge-btn" @click="onRecharge">立即充值</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提现" :visible.sync="withdrawDialogVisible" width="380px">
      <el-form :model="withdrawForm" :rules="withdrawRules" ref="withdrawForm" label-width="70px">
        <el-form-item label="提现金额" prop="money" type="number">
          <el-input v-model.number="withdrawForm.money" placeholder="请输入1-50000的整数" clearable></el-input>
        </el-form-item>
        <el-form-item label="提现账户" prop="account">
          <el-input v-model="withdrawForm.account" placeholder="请输入要提现到的账号" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="medium" round class="recharge-btn" @click="onWithdraw">立即提现</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {
    recharge,
    withdrawal,
    userSelRechargeRecord,
    userSelWithdrawRecord
  } from '@/api/wallet.js'
  export default {
    data() {
      const checkMoney = (rule, value, callback) => {
        if (value < 1) {
          this.$message.error('提现金额不能小于等于0')
        } else if (value > this.balance) {
          this.$message.error('提现金额大于钱包余额')
        } else {
          callback()
        }
      }
      const checkAccount = (rule, value, callback) => {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          this.$message.error('账户格式不对')
        } else {
          callback()
        }
      }
      return {
        rechargeDialogVisible: false,
        withdrawDialogVisible: false,
        rechargeForm: {
          money: '300',
          imoney: null,
          payWay: '1',
        },
        withdrawForm: {
          money: null,
          account: null
        },
        balance: '0.00',
        withdrawRules: {
          money: [{
            validator: checkMoney,
            trigger: 'blur'
          }],
          account: [{
            validator: checkAccount,
            trigger: 'blur'
          }]
        },
        //充值记录列表
        rechargeRecords: [{
          createTime: null,
          totalAmount: null,
          subject: null,
          body: null
        }],
        //提现记录列表
        withdrawRecords: [{
          creatTime: null,
          money: null,
          state: null
        }],
        //记录状态 1代表充值记录，2代表提现记录
        recordsStatus: 1,
        pageInfo: {
          pageNum: 1,
          pageSize: 5
        },
        total: 0
      }
    },
    methods: {
      onInput(value) {
        if (value < 1 || value > 50000) {
          this.rechargeForm.imoney = null
          this.rechargeForm.money = '300'
        } else {
          this.rechargeForm.money = null
        }
      },
      onRadioChange() {
        this.rechargeForm.imoney = null
      },
      //充值记录或提现记录网络请求方法
      requestRecordData() {
        if (this.recordsStatus == 1) {
          //充值记录
          userSelRechargeRecord(this.pageInfo).then((res) => {
            if (res.status) {
              this.rechargeRecords = res.records
              this.total = res.total
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          //提现记录
          userSelWithdrawRecord(this.pageInfo).then((res) => {
            if (res.status) {
              this.withdrawRecords = res.records
              this.total = res.total
              console.log(res.records)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      //立即充值按钮事件
      onRecharge() {
        this.rechargeDialogVisible = false
        var money
        if (this.rechargeForm.imoney != null) {
          money = this.rechargeForm.imoney
        } else {
          money = this.rechargeForm.money
        }
        window.open('http://safeclean.tx-q.cn:4399/alipay/goAlipay?money=' + money, 'about:blank')
        this.rechargeForm.money = '300'
        this.rechargeForm.imoney = null
      },
      //立即提现按钮事件
      onWithdraw() {
        this.$refs.withdrawForm.validate(valid => {
          this.withdrawDialogVisible = false
          if (valid) {
            withdrawal(this.withdrawForm.money).then((res) => {
              if (res.status) {
                this.$store.dispatch("GetInfo").then((res) => {
                  if (res.status) {
                    this.balance = this.$store.getters.userInfo.balance
                  }
                })
                this.$message({
                  message: '成功，等待审核！',
                  type: 'success'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
            this.withdrawForm.money = null
            this.withdrawForm.account = null
          }
        })
      },
      //充值记录按钮点击事件
      onRechargeRecord() {
        this.recordsStatus = 1
        this.pageInfo.pageNum = 1
        this.requestRecordData()
      },
      //提现记录按钮点击事件
      onWithdrawRecord() {
        this.recordsStatus = 2
        this.pageInfo.pageNum = 1
        this.requestRecordData()
      },
      //当前页改变调用函数
      pageCurrentChange(val) {
        this.pageInfo.pageNum = val
        this.requestRecordData()
      }
    },
    mounted() {
      //调用获取个人信息刷新钱包金额
      this.requestRecordData()
      this.$store.dispatch("GetInfo").then((res) => {
        if (res.status) {
          this.balance = this.$store.getters.userInfo.balance
        }
      })
    }
  }
</script>

<style scoped>
  @media only screen and (max-width: 540px) {
    .title-box {
      background-image: linear-gradient(90deg, #64ffda 0, #81DBC3 100%);
      /* linear-gradient(90deg, #f9662d 0, #f01414 100%); */
      border-radius: 12px 12px 0 0;
      width: 100%;
      height: 150px;
      padding: 28px 10px;
      box-sizing: border-box;
    }

    .list-box {
      padding: 10px 10px 11px;
      background: #fff;
    }

    .balance-container .title-box .btn {
      float: right;
      background: #fff;
      border-radius: 24px;
      padding: 10px 25px;
      font-size: 14px;
      color: #81DBC3;
      line-height: 16px;
      font-weight: 700;
      margin-left: 10px;
    }

    .charge {
      font-size: 24px;
    }

    .records-txt {
      margin: 0 12px;
    }
  }

  @media only screen and (min-width: 540px) {
    #wallet {
      padding: 30px 30px 10px 30px;
    }

    .title-box {
      background-image: linear-gradient(90deg, #64ffda 0, #81DBC3 100%);
      border-radius: 12px 12px 0 0;
      width: 100%;
      height: 150px;
      padding: 28px 32px;
      box-sizing: border-box;
    }

    .list-box {
      padding: 10px 32px 11px;
      background: #fff;
    }

    .balance-container .title-box .btn {
      float: right;
      background: #fff;
      border-radius: 24px;
      padding: 12px 36px;
      font-size: 16px;
      color: #81DBC3;
      line-height: 24px;
      font-weight: 700;
      margin-left: 10px;
    }

    .charge {
      font-size: 32px;
    }

    .records-txt {
      margin: 0 26px;
    }
  }

  .balance-container {
    padding-bottom: 11px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1);
    border-radius: 12px;
    min-height: 400px;
  }

  .balance-container .title-box div {
    overflow: hidden;
  }

  .balance-container .title-box .title {
    font-size: 16px;
    color: #fff;
    float: left;
  }

  .balance-container .title-box .charge {
    float: left;
    position: relative;
    left: -5px;
    color: #fff;
  }

  button {
    overflow: visible;
    border: none;
    -webkit-appearance: button;
    cursor: pointer;
    text-transform: none;
    outline: none;
  }

  .radios {
    display: flex;
    justify-content: space-between;
  }

  .radios .el-radio {
    margin: 0px;
  }

  .el-radio-group {
    width: 100%;
  }

  .recharge-btn {
    width: 100%;
    margin-top: 10px;
    height: 45px;
    border-radius: 25px;
  }
</style>
