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
<!-- 		<view class="tip">
			<view v-if="msgs.length === 0">
				<text>{{msg}}</text>
			</view>
		</view> -->
		<view class="uni_chat" @click="toChat">
			<uni-row>
				<uni-col :span="2" :offset="2">
					<image src="https://img0.baidu.com/it/u=3800488023,2420605444&fm=26&fmt=auto&gp=0.jpg"></image>
				</uni-col>
				<uni-col :span="12" :offset="4">
					<view class="chat_name">cems多人聊天中心</view>
				</uni-col>
			</uni-row>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				msg: "你居然一条消息都没有",
				nav: [{
						"title": "我的任务",
						"icon": "https://img2.baidu.com/it/u=1290853670,1951954233&fm=26&fmt=auto&gp=0.jpg",
						"url": "/pages/message/myTask/myTask"
					},
					{
						"title": "系统消息",
						"icon": "https://img1.baidu.com/it/u=3589648237,1000920097&fm=26&fmt=auto&gp=0.jpg",
						"url": "/pages/message/systemMsg/systemMsg"
					},
					{
						"title": "附近的人",
						"icon": "https://img1.baidu.com/it/u=944396301,1632317689&fm=26&fmt=auto&gp=0.jpg",
						"url": "/pages/message/nearBy/nearBy"
					}
				],
				msgs: [

				]
			}
		},
		onShow() {
			var user = uni.getStorageSync("loginUser");
			if (user == null || user == "" || user.userPname == null || user.userPname == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		},
		methods: {
			toDetails(url) {
				uni.navigateTo({
					url
				})
			},
			toChat(){
				uni.navigateTo({
					url:"../nettyChat/nettyChat"
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni_chat{
		padding: 20rpx;
		background-color: #f4f4f4;
		margin: 25rpx;
		border-radius: 15rpx;
		border: 1rpx solid #d1d1d1;
		
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 100rpx;
			border: 1rpx solid #d1d1d1;
		}
		.chat_name{
			margin-top: 40rpx;
			font-size: 35rpx;
		}
	}
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

	.tip {
		image {
			width: 650rpx;
			height: 450rpx;
			margin: 10rpx auto;
		}

		font-size: 30rpx;
		text-align: center;
		margin-top: 350rpx;
	}
</style>
