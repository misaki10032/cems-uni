<template>
	<view class="root">
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-forms-item name="title" required>
				<uni-easyinput type="text" :inputBorder="false" v-model="formData.title" placeholder="请输入帖子标题"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="data" required>
				<uni-easyinput type="textarea" autoHeight v-model="formData.data" placeholder="请输入帖子内容(容量100)"></uni-easyinput>
			</uni-forms-item>
			<view class="btn">
				<button type="warn" form-type="reset">重置</button>
				<button type="primary" @click="submitForm('form')">发布</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					id: "",
					title: "",
					data: ''
				},
				rules: {
					title: {
						rules: [
							{
								required: true,
								errorMessage: '请输入标题内容'
							},
							{
								minLength: 2,
								maxLength: 20,
								errorMessage: "标题长度在{minLength} 到 {maxLength} 之间"
							}
						]
					},
					data: {
						rules: [
							{
								required: true,
								errorMessage: '请输入委托内容'
							},
							{
								minLength: 3,
								maxLength: 100,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					}
				}
			}
		},
		onShow(){
			var user = uni.getStorageSync("loginUser");
			if (user == null || user == "" || user.userPname == null || user.userPname == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				})
				return
			}
			this.formData.id = user.userId;
		},
		methods: {
			submitForm(form) {
				this.$refs[form].submit()
					.then(res => {
						console.log('表单的值：', res)
						uni.showToast({
							title: '验证成功'
						})
						this.$myRequest({
							url: "/addArticle",
							data: {
								id: this.formData.id,
								title: this.formData.title,
								data: this.formData.data
							},
							method: "get",
							success: res => {
								if(res.data.code == 200){
									uni.showToast({
										title: "发布成功",
										icon: "success"
									})
									setTimeout(() => {
										uni.navigateBack({
											animationType: "zoom-in"
										})
									},1500)
								}
							}
						})
					})
					.catch(errors => {
						console.error('验证失败：', errors)
						return
					})
			}
		}
	}
</script>
<style lang="scss">
	.root {
		margin: 30rpx 40rpx;

		.uni-input-border {
			padding: 0 10px;
			height: 35px;
			width: 100%;
			font-size: 14px;
			color: #666;
			border: 1px #e5e5e5 solid;
			border-radius: 5px;
			box-sizing: border-box;
		}

		.btn {
			width: 690rpx;
			display: flex;

			button {
				width: 345rpx;
			}
		}
	}
</style>
