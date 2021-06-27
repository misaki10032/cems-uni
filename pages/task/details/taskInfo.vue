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
		<view class="btn">
      <button size="default" @click="lookOtherTasks">查看其他</button>
      <button v-if="btn_dis" size="default" type="warn" @click="taskDone(tasks.id)">接手订单</button>
    </view>
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
						if (this.tasks.entPlan != "可接单") {
							this.btn_dis = !this.btn_dis
							uni.showToast({
								title: "此单已经被其他用户接手了!",
								icon: "none"
							})
						}
					}
				})
			},
			lookOtherTasks() {
				uni.switchTab({
					url: "/pages/task/task"
				})
			},
			taskDone(taskId) {
				const user = uni.getStorageSync("loginUser");
				if (user == null || user == "" || user.userPname == null || user.userPname == "") {
					uni.showToast({
						title: "请先登录",
						icon: "loading"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}, 1500)
					uni.hideLoading()
					return
				}
				let userId = user.id
				console.log(userId)
				console.log(taskId)
				this.$myRequest({
					url: "/toTaskDone?taskId=" + taskId + "&userId=" + userId,
					method: "GET",
					success: res => {
						console.log(res.data)
						uni.showToast({
							title: res.data.msg
						})
						setTimeout(() => {
							this.lookOtherTasks()
						}, 1500)
					}
				})
			}
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

  button::after {
    border: none;
    border-radius: 0;
  }
</style>
