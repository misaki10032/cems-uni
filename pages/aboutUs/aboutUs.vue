<template>
	<view class="aboutus">
		<image class="aboutus-img" src="../../static/home/aboutus.jpg"></image>
		<view class="aboutus-phone">
			<view @click="callPhone">联系电话：400-302-2605</view>
			<view>公司地址：陕西省汉中市盛世国际写字楼9层1室</view>
		</view>
		<map class="aboutus-map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				longitude: 107.058433,
				latitude: 33.071527,
				scale: 15,
				markers: [
					{
						longitude: 107.058433,
						latitude: 33.071527,
						iconPath: "../../static/home/position.png"
					}
				]
			}
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: "400-302-2605"
				})
			}
		}
	}
</script>

<style lang="scss">
	.aboutus{
		.aboutus-img{
			width: 750rpx;
			height: 320rpx;
		}
		.aboutus-phone{
			padding: 10prx 20rpx;
			font-size: 30rpx;
			view{
				margin-left: 20rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #eee;
			}
		}
		.aboutus-map{
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
