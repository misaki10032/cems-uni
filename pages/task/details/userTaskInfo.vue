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

  margin: 30 rpx 30 rpx;

  .title {

    text:nth-child(2) {
      position: absolute;
      right: 30 rpx;
      font-size: 20 rpx;
      color: #007AFF;
    }
  }

  .info {
    margin-top: 10 rpx;

    text:nth-child(1) {
      width: auto;
      height: 50 rpx;
      background: #007AFF;
      text-align: center;
      border-radius: 10 rpx;
      padding: 4 rpx;
      color: #eee;
      font-size: 25 rpx;
      line-height: 25 rpx;
    }

    text:nth-child(2) {
      margin-left: 10 rpx;
      text-decoration: blink;
    }
  }

  .money {
    margin-top: 20 rpx;
    color: #ff0000;
  }

  .time {
    margin-top: 20 rpx;

    view {
      padding: 5 rpx 0;

      text {
        font-size: 25 rpx;
        line-height: 25 rpx;
        color: #87878a;
      }

      text:nth-child(2) {
        margin-left: 10 rpx;
      }
    }
  }

}


button {
  font-size: 34 rpx;
  height: auto;
  border: 0;
  text-align: center;
  line-height: 100 rpx;
  position: absolute;
  bottom: 0 rpx;
  width: 750 rpx;
  border: none;
}
</style>
