<template>
	<view>
		<view class="condition">
			<view class="cond-item" v-for="item in condition">{{item}}</view>
		</view>

		<tasks :hotTasks="hotTasks"></tasks>
		<button class="btn" size="mini" type="default" @click="moreTask" v-if="more_dis">加载更多</button>
		<view class="over" v-if="over_dis">
			-------我是有底线的-------
		</view>
	</view>
</template>

<script>
	import tasks from '../../components/task_list/task_list.vue'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 8,
				over_dis: false,
				more_dis: true,
				total: 0,
				condition: [
					"安卓",
					"排序",
					"筛选"
				],
				hotTasks: []
			}
		},
		onLoad() {
			this.getTasks()

		},
		methods: {
			getTasks(callback) {
				/* this.$myRequest({
					url: 'uniApp/getEnts?pageIndex=' + this.pageIndex + "/&pageSize=" + this.pageSize
				}).then(res => {
					console.log(res)
				}) */
				uni.request({
					url: "http://192.168.31.227:9999/uniApp/getEnts?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize,
					method: "GET",
					responseType:"text/html;charset=utf-8"
				}).then(res => {
					this.hotTasks = [...this.hotTasks, ...res[1].data.data]
					this.total = res[1].data.total
					/* 如果有调用回调函数 */
					callback && callback()
				})
			},
			moreTask() {
				if(this.total <= (this.pageIndex * this.pageSize)) {
					
					this.more_dis = false
					this.over_dis = true
					return
				}
				this.pageIndex++
				this.getTasks()
			},
			/* 触底触发 */
			onReachBottom() {
				/* if (this.hotTasks.length < this.pageIndex * 10) { */
				if(this.total <= (this.pageIndex * this.pageSize)) {
					this.more_dis = false
					return this.over_dis = true
				}
				this.pageIndex++
				this.getTasks()
			},
			/* 下拉刷新 */
			onPullDownRefresh() {
				this.pageIndex = 1
				this.hotTasks = []
				this.over_dis = false
				setTimeout(() => {
					this.getTasks(() => {
						/* 数据请求成功  关闭刷新 */
						uni.stopPullDownRefresh()
					})
				}, 1000)
			}
		},
		components: {
			tasks
		}
	}
</script>

<style lang="scss">
	.condition {
		display: flex;
		text-align: center;
		border-bottom: 1rpx solid #eee;

		.cond-item {
			width: 33%;
			height: auto;
			font-size: 30rpx;
			line-height: 80rpx;
		}

	}

.btn{
	margin-left: 295rpx;
}

	.over {
		width: 100%;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 28rpx;
	}
</style>
