<template>
	<view class="content">
		<view class="header">
      <image src="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"></image>
    </view>
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/login/phone.png"></image>
				<input class="biaoti" v-model="mobile" type="number" maxlength="11" placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/login/pwd-check.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="输入密码"
					password="true" />
			</view>

		</view>

		<view class="dlbutton" hover-class="dlbutton-hover" @tap="login()">
			<text>登录</text>
		</view>

		<view class="xieyi">
			<navigator url="/pages/backPwd/backPwd" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="/pages/register/register" open-type="navigate">注册账户</navigator>
			<text>|</text>
			<navigator url="/pages/index/index" open-type="switchTab">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {},
		data() {
			return {
				mobile: '',
				password: '',
				position:{
					userId:"",
					userAddress:"",
					userLongitude:"",
					userLatitude:""
				}
			};
		},
		methods: {
			getUserPosition(userId){
				var that = this;
				uni.getLocation({
					type:'wgs84',
					// geocode:true,
					success: function (res) {
						// var add = ""+res.address.country+res.address.province+res.address.city+res.address.district+res.address.street+res.address.streetNum
						// that.position.userAddress = add;
						var add = "user"+userId+"的详细信息"
						that.position.userAddress = add;
						that.position.userLatitude = res.latitude;
						that.position.userLongitude = res.longitude;
						that.setPosition(userId);
					}
				})
			},
			setPosition(userId){
				console.log(this.position)
				this.$myRequest({
					url: '/setUserPosition',
					data: {
						userId: userId,
						longitude: this.position.userLongitude,
						latitude:this.position.userLatitude,
						userInfo:this.position.userAddress
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						console.log(res)
						if (res.data.code != 200) {
							uni.showToast({
								title:"获取位置信息失败!",
								icon:'none'
							})
						} 
					}
				});
			},
			toIndex() {
				uni.redirectTo({
					url: "/pages/index/index"
				})
			},
			login() {
				// console.log(md5(this.password + 'app'));return;

				var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if (!phone.test(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 2) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				this.$myRequest({
					url: '/uniAppLogin',
					data: {
						num: this.mobile,
						pwd: this.password
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						console.log(res.data)
						if (res.data.code != 200) {
							var msg = "";
							if (res.data.msg == null || res.data.msg == "") {
								msg = "服务器异常"
							} else {
								msg = res.data.msg;
							}
							uni.showToast({
								title: msg,
								icon: 'none'
							});
						} else {
							var token = res.data.token;
							console.log(token);
							uni.setStorageSync('token', token);
							uni.setStorageSync('loginUser', res.data.loginUser);
							this.getUserPosition(res.data.loginUser.userId);
							setTimeout(() => {
								uni.showToast({
									title: "登录成功",
									icon: "success"
								})
							},1500)
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
		padding-top: 60rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161upx;
		height: 161upx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 60upx;
		height: 60upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width: 470upx;
		height: 100upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
		border-radius: 50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.dlbutton-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
	}

	.xieyi {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.xieyi text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
