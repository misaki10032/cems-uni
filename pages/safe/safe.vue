<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">							
							<img src="https://img0.baidu.com/it/u=387321899,1968228181&fm=26&fmt=auto&gp=0.jpg">
						</view>
					</view>
					<view class="nav">
				
					</view>
				</view>
			</view>
		</view>
	
		<view >
			<!-- <navigator url="/pages/about/about"><button type="default">通过navigator组件跳转到about页面</button></navigator> -->
			        <button type="default" @click="infoUpd">修改密码                 >></button>
		</view>
	</view>

	
</template>

<script>
	export default {
		data() {
			return {
				// user:{}
			}
		},
		methods: {
			infoUpd() {
				uni.navigateTo({
					url: "/pages/safe/chaPass"
				})
			},
		}
	}
</script>

<style>
	
</style>


<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		background: #fff;
		height: 290upx;
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
		height: 300 upx;
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
