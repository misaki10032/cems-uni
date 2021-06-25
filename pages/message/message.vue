<template>
	<view>
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in nav" :key="index" @click="toDetails(item.url)">

				<view>
					<image :src="item.icon" mode=""></image>
				</view>

				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="tip">
			<view v-if="msgs.length === 0">
				<text>{{msg}}</text>
			</view>
			<view>a11111111111</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				msg: "你居然一条消息都没有",
				nav: [{
						"title": "订单状态",
						"icon": "/static/message/taskStatus.png",
						"url": "/pages/message/taskStatus/taskStatus"
					},
					{
						"title": "系统消息",
						"icon": "/static/message/systemMsg.png",
						"url": "/pages/message/systemMsg/systemMsg"
					},
					{
						"title": "活动中心",
						"icon": "/static/message/activityCenter.png",
						"url": "/pages/message/activityCenter/activityCenter"
					}
				],
				msgs: [

				]
			}
		},
		onShow() {
			var user = uni.getStorageSync("loginUser");
			if(user==null||user==""||user.userPname==null||user.userPname==""){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		},
		methods: {
			toDetails(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 导航 */
	.nav {
		display: flex;

		/* 图标+文字 */
		.nav_item {

			width: 33.3%;
			text-align: center;
			margin-top: 40rpx;

			view {
				margin: 10rpx auto;
			}

			/* 导航图标 */
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
				line-height: 100rpx;
				background: #e6e6e6;
				color: #FFFFFF;
			}
		}
	}
	
	.tip{
		image{
			width: 650rpx;
			height: 450rpx;
			margin: 10rpx auto;
		}
		font-size: 30rpx;
		text-align: center;
		margin-top: 350rpx;
	}
</style>
