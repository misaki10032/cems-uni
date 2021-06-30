<template>
	<view class="box">
		<uni-row v-if="attInfo.length!==0" class="user_box" v-for="(item,index) in attInfo" :key="index">
			<view class="user-view" @click="toUserInfo(item.userId)">
				<uni-col :span="4" :offset="1" class="user-title">
					<view v-if="item.userSex=='男'">
						<image src="https://c-ssl.duitang.com/uploads/item/201809/25/20180925214939_muavg.thumb.1000_0.jpg">
						</image>
					</view>
					<view v-if="item.userSex!='男'">
						<image src="https://c-ssl.duitang.com/uploads/item/201809/25/20180925214938_pyznn.thumb.1000_0.jpg">
						</image>
					</view>
				</uni-col>
				<uni-col class="user-info" :span="18" :offset="1">
					<uni-col :span="24" class="user-name"><view><text>{{item.userPname}}</text></view></uni-col>
					<uni-col :span="24" class="user-dec"><view><text>{{item.userDec}}</text></view></uni-col>
				</uni-col>
			</view>
		</uni-row>
		<view class="no-friend" v-if="attInfo.length===0">
			您还没有关注!
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attInfo:[]
			}
		},
		onShow(){
			var id = uni.getStorageSync("loginUser").userId;
			this.getFriend(id);
		}
		,methods: {
			toUserInfo(userId){
				uni.navigateTo({
					url:"/pages/friend/friendInfo?id="+userId
				})
			},
			getFriend(id){
				var that = this;
				console.log(id)
				this.$myRequest({
					url: '/getMyFocus',
					data: {
						id: id,
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						console.log(res)
						if (res.data.code != 200) {
							uni.showToast({
								title:res.data.msg,
								icon:'loading'
							})
							setTimeout(function(){
								uni.hideLoading()
								uni.switchTab({
									url: "/pages/home/home"
								})
							},1500)
							return
						}else{
							that.attInfo = res.data.data.friends;
						}
					}
				});
			}
			
		}
	}
</script>

<style lang="scss">
	.box{
		background-color: #f7f7f7;
		.user_box{
			background-color: #ffffff;
			margin-top:20rpx;
			.user-view{
				.user-title{
					view {
						image{
							width: 100rpx;
							height: 100rpx;
						}
					}
				}
				.user-info{
					.user-name{
						padding-top: 16rpx;
					}
					.user-dec{
						color: #b0b0b0;
					}
				}
			}	
		}
		.no-friend{
			margin-top: 50rpx;
			padding: 10rpx;
			text-align: center;
			color: #b0b0b0;
		}
	}
	
</style>
