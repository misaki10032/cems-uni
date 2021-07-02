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
		<button v-if="tasks.entState=='已审核'&&tasks.entPlan=='已被接'" size="default" type="primary" @click="open">确认通过</button>
		<button v-if="tasks.entState=='已审核'&&tasks.entPlan=='已完成'" size="default" type="warn">申诉</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" content="是否确定任务已经完成?" :duration="2000" :before-close="true"
				@close="close" @confirm="okEnt(tasks.id)">
			</uni-popup-dialog>
		</uni-popup>
	</view>




</template>

<script>
	export default {
		data() {
			return {
				tasks: {},
				btn_dis: true,
			}
		}
		,
		onLoad(opitons) {
			this.getTaskById(opitons.id)
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			okEnt(id) {
				console.log(id + "dasdad")
				this.$refs.popup.close()
				this.$myRequest({
					url: "/updateEntPlan?id=" + id,
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title: "确认成功",
								icon: 'loading'
							});
							uni.navigateTo({
								url:"/pages/message/myTask/myEntrust"
							})
						} else if (res.data.code == 500) {
							uni.showToast({
								title: "服务器异常，稍后重试",
								icon: "none"
							});

						}
					}
				})
			},

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
	/* 图标+文字 */
	.nav_item {
		text-align: center;
		margin-top: 30rpx;
		padding: 32rpx 20rpx;
		background-color: #0baef4;
		color:#ffffff;
		width: 240rpx;
		height: 45rpx;
		border-radius: 30rpx;
		font-family: unset;
		margin-left: 240rpx;
		
	}


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
