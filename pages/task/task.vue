<template>
	<view>
		<view class="cond">
			<view class="condition">
				<picker @change="bindPickerChange" @click="isFlag()" @cancel="isFlag" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
				<image :src="flag == true ? '/static/search/up.png' : '/static/search/on.png'" mode=""></image>
				<text>{{total}}条</text>
			</view>
			<view class="btnsarch">
				<input v-model="text" placeholder=" 内容 | 类型 | 时间 " type="text">
				<button type="default" @click="searchTasks">搜索</button>
			</view>
		</view>
		<fab :content="content"></fab>
		<tasks :hotTasks="hotTasks"></tasks>
		<button class="btn" size="mini" type="default" @click="moreTask" v-if="more_dis">加载更多</button>
		<view class="over" v-if="over_dis">
			-------我是有底线的-------
		</view>
	</view>
</template>

<script>
	import tasks from '../../components/task_list/task_list.vue'
	import fab from '../../components/fab/uni_fab.vue'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 8,
				over_dis: false,
				more_dis: true,
				flag: true,
				text: "",
				total: 0,
				hotTasks: [],
				array: ['全部', '已被接', '可接单', '已完成'],
				index: 0,
				content: [
					{
						text: "发单",
						iconPath: "https://img1.baidu.com/it/u=1998788150,363055550&fm=26&fmt=auto&gp=0.jpg"
					}
				]
			}
		},
		onShow() {
			this.pageIndex = 1
			this.hotTasks = []
			this.more_dis = true
			this.over_dis = false
			this.getTasks()
		},
		methods: {
			getTasks(callback) {
				this.$myRequest({
					url: "/getEnts?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize,
					method: "GET",
					success: (res) => {
						console.log(res)
						this.hotTasks = [...this.hotTasks, ...res.data.data]
						this.total = res.data.total
						callback && callback()
					}
				})
			},
			moreTask() {
				if (this.total <= (this.pageIndex * this.pageSize)) {
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
				if (this.total <= (this.pageIndex * this.pageSize)) {
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
			},
			isFlag() {
				this.flag = !this.flag
			},
			bindPickerChange(res) {
				this.isFlag()
				this.index = res.target.value
				if (this.index == 0) {
					this.pageIndex = 1
					this.hotTasks = []
					this.more_dis = true
					this.over_dis = false
					this.getTasks()
					return
				}
				const entPlan = this.array[this.index]
				this.$myRequest({
					url: "/getEntsByPlan?entPlan=" + entPlan + "&pageIndex=" + this.pageIndex + "&pageSize=" + this
						.pageSize,
					method: "GET",
					success: res => {
						console.log(res)
						this.hotTasks = res.data.data
						this.total = res.data.total
					}
				})
			},
			searchTasks() {
				if (this.text == "" || this.text == null || this.text == undefined) {
					this.pageIndex = 1
					this.hotTasks = []
					this.more_dis = true
					this.over_dis = false
					return this.getTasks()
				}

				const entPlan = this.array[this.index]
				this.$myRequest({
					url: "/getEntsByText?entPlan=" + entPlan + "&text=" + this.text + "&pageIndex=" + this
						.pageIndex + "&pageSize=" + this.pageSize,
					method: "GET",
					success: res => {
						this.hotTasks = res.data.data
						this.total = res.data.total
					}
				})
			}
		},
		components: {
			tasks,fab
		}
	}
</script>

<style lang="scss">
	.cond {
		margin: 30rpx 30rpx;
		display: flex;

		.condition {
			margin-left: 5rpx;
			padding: 0 5rpx;
			display: flex;
			width: 200rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #007AFF;
			text-align: center;

			image {
				width: 30rpx;
				height: 20rpx;
				margin-top: 17rpx;
				margin-left: 4rpx;
			}

			text {
				font-size: 20rpx;
				margin-left: 20rpx;
			}
		}

		.btnsarch {
			width: 470rpx;
			height: 50rpx;
			display: flex;
			box-sizing: border-box;

			input {
				width: 320rpx;
				height: 40rpx;
				border: 2rpx solid #c5464a;
				padding: 2rpx 4rpx 2rpx 10rpx;
				border-radius: 5rpx;
				background: transparent;
			}

			button {
				height: 50rpx;
				width: auto;
				cursor: pointer;
				margin-left: 20rpx;
				background: #c5464a;
				font-size: 24rpx;
				line-height: 50rpx;
				color: #F9F0DA;
			}

		}
	}


	.btn {
		margin-left: 295rpx;
	}

	.over {
		width: 100%;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #aaaaaa;
	}
</style>
