<template>
	<view class="recommend_tasks_list">
		<view class="recommend_tasks_list_task" v-for="task in hotTasks" :key="task.id" @click="toTaskInfo(task.id)">
			<!-- 单子名称 -->
			<view class="recommend_tasks_list_task_name">
				<text>{{task.entData | showName}}</text>
			</view>
			<!-- 单子价格 + 状态 -->
			<view class="recommend_tasks_list_task_price">
				<text>{{task.entMoney | showPrice}}</text>
				<text>{{task.entMoney | showPrice}}</text>
				<text>{{task.entPlan}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
			"hotTasks"
		],
		data() {
			return {
			
			}
		},
		methods: {
			toTaskInfo(id){
				uni.navigateTo({
					url: "/pages/task/details/taskInfo?id=" + id
				})
			}
		},
		/* 过滤器 */
		filters: {
			/* 回去金额 格式 */
			showPrice(price) {
				return '￥' + (price * 0.8).toFixed(2)
			},
			showName(name){
				if(name.length > 10){
					return name.substr(0,10) + "..."
				} else {
					return name
				}
				
			}
		}
	}
</script>

<style lang="scss">
	
		/* 每个task全局 */
		.recommend_tasks_list {
			padding: 10rpx 20rpx;
			justify-content: space-between;
			/* 两个单子的间距*/
			box-sizing: border-box;   /* 缩小内容，不会撑大盒子 */
			
			/* task内部 */
			.recommend_tasks_list_task {
				background: #FFFFFF;
				width: 730rpx;
				margin: 20rpx 0;
				border-bottom: 1rpx solid #eee;
				/* 单子名字 */
				.recommend_tasks_list_task_name {
					color: #b50e03;
					font-size: 30rpx;
					margin: 10rpx 5rpx;
				}
	
				/* 单子详情 */
				.recommend_tasks_list_task_price {
					text:nth-child(2) {
						color: #ccc;
						font-size: 25rpx;
						text-decoration: line-through;
						margin-left: 10rpx;
					}
	
					text:nth-child(3) {
						color: #F55C23;
						font-size: 25rpx;
						position: absolute;
						right: 30rpx;
					}
				}
			}
		}
	
</style>
