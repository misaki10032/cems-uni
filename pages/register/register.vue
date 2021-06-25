<template>
	<view class="content">
		<view class="logo">
			<image src="../../static/logo.png"></image>
		</view>

		<view class="from">
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="username" type="text" placeholder="昵称" />
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="mobile" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="password" type="text" maxlength="32" placeholder="登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/image/open.png':'/static/image/close.png'" @tap="pwd"></image>
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="repassword" type="text" maxlength="32" placeholder="确认登录密码" :password="!showrePassword" />
				<image class="img" :src="showrePassword?'/static/image/open.png':'/static/image/close.png'" @tap="repwd"></image>
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="pay_pwd" type="text" maxlength="32" placeholder="支付密码" :password="!showpayPassword" />
				<image class="img" :src="showpayPassword?'/static/image/open.png':'/static/image/close.png'" @tap="paypwd"></image>
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="repay_pwd" type="text" maxlength="32" placeholder="确认支付密码" :password="!showrepayPassword" />
				<image class="img" :src="showrepayPassword?'/static/image/open.png':'/static/image/close.png'" @tap="repaypwd"></image>
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/logo.png"></image>
				<input class="input" v-model="p_mobile" type="text" maxlength="11" placeholder="推荐人手机号码                      (非必填)" />
			</view>

		</view>

		<view class="btn" hover-class="btn-hover" @tap="reg">
			<text>注册</text>
		</view>

		<view class="txt">
			<image @tap="proxyCheck" :src="proxy==true ? '/static/proxy/disagree.png' : '/static/proxy/agree.png'"></image> 
			<navigator url="blog?id=1" open-type="navigate">我同意《软件用户协议》</navigator>
		</view>
	</view>
</template>

<script>

	var tha, js;
	export default {
		onLoad() {
			tha = this;
		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				username: '',
				mobile: '',
				password: '',
				code: '',
				p_mobile: '',
				proxy: true,
				showPassword: false,
				showrePassword: false,
				showpayPassword: false,
				showrepayPassword: false,
				second: 0
			};
		},
		computed: {
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 1) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		methods: {
			pwd() {
				this.showPassword = !this.showPassword
			},
			repwd() {
				this.showrePassword = !this.showrePassword
			},
			paypwd() {
				this.showpayPassword = !this.showpayPassword
			},
			repaypwd() {
				this.showrepayPassword = !this.showrepayPassword
			},
			proxyCheck() {
				this.proxy = !this.proxy;
			},
			getcode() {
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				uni.request({
					url: this.$url + '/api/v1.sms/getsms', // 获取短信接口
					data: {
						mobile: this.mobile,
						type:1
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						// console.log(res.data);
						if (res.data.code != 1) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: res.data.msg
							});
							js = setInterval(function() {
								tha.second--;
								if (tha.second == 0) {
									clearInterval(js)
								}
							}, 1000)
						}
					}
				});
			},
			reg() {
				if (this.username == "" || this.username == null || this.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '昵称不能为空'
					});
					return;
				}
				if (this.proxy == false) {
					uni.showToast({
						icon: 'none',
						title: '请先阅读《软件用户协议》'
					});
					return;
				}
				if (this.mobile.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码长度必须6-20位'
					});
					return;
				}
				if (this.username == "" || this.username == null || this.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				uni.request({
					url: global.host +'/api/v1.login/reg',
					data: {
						username: this.username,
						mobile: this.mobile,
						password: this.password, 
						repassword: this.repassword,
						pay_pwd: this.pay_pwd,
						repay_pwd: this.repay_pwd,
						code: this.code,
						p_mobile: this.p_mobile
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						console.log(res);
						if (res.data.code != 1) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: res.data.msg
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 1500)
						}
					}
				});

			}
		}
	}
</script>

<style>
	@import url("../../static/css/common.css");
</style>