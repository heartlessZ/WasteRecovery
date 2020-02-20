<template>
  <div id="wallet">
    <div class="balance-container">
      <div class="title-box">
        <div>
          <p class="title">当前余额</p>
          <button class="btn">提现</button>
          <button class="btn">立即充值</button>
        </div>
        <div>
          <p class="charge">￥0.00</p>
        </div>
      </div>
      <div class="list-box">
        <div style="width: 100%;height: 100px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  @media only screen and (max-width: 540px) {
    .title-box {
      background-image: linear-gradient(90deg, #f9662d 0, #f01414 100%);
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
      color: #f20d0d;
      line-height: 16px;
      font-weight: 700;
      margin-left: 10px;
    }
    .charge{
      font-size: 24px;
    }
  }

  @media only screen and (min-width: 540px) {
    #wallet {
      padding: 30px;
    }

    .title-box {
      background-image: linear-gradient(90deg, #f9662d 0, #f01414 100%);
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
      color: #f20d0d;
      line-height: 24px;
      font-weight: 700;
      margin-left: 10px;
    }
    .charge{
      font-size: 32px;
    }
  }

  .balance-container {
    padding-bottom: 11px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1);
    border-radius: 12px;
    height: 400px;
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
</style>
