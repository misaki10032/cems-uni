<template>
	<view class="content">
		<view class="logo">
			<image src="/static/pics/2.jpg"></image>
		</view>
		<view class="from">
			<view class="input-controls">
				<image class="img" src="../../static/login/nick.png"></image>
				<input class="input" v-model="username" type="text" placeholder="昵称" />
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/login/phone.png"></image>
				<input class="input" v-model="mobile" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/login/pwd.png"></image>
				<input class="input" v-model="password" type="text" maxlength="32" placeholder="登录密码" :password="!showPassword" />
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/login/pwd-check.png"></image>
				<input class="input" v-model="repassword" type="text" maxlength="32" placeholder="确认登录密码" :password="!showrePassword" />
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/login/email.png"></image>
				<input class="input" v-model="email" type="text" maxlength="32" placeholder="请输入邮箱"/>
			</view>
			<view class="input-controls">
				<image class="img" src="../../static/login/code.png"></image>
				<input class="input" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view v-if="isShowCode" @click="getCode" class="verificationCode">
					{{reGet}}
				</view>
				<view v-else class="verificationCode">{{daojishi}}s</view>
			</view>
		</view>

		<view class="btn" hover-class="btn-hover" @tap="reg">
			<text>注册</text>
		</view>

		<view class="txt">
			<image @tap="proxyCheck" :src="proxy==true ? '/static/proxy/agree.png' : '/static/proxy/disagree.png'"></image> 
			<navigator url="blog?id=1" open-type="navigate">我同意《软件用户协议》</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			
		},
		onUnload() {
			
		},
		data() {
			return {
				username: '',
				mobile: '',
				password: '',
				repassword: '',
				code: '',
				checkCode: "",
				p_mobile: '',
				proxy: false,
				email: "",
				isShowCode:true,
				reGet:"获取验证码",
				daojishi:"60",
			};
		},
		methods: {
			pwd() {
				this.showPassword = !this.showPassword
			},
			repwd() {
				this.showrePassword = !this.showrePassword
			},
			proxyCheck() {
				this.proxy = !this.proxy;
			},
			getCode(){
				var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!myreg.test(this.email)){
					uni.showToast({
						title: "请输入格式正确的邮箱",
						icon: "none"
					})
					return;
				}
				if(this.email == null || this.email == undefined || this.email == ""){
					uni.showToast({
						title: "请先输入邮箱",
						icon: "none"
					})
					return
				}
				//获取验证码倒计时
				var time = 60;
				this.isShowCode = false;
				var timer = setInterval(()=>{
					time--;
					this.daojishi = time;
						if(time === 0){
							clearInterval(timer);
							this.isShowCode = true;
							this.reGet = '重新获取';
							this.daojishi=60
						}
				},1000)
				//获取验证码
				this.$myRequest({
					url: "/sendEmil?email=" + this.email,
					method: "GET",
					success: res => {
						if(res.data.code == 200){
							this.checkCode = res.data.msg
						}
					}
				})
			},
			reg() {
				if (this.username == "" || this.username == null || this.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '昵称不能为空'
					});
					return;
				}
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
						title: '密码长度必须2-20位'
					});
					return;
				}
				if(this.repassword.length == 0){
					uni.showToast({
						title: "请输入确认密码",
						icon: "none"
					})
					return;
				}
				if (this.repassword != this.password) {
					uni.showToast({
						icon: 'none',
						title: '密码不一致'
					});
					return;
				}
				var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!myreg.test(this.email)){
					uni.showToast({
						title: "请输入格式正确的邮箱",
						icon: "none"
					})
					return;
				}
				if(this.code == null || this.code == undefined || this.code == ""){
					uni.showToast({
						title: "请先输入验证码",
						icon: "none"
					})
					return
				}
				if (this.proxy == false) {
					uni.showToast({
						icon: 'none',
						title: '请先阅读《软件用户协议》'
					});
					return;
				}
				this.$myRequest({
					url: '/userResiger',
					data: {
						userPname: this.username,
						userPhone: this.mobile,
						userPwd: this.password, 
						userEmail: this.email
						/* code: this.code */
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 1500)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
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