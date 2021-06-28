<template>
	<view class="content">
		<view class="from">
			<view class="msg">请设置新的密码。</view>
			<view class="input-controls">
				<image class="img" src="/static/login/pwd.png"></image>
				<input class="input" v-model="password" password type="text" maxlength="32" placeholder="重新设置密码"/>
			</view>
			<view class="input-controls">
				<image class="img" src="/static/login/pwd-check.png"></image>
				<input class="input" v-model="repassword" password type="text" maxlength="32" placeholder="重新输入设置密码"/>
			</view>
		</view>

		<view class="btn" hover-class="btn-hover" @tap="reg">
			<text>提交</text>
		</view>
	</view>
</template>

<script>

	export default {
		onLoad() {
			const user = uni.getStorageSync("user")
			this.user = user
		},
		data() {
			return {
				password: '',
				repassword: '',
				user: {}
			};
		},
		methods: {
			reg() {
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
				this.$myRequest({
					url: '/updatePwd?id=' + this.user.userId + "&pwd=" + this.password,
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/login/login"
								})
							}, 1500)
						} else {
							uni.showToast({
								title: "服务器异常，稍后重试",
								icon: "loading"
							});
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/login/login"
								})
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