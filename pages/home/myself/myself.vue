<template>
	<view class="myself" :info="info">
		<view>
			<text>头像</text>
			<image :src="img" @click="chooseImg"></image>
		</view>
		<view @click="infoUpd(1,info.userName)">
			<text>真实姓名</text>
			<text>{{info.userName}}</text>
			<text>></text>
		</view>
		<view @click="infoUpd(2,info.userDec)">
			<text>个性签名</text>
			<text>{{info.userDec}}</text>
			<text>></text>
		</view>
		<view @click="infoUpd(3,info.userPname)">
			<text>昵称</text>
			<text>{{info.userPname}}</text>
			<text>></text>
		</view>
		<view>
			<text>联系手机</text>
			<text>{{info.userPhone}}</text>
		</view>
		<view @click="infoUpd(4,info.userEmail)">
			<text>联系邮箱</text>
			<text>{{info.userEmail}}</text>
			<text>></text>
		</view>
		<view>
			<text>用户性别</text>
			<picker @click="isFlag()" @cancel="isFlag" :range="array" @change="changeSex">
				<view class="uni-input">{{info.userSex}}</view>
			</picker>
			<image :src="flag == true ? '/static/search/up.png' : '/static/search/on.png'" mode=""></image>
		</view>
		<view>
			<text>出生年月</text>
			<picker @click="isdFlag()" mode="date" :end="endDate" @cancel="isdFlag" @change="bindDateChange">
				<view class="uni-input">{{info.userBirth | formatDate}}</view>
			</picker>
			<image :src="dflag == true ? '/static/search/up.png' : '/static/search/on.png'" mode=""></image>
		</view>
		<view @click="infoUpd(5,info.userHouse)">
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
				img: "/static/pics/2.jpg",
				flag: true,
				dflag: true,
				array: ['男', '女'],
				index: 0
			}
		},
		onShow() {
			this.flushthis();
		},
		mounted() {
			/* uni.$on('send',(...data) => {
				console.log('监听到事件来自 send ，携带参数 msg 为：' + data);
			}) */
		},
		computed: {
			endDate() {
				return new Date().getDate();
			}
		},
		methods: {
			flushthis(){
				const user = uni.getStorageSync("loginUser")
				let id = user.userId
				this.$myRequest({
					url: "/getThisUser?id=" + id,
					method: "GET",
					success: res => {
						if (res.data.code == 200) {
							uni.removeStorageSync("loginUser")
							uni.setStorageSync("loginUser", res.data.userInfo)
							console.log(res.data)
						}
						if (res.data.code != 200) {
							uni.clearStorage()
							setTimeout(() => {
								uni.showToast({
									title: res.data.msg,
									icon: "loading"
								})
								uni.redirectTo({
									url: "/pages/login/login"
								})
							}, 1500)
						}
					}
				})
			}
			,
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
			infoUpd(id, res) {
				uni.navigateTo({
					url: "/pages/home/myself/myselfUpd/myselfUpd?param=" + res + "&id=" + id
				})
			},
			changeSex(res) {
				this.index = res.target.value
				this.info.userSex = this.array[this.index]
				this.$myRequest({
					url: "/revUserInfo",
					data: this.info,
					method: "POST",
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						}
						this.flushthis();
					}
				})
			},
			isFlag() {
				this.flag = !this.flag
			},
			isdFlag() {
				this.dflag = !this.dflag
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			bindDateChange: function(e) {
				this.info.userBirth = e.target.value
				this.$myRequest({
					url: "/revUserInfo",
					data: this.info,
					method: "POST",
					success: res => {
						
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						}
					}
				})
			}
		},
		filters: {
			formatDate: function(value) {
				return new Date(value).toLocaleDateString()
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

		view:nth-child(7) {
			.uni-input {
				width: 60rpx;
				height: 60rpx;
				text-align: center;
				position: absolute;
				right: 20rpx;
				top: 600rpx;
			}

			image {
				width: 30rpx;
				height: 20rpx;
				position: absolute;
				right: 15rpx;
				top: 650rpx;
			}
		}
		
		view:nth-child(8) {
			.uni-input {
				width: 60rpx;
				height: 60rpx;
				text-align: center;
				position: absolute;
				right: 120rpx;
				top: 680rpx;
			}
		
			image {
				width: 30rpx;
				height: 20rpx;
				position: absolute;
				right: 15rpx;
				top: 730rpx;
			}
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
