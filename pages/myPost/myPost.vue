<template>
	<view>
		<view style="background-color: #F7F7F7;" v-for="(hm,index) in hotTasks" :key="index">
		<uni-row v-show="hm.del" class="urow">
			<uni-col :span="22">
				<view class="h4">{{hm.foTitle}}</view>
			</uni-col>
			<uni-col :span="2" >
				<img class="img"    @click="del(hm.id, index)"  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F77%2F33%2F81%2F67a33f27_E773381_b27076b6.png%21%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fpng&refer=http%3A%2F%2Fimg.51miz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627560227&t=d701662f90469b1c523945f47a250969">
			</uni-col>
			<uni-col :span="24">
				<uni-notice-bar :single="true"  :show-get-more="true" more-text="查看详情" more-color="blue" color="#555666" background-color="white" :text='hm.foData'  @getmore="getMore" />
			</uni-col>
			<uni-col  :span="24" >
				<view  class="fb">发布贴子于{{hm.gmtCreate}}</view>
			</uni-col>
		</uni-row>
		</view>
		<button v-if="more_dis" class="btn" size="mini" type="default" @click="moreTask">加载更多</button>
		<view v-if="over_dis" class="over">
			-------我是有底线的-------
		</view>
	</view>
</template>

<script>
		export default {
			data(){
				return{
					pageIndex: 1,
					pageSize: 8,
					over_dis: false,
					more_dis: true,
					total: 0,
					hotTasks: [],
					index: 0,
				}
			},
			onShow() {
				this.pageIndex = 1
				this.hotTasks = []
				this.more_dis = true
				this.over_dis = false
				this.getTasks()
			},
			methods:{
				del(e, item) {
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
									url: "/delArticle?id=" + e,
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
				getMore(){
					uni.showToast({
						title: '点击查看更多',
						 icon: 'none'
					})
				},
				getTasks(callback) {
					this.$myRequest({
						url: "/selArticleByUId?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "&id=" + uni
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
			}
		}
</script>

<style>
	.urow{
		margin: 10rpx;
		background-color: white;
	}
.top{
	margin: 20rpx;
}
.demo-uni-col {
	height: 36px;
	border-radius: 3px;
	color: #545666;
}
.fb{
	font-size: 15rpx;
	text-align: left;
	margin-left: 20rpx;
}
.h4{
	    font-size: 40rpx;
		margin-left: 20rpx;
	    font-weight: 500;
	    color: #222226;
}
.img{
	height: 40rpx;
	margin-right: 10px;
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
