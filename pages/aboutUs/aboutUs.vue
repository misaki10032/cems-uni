<template>
	<view class="aboutus">
    <image class="aboutus-img" src="../../static/home/aboutus.jpg"></image>
    <view class="aboutus-phone">
      <view @click="callPhone">联系电话：136-1912-6257</view>
      <view>公司地址：陕西省汉中市盛世国际写字楼9层1室</view>
    </view>
    <map :latitude="latitude" :longitude="longitude" :markers="markers" :scale="scale" class="aboutus-map"
         enable-3D="true"></map>
  </view>
</template>

<script>
	export default{
		data() {
			return {
        longitude: 107.058219,
        latitude: 33.072178,
        scale: 18,
        markers: [
          {
            longitude: 107.058219,
            latitude: 33.072178,
            iconPath: "../../static/home/position.png"
          }
        ]
      }
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
          phoneNumber: "136-1912-6257"
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
		.aboutus-map {
      width: 750rpx;
      height: 985rpx;
    }
	}
</style>
