<template>
	<view class="insert">
		<uni-card title="充值金额">
			<uni-easyinput v-model="payMoney" prefixIcon="map-pin" style="line-height: 100rpx;" name="money" type="number" focus @input="isflag"/>
			<uni-row>
				<uni-col :span="8" v-for="money in moneyArr">
					<button class="money_btn" type="primary" @click="insertMoney(money)"><text>{{money | showMoney}}</text></button>
				</uni-col>
			</uni-row>
		</uni-card>
		<button :disabled="flag" type="primary" @click="insertMoney(payMoney)">下一步</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" :content="content" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payMoney: "",
				content: "",
				flag: true,
				moneyArr: [
					10, 20, 50, 100, 200, 300
				]
			}
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
				this.payMoney = ""
			},
			confirm() {
				this.$refs.popup.close()
				this.$myRequest({
					method: "POST",
					url: '/addUserMoney',
					data: {
						id: uni.getStorageSync("loginUser").userId,
						upMoney: this.payMoney
					},
					success: (res) => {
						console.log(res)
						if(res.data.code == 200){
							setTimeout(() => {
								uni.showToast({
									title: res.data.msg,
									icon: "success"
								})
							},500)
							this.payMoney = ""
						}
						uni.removeStorageSync("loginUser")
						uni.setStorageSync("loginUser",res.data.loginUser)
					}
				});
			},
			isflag() {
				if (this.payMoney.length == 0) {
					this.flag = true
					return
				}
				this.flag = false
			},		
			insertMoney(money) {
				var moneyTest = /^\d*$/;
				if(!moneyTest.test(money)){
					uni.showToast({
						title:"金额只能是整数哦!",
						icon:"none"
					})
					return
				}
				if(money == 0){
					uni.showToast({
						title:"不可以充值0元哦!",
						icon:"none"
					})
					return
				}
				this.payMoney = money
				this.content = "您确定要充值" + this.payMoney + "?"
				this.open()
			}
		},
		filters: {
			showMoney(money) {
				return (money * 1).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.insert {
		margin-top: 60rpx;

		uni-card {
			display: flex;
		}
		
		.money_btn {
			margin: 60rpx 30rpx;
			height: 160rpx;
			padding: 35rpx 20rpx;
			border-radius: 20rpx;
			
			text {
				font-size: 35rpx;
			}
		}
		
		button{
			margin: 40rpx 30rpx;
		}
	}
</style>
