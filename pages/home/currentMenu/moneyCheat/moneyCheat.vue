<template>
	<view class="money_home">
		<view class="money_box">
			<text>总金额(元)</text>
			<uni-icons color="#eee" v-if="flag" type="eye" @click="isFlag"></uni-icons>
			<uni-icons color="#eee" v-if="rflag" type="eye-slash" @click="isrFlag"></uni-icons>
			<text class="money_self" v-if="flag">{{money | showMoney}}</text>
			<text class="money_self" v-if="rflag">****</text>
		</view>
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in nav" :key="index" @click="toDetails(item.url)">
				<view>
					<image :src="item.icon" mode=""></image>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="card">
			<uni-card title="服务推荐" mode="basic">
				<view class="nav">
					<view class="nav_item" v-for="(item,index) in fuwu" :key="index" @click="toDetails(item.url)">
						<view>
							<image :src="item.icon" mode=""></image>
						</view>
						<text>{{item.title}}</text>
					</view>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: "",
				flag: true,
				rflag: false,
				nav: [
					{
						"title": "充值",
						"icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F19%2F06%2F15%2F8c87812a1c76ad4e235114296a6b34a4.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627525405&t=d1601af4fae64c1b2b536c22893c96ff",
						"url": "/pages/home/currentMenu/moneyCheat/InsertMoney"
					},
					{
						"title": "提现",
						"icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F19%2F04%2F22%2Fb13a8b42c4a47ec48451fca51b2d2b93.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627525500&t=2df29968c800c05e324750398596a91e",
						"url": "/pages/message/systemMsg/systemMsg"
					}
				],
				fuwu: [
					{
						"title": "我的任务",
						"icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F37%2F83%2F63%2F37397e86_E378363_221f641h.png%21%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fpng&refer=http%3A%2F%2Fimg.51miz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627528047&t=043d1aeec44009844c0d69de9d23a594",
						"url": "/pages/message/myTask/myTask"
					},
					{
						"title": "我的帖子",
						"icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F44%2F59%2F5814b3d8736cf_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627528347&t=a472f4256ae053b65fafd93cb2a98c01",
						"url": "/pages/"
					},
					{
						"title": "我的委托",
						"icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F44%2F59%2F5814b3d8736cf_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627528347&t=a472f4256ae053b65fafd93cb2a98c01",
						"url": "/pages/"
					},
					{
						"title": "附近的人",
						"icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.51miz.com%2Fpreview%2Felement%2F00%2F01%2F04%2F51%2FE-1045151-AEBDAF43.jpg%21%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fjpg&refer=http%3A%2F%2Fimg.51miz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627528263&t=ec65c563d291f9854c68f6d3b16af921",
						"url": "/pages/message/nearBy/nearBy"
					},
				],
			}
		},
		onShow() {
			this.money = uni.getStorageSync("loginUser").userMoney
		},
		methods: {
			toDetails(url){
				uni.navigateTo({
					url
				})
			},
			isFlag() {
				this.flag = !this.flag
				this.rflag = !this.rflag
			},
			isrFlag() {
				this.flag = !this.flag
				this.rflag = !this.rflag
			}
		},
		filters: {
			showMoney(money){
				return (money * 1).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.money_home{
		
		.money_box{
			height: 220rpx;
			background: #b50e03;
			
			text{
				color: #eee;
				margin: 30px 30rpx;
			}
			
			text:nth-child(1){
				font-size: 25rpx;
			}
			
			.money_self{
				font-size: 60rpx;
				position: absolute;
				top: 60rpx;
				left: 0rpx;
			}
			
		}
		
		/* 导航 */
		.nav {
			display: flex;
			flex-wrap: wrap;
		
			/* 图标+文字 */
			.nav_item {
		
				width:50%;
				text-align: center;
				margin-top: 30rpx;
		
				view {
					margin: 0rpx auto;
					width: 120rpx;
					height: 120rpx;
				}
		
				/* 导航图标 */
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
					color: #FFFFFF;
				}
			}
		}
		
		.card{
			margin-top: 30rpx;
		}
	}
</style>
