<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd" style="background-color: #b50e03">
						<view class="avator">
							<img src="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg">
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-row style="text-align: center;">
			<uni-col :span="24" style="width: 650rpx;background-color: #FFFFFF;border-radius: 35rpx;margin: 20rpx 50rpx;" >
				<uni-col :span="24" style="border-bottom: 1rpx solid #d4d4d4;padding: 10rpx;">
					<uni-col :span="7" style="text-align: right;">
						<uni-icons type="person"></uni-icons>
					</uni-col>
					<uni-col :span="16" :offset="1" style="text-align: left;">
						<text style="text-align: left;">昵称&nbsp;:&nbsp;{{ user.userPname }}</text>
					</uni-col>	
				</uni-col>
				<uni-col :span="24" style="border-bottom: 1rpx solid #d4d4d4;padding: 20rpx;" >
					<uni-col :span="7" style="text-align: right;">
						<uni-icons type="paperclip"></uni-icons>
					</uni-col>
					<uni-col :span="16" :offset="1" style="text-align: left;">
						<text style="text-align: left;">权限&nbsp;:&nbsp;{{ user.userRole }}</text>
					</uni-col>
				</uni-col>
				<uni-col :span="24" style="padding: 10rpx;">
					<uni-col :span="7" style="text-align: right;">
						<uni-icons type="cart"></uni-icons>
					</uni-col>
					<uni-col :span="16" :offset="1" style="text-align: left;">
						<text style="text-align: left;">余额&nbsp;:&nbsp;{{ user.userMoney }}</text>
					</uni-col>
				</uni-col>
			</uni-col>
			<uni-col :span="20" :offset="2">
				<button type="primary" style="border-radius: 35rpx;" @click="open">
					升级权限
				</button>
			</uni-col>
		</uni-row>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" content="您目前是:代理人 是否升级为委托人?" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				headImg: {},
				money: uni.getStorageSync("loginUser").userMoney,
				userRole: uni.getStorageSync("loginUser").userRole,
				upMoney: 100,
				nav: [{
					"title": "余额",
					"num": uni.getStorageSync("loginUser").userMoney,
					"url": "/pages/home/currentMenu/moneyCheat/moneyCheat"
				}],
				user: uni.getStorageSync("loginUser")
			}
		},
		onShow() {
			/* 页面加载*/
			var user = uni.getStorageSync("loginUser");
			if (user.userRole == 'complete') {
				user.userRole = "委托人";
			} else {
				user.userRole = "代理人";
			}
			this.user = user;
		},
		onPullDownRefresh() {
			/* 下拉刷新的逻辑处理 */
			console.log("下拉刷新")
			uni.stopPullDownRefresh()
		},
		methods: {
			open() {
				if (this.userRole == "complete") {
					uni.showToast({
						icon: "closeempty",
						title: "权限已达到!"
					})
					return
				}
				if (this.money < this.upMoney) {
					uni.showToast({
						icon: "loading",
						title: "余额不足"
					})
					return
				}

				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				this.$refs.popup.close()

				this.$myRequest({
					url: '/upUserRole',
					data: {
						id: this.user.userId,
						userRole: this.userRole,
						money: this.money,
						upMoney: this.upMoney
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							uni.showToast({
								title: "成功支付100￥",
								icon: 'loading'
							});
							setTimeout(() => {
								var user = uni.getStorageSync("loginUser");
								user.userMoney = user.userMoney - 100;
								user.userRole = "complete"
								uni.setStorageSync("loginUser", user);
								uni.switchTab({
									url: "../home/home"
								})
							}, 1000)
						} else if (res.data.code == 500) {
							uni.showToast({
								title: "服务器异常，稍后重试",
								icon: "none"
							});

						}
					}
				});
			},
			toTask() {
				uni.switchTab({
					url: '/pages/task/task'
				})
			},
			toUrl(url) {
				uni.navigateTo({
					url
				})
			},
			toDetials(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		background: #fff;
		height: 190upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #b50e03;
		}
	}

	.box {
		width: 650 upx;
		height: 200 upx;
		border-radius: 20 upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5 upx 20 upx 0 upx rgba(0, 0, 150, .2);

		/* 导航 */
		.nav {
			display: flex;
			border-bottom: 1 rpx solid #eee;

			/* 图标+文字 */
			.nav_item {

				width: 33.3%;
				text-align: center;
				margin-top: 15rpx;

				view {
					margin: 10rpx auto;
				}
			}
		}

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.phone-number {
				width: 100%;
				text-align: center;
				font-size: 40rpx;
			}

			.role {
				text-align: center;
				font-size: 20rpx;
				color: #767676;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		view:nth-child(1) {
			margin-top: 40rpx;
		}

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			text {
				position: absolute;
				right: 30rpx;
				color: #ccc;
			}


			text {
				position: absolute;
				right: 30rpx;
				color: #ccc;
			}

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx;
			}
		}
	}
</style>
