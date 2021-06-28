<template>
	<view class="root">
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-forms-item name="type" required label="类型">
				<picker :range="typeArr" :value="index" @change="onchange">{{typeArr[index]}}</picker>
				<!-- <uni-data-picker :localdata="typeArr" @change="onchange"></uni-data-picker> -->
			</uni-forms-item>
			<uni-forms-item name="data" required label="内容">
				<uni-easyinput type="text" :inputBorder="true" v-model="formData.data" placeholder="请输入委托内容"></uni-easyinput>
			</uni-forms-item>
			<!-- 使用原生input，需要绑定binddata -->
			<uni-forms-item name="money" required label="酬金">
				<input type="text" v-model="formData.money" class="uni-input-border"
					@blur="binddata('money', $event.detail.value)" placeholder="请输入酬金" />
			</uni-forms-item>
			<uni-forms-item required name="time" label="截止">
				<uni-datetime-picker timestamp v-model="formData.time" @change="timeStop"></uni-datetime-picker>
			</uni-forms-item>
			</uni-group>
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
					id: uni.getStorageSync("loginUser").userId,
					type: "",
					data: '',
					money: "",
					time: ''
				},
				typeArr: [],
				typeArrId: [],
				index: 0,
				rules: {
					type: {
						rules: [
							{
								required: true,
								errorMessage: "请选择委托类型"
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
								maxLength: 15,
								errorMessage: '内容长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					money: {
						rules: [
							{
								required: true,
								errorMessage: '请输入酬金'
							},
							{
								format: 'double',
								errorMessage: '酬金必须是数字'
							},
							{
								minimum: 5,
								maximum: 1000,
								errorMessage: '酬金应该大于 {minimum} ￥，小于 {maximum} ￥'
							}
						]
					},
					time: {
						rules: [
							{
								required: true,
								errorMessage: '请选择时间'
							},
							{
								format: 'String',
								errorMessage: '必须是时间戳'
							}
						]
					}
				}
			}
		},
		onShow() {
			this.getAllEntrustType()
		},
		methods: {
			getAllEntrustType(){
				this.$myRequest({
					url: "/getAllEntrustType",
					method: "GET",
					success: res => {
						if(res.data.code == 200){
							this.typeArr = res.data.data
							this.typeArrId = res.data.dataId
							this.formData.type = res.data.dataId[0]
						}
					}
				})
			},
			onchange(res) {
				this.index = res.target.value
				this.formData.type = this.typeArrId[this.index]
				console.log(this.typeArr[index])
				console.log(this.typeArrId[index])
			},
			timeStop(res){
				this.time = res
			},
			submitForm(form) {
				this.$refs[form].submit()
					.then(res => {
						console.log('表单的值：', res)
						uni.showToast({
							title: '验证成功'
						})
						this.$myRequest({
							url: "/addEntrust",
							data: {
								id: this.formData.id,
								data: this.formData.data,
								money: this.formData.money,
								time: this.formData.time,
								type: this.formData.type
							},
							method: "get",
							success: res => {
								console.log(res)
								console.log(uni.getStorageSync("token"))
								if(res.data.code == 200){
									uni.showToast({
										title: "发布成功",
										icon: "success"
									})
									setTimeout(() => {
										uni.navigateBack({
											animationType: "slide-out-bottom"
										})
									},1500)
								}else {
									setTimeout(() => {
										uni.showToast({
											title: "网络异常",
											icon: "loading"
										})
									},1500)
									uni.hideToast()
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
		
		picker{
			padding: 15rpx;
			height: 35px;
			width: 100%;
			font-size: 14px;
			color: #666;
			border: 1px #e5e5e5 solid;
			border-radius: 5px;
			box-sizing: border-box;
		}

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
