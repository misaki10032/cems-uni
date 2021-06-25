<template>
	<view class="pics">
		<!-- 左部菜单 -->
		<scroll-view class="left" scroll-y>
			<view :class="active===index ? 'active' : ''" v-for="(m,index) in menu" :key="index" @click="getPicsImg(index,m)">
				{{m}}
			</view>
		</scroll-view>
		<!-- 右边推盘 -->
		<scroll-view class="right" scroll-y>
			<view class="img-item" v-for="(i,index) in img" :key="index">
				<image :src="i.url" @click="previewImg(i.url)"></image>
				<text>{{i.describe}}</text>
				<text v-if="img.length == 0">暂无图片</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				menu: [
					"美女","动漫","风景","游戏","文字","视觉","情感","设计","明星","物语","艺术","男人","卡通","机械","城市","动物","运动","影视"
				],
				img: [
					{
						"url": "../../static/pics/15.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/8.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/2.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/3.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/4.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/5.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/6.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/7.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/1.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/9.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/10.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/11.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/12.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/13.jpg",
						"describe": "美女"
					},
					{
						"url": "../../static/pics/14.jpg",
						"describe": "美女"
					}
				]
			}
		},
		onLoad() {
			this.getPicsMenu()
		},
		methods: {
			/* 获取侧边图片类型 */
			getPicsMenu() {
				this.$myRequest({
					url: '/getPicsMenu'
				}).then(res => {
					this.menu = res.data
					this.getPicsImg(0,this.menu[0])
				})
			},
			getPicsImg(index,name) {
				this.active = index
				/* 获取图片地址 */
				this.$myRequest({
					url: "getImgByName/" + name
				}).then(res => {
					this.img = res.data
				})
			},
			/* 图片预览 */
			previewImg(current){
				const urls = this.img.map(item => {
					return item.url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.pics{
		height: 100%;
		display: flex;
		.left{
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			view{
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}
		}
		.active{
			background: #b50e03;
			color: #FFFFFF;
		}
		.right{
			height: 100%;
			width: 530rpx;
			margin: 0 auto;
			.img-item{
				image{
					width: 530rpx;
					height: 600rpx;
					border-radius: 5rpx;
				}
				text{
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
