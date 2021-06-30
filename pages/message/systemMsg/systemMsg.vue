<template>
	<view class="fixforpc-window">
		
		<view style="text-align: right;height: 80rpx;margin-top: 5px;"  class="sticky-top"> 
		<button v-show=!bol v-if="more_dis" class="mini-btn" type="default"  @click="enter1" size="mini">编辑</button>
		<button v-show=bol v-if="more_dis" class="mini-btn" type="primary" size="mini" @click="ent">取消</button>
	
		<button v-show=bol v-if="more_dis" class="mini-btn" type="warn" size="mini" @click="enter">删除</button>
		<button class="mini-btn" v-show=bol v-if="more_dis" type="warn"  @click="enter2"  size="mini">清空</button>
			</view>
		<view class="example-body">
			<view class="li" v-for="(hm,index) in hotTasks" :key="index">
				<view v-show="hm.del" class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
					<view class="text1">
						{{hm.userTime}}
					</view>
					<view class="text" style="height: 25px;">
						<img v-show=!bol style="height: 20px;"  @click="open($event, index)"  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F77%2F33%2F81%2F67a33f27_E773381_b27076b6.png%21%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fpng&refer=http%3A%2F%2Fimg.51miz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627560227&t=d701662f90469b1c523945f47a250969">
						<checkbox style="height: 20px;" v-show=bol :value='hm.id' :checked="hm.check" @click="checkBox($event, index)"></checkbox>
					</view>
				</view>
				<uni-notice-bar v-show="hm.del" color="#9999AA" width="800rpx" backgroundColor="#F7F7F7" :text='hm.userMessage' />
			</view>
			<button v-if="more_dis" class="btn" size="mini" type="default" @click="moreTask">加载更多</button>
			<view v-if="over_dis" class="over">
				-------我是有底线的-------
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 8,
				over_dis: false,
				more_dis: true,
				total: 0,
				hotTasks: [],
				index: 0,
				serverData: [],
				bol: false,
				bol1: false
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
			checkBox(e, item) {
				this.hotTasks[item].check = !this.hotTasks[item].check
			},
			ent(){
				this.bol = !this.bol
			},
			enter1() {
				this.bol = !this.bol
			},
			enter2() {
				var that = this;
				uni.showModal({
					title: "清空",
					content: "您确定要清空消息吗？",
					cancelColor: "red",
					success: function(res) {
						if (res.confirm) {
						that.$myRequest({
							url: "/delSysMessageByUid?pageIndex=" + 1 + "&pageSize=" + 8 + "&id=" + uni
								.getStorageSync("loginUser").userId,
							method: "GET",
							success: (res) => {
								console.log(res)
								that.hotTasks = res.data.data
								that.total = res.data.total
								uni.showToast({
									title: "清空成功",
									icon: 'none'
								})
							}
						})
						} else if (res.cancel) {
							uni.showToast({
								title: "取消了",
								icon: 'none'
							})
						}
					}
				})
			},
			enter() {
				let that = this;
				// 循环遍历ID
				that.serverData = [];
				that.hotTasks.forEach(item => {
					if (item.check == true) {
						that.serverData.push(item.id);
					}
				});
				if (this.serverData.length === 0) {
					return false
				}
				
				uni.showModal({
					title: "删除",
					content: "您确定要删除消息吗？",
					cancelColor: "red",
					success: function(res) {
						if (res.confirm) {
						that.hotTasks.forEach(item => {
							if (item.check == true) {
								item.del = false
							}
						});
						this.$myRequest({
							url: "/delSysMessage?pageIndex=" + 1 + "&pageSize=" + 8 + "&id=" + uni
								.getStorageSync("loginUser").userId + "&mid=" + this.serverData,
							method: "GET",
							success: (res) => {
								console.log(res)
								this.hotTasks = res.data.data
								this.total = res.data.total
							}
						})
						uni.showToast({
							title: "删除成功",
							icon: 'none'
						})
						} else if (res.cancel) {
							uni.showToast({
								title: "取消了",
								icon: 'none'
							})
						}
					}
				})
			},
			open(e, item) {
				let del = this.hotTasks[item].del;
				let del1 = new String(del);
				var that = this
				uni.showModal({
					title: "删除",
					content: "您确定要删除吗？",
					cancelColor: "red",
					success: function(res) {
						if (res.confirm) {
							that.hotTasks[item].del = false;
								that.$myRequest({
								url: "/delOneSysMessage?mid=" + item,
								method: "GET",
								success: (res) => {
									uni.showToast({
										title: "删除成功",
										icon: 'none'
									})
								}
								}) 
						} else if (res.cancel) {
							uni.showToast({
								title: "取消了",
								icon: 'none'
							})
						}
					}
				})
			},
			onReachBottom() {
				/* if (this.hotTasks.length < this.pageIndex * 10) { */
				if (this.total <= (this.pageIndex * this.pageSize)) {
					this.more_dis = false
					return this.over_dis = true
				}
				this.pageIndex++
				this.getTasks()
			},
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
			getTasks(callback) {
				this.$myRequest({
					url: "/getAllSysMessage?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "&id=" + uni
						.getStorageSync("loginUser").userId,
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
		}

	}
</script>

<style>
	@import url("../../../static/css/uni.css");

	.example-body {
		padding: 5rpx 0;
		padding-top: 20rpx;
		flex-direction: column;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	.fixforpc-window {
		/* #ifndef APP-NVUE */
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/* #endif */
	}
    	.sticky-top{
    		position: sticky;
    		top: 10rpx;
    		left: 0;
    		right: 0;
    		width: 100%;
    		z-index: 1;
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

	.text {
		text-align: right;
		width: 360rpx
	}

	.text1 {
		text-align: left;
		width: 360rpx;
		color: black;
	}
	.mini-btn {
	    margin-right: 10rpx;
	}
</style>
