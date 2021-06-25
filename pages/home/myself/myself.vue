<template>
	<view class="myself" :info="info">
		<view>
			<text>头像</text>
			<image :src="img" @click="chooseImg"></image>
		</view>
		<view>
			<text>真实姓名</text>
			<text>{{info.userName}}</text>
		</view>
		<view>
			<text>个性签名</text>
			<text>{{info.userDec}}</text>
			<text>></text>
		</view>
		<view @click="nickNameUpdate(info.userPname)">
			<text>昵称</text>
			<text>{{info.userPname}}</text>
		</view>
		<view>
			<text>联系手机</text>
			<text>{{info.userPhone}}</text>
			<text>></text>
		</view>
		<view>
			<text>联系邮箱</text>
			<text>{{info.userEmail}}</text>
			<text>></text>
		</view>
		<view>
			<text>用户性别</text>
			<text>{{info.userSex}}</text>
			<text>></text>
		</view>
		<view>
			<text>出生年月</text>
			<text>{{info.userBirth}}</text>
			<text>></text>
		</view>
		<view>
			<text>家庭住址</text>
			<text>{{info.userHouse}}</text>
			<text>></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: uni.getStorageSync("loginUser"),
				img:"/static/pics/2.jpg"
			}
		},
		methods: {
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.img = res.tempFilePaths
					},
					fail() {
						alert("系统繁忙，稍后再试")
					}
				})
			},
			nickNameUpdate(nickName){
				uni.navigateTo({
					url: "/pages/home/myself/nickNameUpd/nickNameUpd?nickName=" + nickName
				})
			}
		}
	}
</script>

<style lang="scss">

	.myself {

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50rpx;
			position: relative;
			right: -520rpx;
		}

		view {
			margin: 30rpx 20rpx;
			line-height: 60rpx;
			width: 750rpx;
			height: auto;
			border-bottom: 1rpx solid #eee;
			text:nth-child(2) {
				position: absolute;
				right: 50rpx;
				font-size: 30rpx;
			}
			text:nth-child(3) {
				color: #ccc;
				position: absolute;
				right: 20rpx;
			}
		}
	}
</style>
