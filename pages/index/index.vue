<template>
	<!-- 父view -->
	<view class="home">
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="img in rotationImgArr" :key="img.id">
				<image :src="img"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationImgArr: [
					"/static/rotationImage/01.jpg",
					"/static/rotationImage/02.jpg",
					"/static/rotationImage/03.jpg",
					"/static/rotationImage/04.jpg",
					"/static/rotationImage/05.jpg"
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			/* 获取轮播图数据 */
			navItemClick(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {

		/* 轮播图 */
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		/* 推荐任务/单子 */
		.recommend_tasks {
			overflow: hidden;
			margin-top: 20rpx;
			/* 热门单子 */
				.recommend_tasks_title {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 50rpx;
					color: #b50e03;
					text-align: center;
					letter-spacing: 20rpx;
					background: #FFFFFF;
					margin: 5rpx 0;
				}
		}
	}
</style>
