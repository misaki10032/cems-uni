<template>
	<view class="content">
		<view class="from">
			<view class="msg">请输入验证码。</view>
			<view class="input-controls">
				<image class="img" src="../../static/login/code.png"></image>
				<input class="input" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view v-if="isShowCode" @click="getCode" class="verificationCode">
					{{reGet}}
				</view>
				<view v-else class="verificationCode">{{daojishi}}s</view>
			</view>
		</view>
		<view class="btn" hover-class="btn-hover" @tap="push()">
			<text>提交</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: "",
				user: {},
				isShowCode:true,
				reGet:"获取验证码",
				daojishi:"60",
				checkCode: ""
			}
		},
		onLoad(){
			this.user = uni.getStorageSync("user")
		},
		methods: {
			getCode(){
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
					url: "/sendEmil?email=" + this.user.userEmail,
					method: "GET",
					success: res => {
						if(res.data.code == 200){
							this.checkCode = res.data.msg
						}
					}
				})
			},
			push(){
				console.log(this.code)
				console.log(this.checkCode)
				if(this.code == null || this.code == undefined || this.code == ""){
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					})
					return
				}
				if(this.code == this.checkCode){
					uni.navigateTo({
						url: "/pages/backPwd/backPwdThird"
					})
				}
			}
		}
	}
</script>
<style>
	@import url("../../static/css/common.css");
</style>