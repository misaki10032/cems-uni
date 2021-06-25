<template>
	<view class="tasks">
		<text>订单详情</text>
		<view class="tasks_list" v-for="task in tasks" :key="task.id">
			<view>
				<text>{{task.name}}</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				tasks:[]
			}
		},
		onLoad(opitons) {
			this.getTaskById(opitons.id)
		},
		methods: {
			getTaskById(id) {
				uni.request({
					url: "/getTaskById?id=" + id
				}).then(res => {
					this.tasks = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.tasks{
		padding: 10rpx 20rpx;
		.tasks_list{
			
		}
	}
</style>
