<template>
	
	<view class="tasks">
		
		<view class="title">
			<text>订单信息</text>
			<text>{{tasks.entPlan}}</text>
		</view>
	
		<view class="info">
			<view>
				<text>{{tasks.entType}}</text>
			</view>
			
			<text>{{tasks.entData}}</text>
		</view>
		
		<view class="money">
			<text>{{tasks.gmtMoney}}</text>
		</view>
		
		<view class="time">
			<view>
				<text>发布时间</text>
				<text>{{tasks.gmtCreate}}</text>
			</view>
			<view>
				<text>截止时间</text>
				<text>{{tasks.gmtEnd}}</text>
			</view>
			
		</view>
		
		<view class="btn">
			<button type="default">接手订单</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				tasks:{},
				btn_dis: true
			}
		},
		onLoad(opitons) {
			this.getTaskById(opitons.id)
		},
		methods: {
			getTaskById(id) {
				console.log(id)
				this.$myRequest({
					url: "/toEntrustInfo?id=" + id,
					success: res => {
						console.log(res)
						this.tasks = res.data.entrust
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.tasks{
		margin: 30rpx 30rpx;
		.title{
			
			text:nth-child(2){
				position: absolute;
				right: 30rpx;
				font-size: 20rpx;
				color: #007AFF;
			}
		}
		.info{
			view{
				width: 40rpx;
				height: 80rpx;
			}
			text:nth-child(1){
				background: #007AFF;
				color: #eee;
				font-size: 25rpx;
				line-height: 30rpx;
			}
			text:nth-child(2){
				padding-left: 30rpx;
			}
		}
		.money{
			
		}
		.time{
			
		}
		.btn{
			color: #FFFFFF;
			font-size: 34rpx;
			width:750rpx;
			height:auto;
			border-radius:50upx;
			line-height: 100upx;
			text-align: center;
			position: absolute;
			bottom: 0rpx;
		}
	}
</style>
