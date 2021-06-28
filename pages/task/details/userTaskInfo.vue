<template>
  <view>
    <view class="tasks">
      <view class="title">
        <text>订单信息</text>
        <text>{{ tasks.entPlan }}</text>
      </view>

      <view class="info">
        <text>{{ tasks.entType }}</text>
        <text>{{ tasks.entData }}</text>
      </view>

      <view class="money">
        <text>{{ tasks.gmtMoney | showMoney }}</text>
      </view>

      <view class="time">
        <view>
          <text>发布时间:</text>
          <text>{{ tasks.gmtCreate }}</text>
        </view>
        <view>
          <text>截止时间:</text>
          <text>{{ tasks.gmtEnd }}</text>
        </view>
        <view>
          <text>发单者:</text>
          <text>{{ tasks.entConsignor }}</text>
        </view>
      </view>
    </view>
    <button size="default" @click="lookOtherTasks">查看其他</button>
  </view>


</template>

<script>
export default {
  data() {
    return {
      tasks: {},
      btn_dis: true
    }
  },
  onLoad(opitons) {
    this.getTaskById(opitons.id)
  },
  methods: {
    getTaskById(id) {
      console.log(id)
      this.$myRequest({
        url: "/toEntrustInfo?id=" + id,
        success: res => {
          console.log(res)
          this.tasks = res.data.entrust
        }
      })
    },
    lookOtherTasks() {
      uni.switchTab({
        url: "/pages/task/task"
      })
    },
  },
  filters: {
    showMoney(money) {
      return "￥" + (money * 1).toFixed(2)
    }
  }
}
</script>

<style lang="scss">
.tasks {

  margin: 30rpx 30rpx;

  .title {

    text:nth-child(2) {
      position: absolute;
      right: 30rpx;
      font-size: 20rpx;
      color: #007AFF;
    }
  }

  .info {
    margin-top: 10rpx;

    text:nth-child(1) {
      width: auto;
      height: 50rpx;
      background: #007AFF;
      text-align: center;
      border-radius: 10rpx;
      padding: 4rpx;
      color: #eee;
      font-size: 25rpx;
      line-height: 25rpx;
    }

    text:nth-child(2) {
      margin-left: 10rpx;
      text-decoration: blink;
    }
  }

  .money {
    margin-top: 20rpx;
    color: #ff0000;
  }

  .time {
    margin-top: 20rpx;

    view {
      padding: 5rpx 0;

      text {
        font-size: 25rpx;
        line-height: 25rpx;
        color: #87878a;
      }

      text:nth-child(2) {
        margin-left: 10rpx;
      }
    }
  }

}


button {
  font-size: 34rpx;
  height: auto;
  border: 0;
  text-align: center;
  line-height: 100rpx;
  position: absolute;
  bottom: 0rpx;
  width: 750rpx;
  border: none;
}
</style>
