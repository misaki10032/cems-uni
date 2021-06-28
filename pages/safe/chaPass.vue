<template>
	<view class="" style="margin: 100rpx 20rpx 0 20rpx ;">
		<uni-forms :modelValue="formData" ref="form" :rules="rules">
			<uni-forms-item label="原密码" required name="psw">
				<uni-easyinput type="text" v-model="formData.psw" placeholder="请输入原密码" />
			</uni-forms-item>
			<uni-forms-item label="新密码" required name="newPsw">
				<uni-easyinput type="text" v-model="formData.newPsw" placeholder="请输入新密码" />
			</uni-forms-item>
			<uni-forms-item label="新密码" required name="newPsw1">
				<uni-easyinput type="text" v-model="formData.newPsw1" placeholder="请再次输入新密码" />
			</uni-forms-item>
			<view style="display: flex;">
				<button style="width: 365rpx;" type="warn" form-type="reset">重置</button>
				<button style="width: 365rpx;" type="primary" @click="submitForm">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		onLoad() {
			var user = uni.getStorageSync("loginUser");
			this.user = user
		},
		data() {
			return {
				// formData: {
				// 	name: '',
				// 	age: '',
				// 	hobby: []
				// },
				user: {},
				formData: {
					psw: "",
					newPsw: "",
					newPsw1: ""
				},
				rules: {
					// 对psw字段进行必填验证
					newPsw: {
						rules: [{
								required: true,
								errorMessage: '请输入正确的格式',
							},
							{
								minLength: 2,
								maxLength: 20,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					}
				}
			}
		},
		methods: {
			submitForm(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
					// var user = uni.getStorageSync("loginUser");
					// console.log('表单返回得值：', user.userPhone)
				})
				if (this.formData.newPsw != this.formData.newPsw1) {
					uni.showToast({
						title: "两次密码不一致,请从新输入"
					})
					this.formData.psw = ""
					this.formData.newPsw = ""
					this.formData.newPsw1 = ""
					return
				} else {
					this.$myRequest({
						url: '/chaPwd',
						data: {
							id: this.user.userId,
							userPhone: this.user.userPhone,
							psw: this.formData.psw,
							newPsw: this.formData.newPsw
						},
						method: 'POST',
						dataType: 'json',
						success: (res) => {
							console.log(res);
							if (res.data.code == 200) {
								uni.showToast({
									title: "修改成功",
									icon: 'none'
								});
								uni.clearStorageSync();		
								setTimeout(function() {
									uni.redirectTo({
										url: "/pages/login/login"
									})
								}, 1500)
							} else if (res.data.code == 400) {
								uni.showToast({
									title: "密码错误重新输入",
									icon: 'none'
								});
								this.formData.psw = ""
								this.formData.newPsw = ""
								this.formData.newPsw1 = ""
							} else if(res.data.code == 500) {
								uni.showToast({
									title: "服务器异常，稍后重试",
									icon: "loading"
								});
								this.formData.psw = ""
								this.formData.newPsw = ""
								this.formData.newPsw1 = ""
							}
						}
					});
				}

			}
		}
	}
</script>

<style>
	@import url("../../static/css/common.css");
</style>
